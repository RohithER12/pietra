import React, { createContext, useContext, useState, ReactNode } from "react";

export type CompareProduct = {
    id: string; // productId
    category: string;
    series?: string;
    image: string;
    name: string;
};

interface CompareContextType {
    selected: CompareProduct[];
    addProduct: (product: CompareProduct) => void;
    removeProduct: (id: string) => void;
    clear: () => void;
    isSelected: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
    const [selected, setSelected] = useState<CompareProduct[]>([]);

    const addProduct = (product: CompareProduct) => {
        setSelected((prev) => {
            if (prev.find((p) => p.id === product.id)) return prev;
            if (prev.length >= 3) return prev;
            return [...prev, product];
        });
    };

    const removeProduct = (id: string) => {
        setSelected((prev) => prev.filter((p) => p.id !== id));
    };

    const clear = () => setSelected([]);

    const isSelected = (id: string) => selected.some((p) => p.id === id);

    return (
        <CompareContext.Provider value={{ selected, addProduct, removeProduct, clear, isSelected }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const ctx = useContext(CompareContext);
    if (!ctx) throw new Error("useCompare must be used within CompareProvider");
    return ctx;
}; 