import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { removeItem } from "@/features/cart/cartSlice";
import { toast } from 'react-toastify';

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const total = useSelector((state: RootState) => state.cart.total);
    const dispatch = useDispatch();

    const handleRemoveItem = (id: string) => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            dispatch(removeItem(id));
            toast.error(`${item.title} removed from cart`);
        }
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-medium">{item.title}</h3>
                                    <p>${item.price} x {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Total:</h3>
                            <p className="text-xl font-bold">${total.toFixed(2)}</p>
                        </div>
                        <Button className="w-full mt-4" asChild>
                            <Link to="/checkout">Proceed to Checkout</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;