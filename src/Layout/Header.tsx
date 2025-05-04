import { NavLink, Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { useState } from "react";
import Profile from "@/components/Profile";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const cartItems = 3;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "New Arrivals", path: "/new" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="h-16 flex items-center justify-between px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">E-Shop</span>
                <SheetClose
                  onClick={() => setIsMobileMenuOpen(false)}
                ></SheetClose>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.path}
                    asChild
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Link to={link.path} className="text-base">
                      {link.name}
                    </Link>
                  </Button>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="md:hidden font-bold text-xl">
          E-Shop
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.path}>
                <NavigationMenuLink
                  asChild
                  className={
                    navigationMenuTriggerStyle() +
                    ` ${location.pathname === link.path ? "text-primary" : ""}`
                  }
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? navigationMenuTriggerStyle() + " text-primary"
                        : navigationMenuTriggerStyle()
                    }
                  >
                    {link.name}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile Search Input */}
          {showMobileSearch && (
            <div className="absolute top-16 left-0 right-0 bg-background p-4 md:hidden border-b z-50">
              <Input placeholder="Search products..." className="w-full" />
            </div>
          )}

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 w-[300px]"
            />
          </div>

          {/* Cart */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 justify-center text-[12px] leading-none"
              >
                {cartItems}
              </Badge>
            </Link>
          </Button>

          {/* User Dropdown Menu */}
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
