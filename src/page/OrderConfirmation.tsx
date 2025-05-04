import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
    return (
        <div className="p-4 max-w-6xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Order Confirmed!</h1>
            <p className="mb-6">Thank you for your purchase. Your order has been received.</p>
            <Button asChild>
                <Link to="/">Continue Shopping</Link>
            </Button>
        </div>
    );
};

export default OrderConfirmation;