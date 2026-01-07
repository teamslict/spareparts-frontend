import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    productId: string;
    name: string;
    sku: string;
    price: number;
    image: string;
    quantity: number;
}

// Update interface to support namespaces
interface CartState {
    // Key is storeSlug, Value is items array
    carts: Record<string, CartItem[]>;

    // Actions now require storeSlug
    addItem: (storeSlug: string, item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeItem: (storeSlug: string, productId: string) => void;
    updateQuantity: (storeSlug: string, productId: string, quantity: number) => void;
    clearCart: (storeSlug: string) => void;

    // Selectors
    getItems: (storeSlug: string) => CartItem[];
    getTotal: (storeSlug: string) => number;
    getItemCount: (storeSlug: string) => number;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            carts: {},

            addItem: (storeSlug, item, quantity = 1) => {
                set((state) => {
                    const currentCart = state.carts[storeSlug] || [];
                    const existingItem = currentCart.find((i) => i.productId === item.productId);

                    let newCart;
                    if (existingItem) {
                        newCart = currentCart.map((i) =>
                            i.productId === item.productId
                                ? { ...i, quantity: i.quantity + quantity }
                                : i
                        );
                    } else {
                        newCart = [...currentCart, { ...item, quantity }];
                    }

                    return {
                        carts: {
                            ...state.carts,
                            [storeSlug]: newCart
                        }
                    };
                });
            },

            removeItem: (storeSlug, productId) => {
                set((state) => ({
                    carts: {
                        ...state.carts,
                        [storeSlug]: (state.carts[storeSlug] || []).filter((i) => i.productId !== productId)
                    }
                }));
            },

            updateQuantity: (storeSlug, productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(storeSlug, productId);
                    return;
                }

                set((state) => ({
                    carts: {
                        ...state.carts,
                        [storeSlug]: (state.carts[storeSlug] || []).map((i) =>
                            i.productId === productId ? { ...i, quantity } : i
                        )
                    }
                }));
            },

            clearCart: (storeSlug) => {
                set((state) => ({
                    carts: {
                        ...state.carts,
                        [storeSlug]: []
                    }
                }));
            },

            getItems: (storeSlug) => {
                return get().carts[storeSlug] || [];
            },

            getTotal: (storeSlug) => {
                const items = get().carts[storeSlug] || [];
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getItemCount: (storeSlug) => {
                const items = get().carts[storeSlug] || [];
                return items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'spareparts-cart-multitenant', // New key to avoid conflicts with old storage
        }
    )
);
