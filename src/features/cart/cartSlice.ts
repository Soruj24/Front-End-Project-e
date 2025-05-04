import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState = {
    items: [],
    total: 0,
};

const loadCartFromLocalStorage = (): CartState => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load cart from localStorage", e);
        return initialState;
    }
};

const saveCartToLocalStorage = (state: CartState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (e) {
        console.warn("Could not save cart to localStorage", e);
    }
};

const cartInitialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,  // Changed from initialState to cartInitialState
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                toast.warning(`${action.payload.title} already exists in your cart!`);
                return;
            } else {
                state.items.push(action.payload);
                toast.success(`${action.payload.title} added to cart!`);
            }

            state.total = calculateTotal(state.items);
            saveCartToLocalStorage(state);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.total = calculateTotal(state.items);
            saveCartToLocalStorage(state);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                state.total = calculateTotal(state.items);
            }
            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            saveCartToLocalStorage(state);
        },
    },
});

function calculateTotal(items: CartItem[]): number {
    return items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;