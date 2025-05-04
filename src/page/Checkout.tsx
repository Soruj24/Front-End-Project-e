import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearCart } from "@/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Checkout = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const total = useSelector((state: RootState) => state.cart.total);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        console.log('Order placed:', { items: cartItems, total });
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/order-confirmation');
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Shipping Information</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="First Name" />
                            <Input placeholder="Last Name" />
                        </div>
                        <Input placeholder="Address" />
                        <Input placeholder="Apartment, suite, etc. (optional)" />
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="City" />
                            <Input placeholder="Postal Code" />
                        </div>
                        <Input placeholder="Country" />
                        <Input placeholder="Phone" />
                    </div>

                    <h2 className="text-xl font-semibold pt-4">Payment Method</h2>
                    <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="payment" className="h-4 w-4" defaultChecked />
                                Credit Card
                            </label>
                        </div>
                        <div className="border rounded-lg p-4">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="payment" className="h-4 w-4" />
                                PayPal
                            </label>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <div>
                                    <p>{item.title}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 mt-4 space-y-2">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p>$0.00</p>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2">
                            <p>Total</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                    </div>
                    <Button 
                        className="w-full mt-6"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;