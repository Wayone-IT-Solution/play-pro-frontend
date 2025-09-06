export interface CartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    quantity: number;
    category: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    description: string;
    subCategory: string;
}

interface CartResponse {
    total?: number;
    message: string;
    success: boolean;
    cart?: CartItem[];
}

const CART_KEY = "cart_items";

// ✅ Get cart from localStorage
export const getCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// ✅ Add item to cart
export const addToCart = (item: CartItem): CartResponse => {
    let cart = getCart();
    const existingIndex = cart.findIndex((i) => i._id === item?._id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
        saveCart(cart);
        return { success: true, message: "Item quantity updated in cart.", cart };
    } else {
        cart.push({ ...item, quantity: 1 });
        saveCart(cart);
        return { success: true, message: "Item added to cart.", cart };
    }
};

// ✅ Update item quantity
export const updateCartQuantity = (_id: string, quantity: number): CartResponse => {
    if (quantity < 1) {
        return { success: false, message: "Quantity must be at least 1." };
    }

    let cart = getCart();
    const index = cart.findIndex((i) => i._id === _id);

    if (index > -1) {
        cart[index].quantity = quantity;
        saveCart(cart);
        return { success: true, message: "Item quantity updated.", cart };
    }

    return { success: false, message: "Item not found in cart." };
};

// ✅ Remove item
export const removeFromCart = (_id: string): CartResponse => {
    let cart = getCart();
    const newCart = cart.filter((i) => i._id !== _id);

    if (cart.length === newCart.length) {
        return { success: false, message: "Item not found in cart.", cart };
    }

    saveCart(newCart);
    return { success: true, message: "Item removed from cart.", cart: newCart };
};

// ✅ Clear cart
export const clearCart = (): CartResponse => {
    saveCart([]);
    return { success: true, message: "Cart cleared successfully.", cart: [] };
};

// ✅ Get total
export const getCartTotal = (): CartResponse => {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
    return { success: true, message: "Cart total calculated.", total, cart };
};
