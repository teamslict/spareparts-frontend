import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
    productId: string;
    name: string;
    sku: string;
    price: number;
    image: string;
    addedAt: Date;
}

interface WishlistState {
    // Key is storeSlug, Value is items array
    wishlists: Record<string, WishlistItem[]>;

    // Actions require storeSlug for multi-tenant support
    addItem: (storeSlug: string, item: Omit<WishlistItem, 'addedAt'>) => void;
    removeItem: (storeSlug: string, productId: string) => void;
    clearWishlist: (storeSlug: string) => void;
    isInWishlist: (storeSlug: string, productId: string) => boolean;
    toggleWishlist: (storeSlug: string, item: Omit<WishlistItem, 'addedAt'>) => void;

    // Selectors
    getItems: (storeSlug: string) => WishlistItem[];
    getItemCount: (storeSlug: string) => number;
}

export const useWishlist = create<WishlistState>()(
    persist(
        (set, get) => ({
            wishlists: {},

            addItem: (storeSlug, item) => {
                set((state) => {
                    const currentWishlist = state.wishlists[storeSlug] || [];
                    const existingItem = currentWishlist.find((i) => i.productId === item.productId);

                    // Don't add duplicates
                    if (existingItem) {
                        return state;
                    }

                    return {
                        wishlists: {
                            ...state.wishlists,
                            [storeSlug]: [...currentWishlist, { ...item, addedAt: new Date() }]
                        }
                    };
                });
            },

            removeItem: (storeSlug, productId) => {
                set((state) => {
                    const currentWishlist = state.wishlists[storeSlug] || [];
                    return {
                        wishlists: {
                            ...state.wishlists,
                            [storeSlug]: currentWishlist.filter((i) => i.productId !== productId)
                        }
                    };
                });
            },

            clearWishlist: (storeSlug) => {
                set((state) => ({
                    wishlists: {
                        ...state.wishlists,
                        [storeSlug]: []
                    }
                }));
            },

            isInWishlist: (storeSlug, productId) => {
                const wishlist = get().wishlists[storeSlug] || [];
                return wishlist.some((i) => i.productId === productId);
            },

            toggleWishlist: (storeSlug, item) => {
                const isInList = get().isInWishlist(storeSlug, item.productId);
                if (isInList) {
                    get().removeItem(storeSlug, item.productId);
                } else {
                    get().addItem(storeSlug, item);
                }
            },

            getItems: (storeSlug) => {
                return get().wishlists[storeSlug] || [];
            },

            getItemCount: (storeSlug) => {
                return (get().wishlists[storeSlug] || []).length;
            },
        }),
        {
            name: 'spareparts-wishlist-storage',
        }
    )
);
