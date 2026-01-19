"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
    id: string; // productId + size
    productId: string;
    name: string;
    price: number;
    image?: string;
    size: string;
    quantity: number;
    maxQuantity: number;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (item: Omit<CartItem, "id">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("crimzon_loadout");
        if (savedCart) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("crimzon_loadout", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addItem = (newItem: Omit<CartItem, "id">) => {
        const id = `${newItem.productId}-${newItem.size}`;

        setItems(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                // Check max quantity
                if (existing.quantity >= existing.maxQuantity) return prev;

                return prev.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...newItem, id, quantity: 1 }];
        });

        setIsOpen(true); // Open cart when item added
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(id);
            return;
        }

        setItems(prev => prev.map(item =>
            item.id === id
                ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
                : item
        ));
    };

    const clearCart = () => setItems([]);

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            isOpen,
            openCart,
            closeCart,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            subtotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
