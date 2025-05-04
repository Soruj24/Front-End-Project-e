import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Footer = () => {
  return (
    <footer className="bg-background mt-auto sm:px-10 px-4 py-8 border-t border-muted">
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-semibold">E-Shop</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted online platform for purchasing favorite products
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-4 space-y-2">
              <Label htmlFor="newsletter">Subscribe to our newsletter</Label>
              <div className="flex gap-2">
                <Input id="newsletter" placeholder="Enter your email" />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm hover:text-primary">
                  Delivery Methods
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm hover:text-primary">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex flex-col gap-2">
              <Button variant="outline" asChild>
                <a href="#" className="hover:text-primary">
                  Facebook
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#" className="hover:text-primary">
                  Twitter
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#" className="hover:text-primary">
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} E-Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
