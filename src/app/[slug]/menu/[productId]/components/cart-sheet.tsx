import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet</SheetTitle>
        </SheetHeader>
        <SheetDescription>Sheet description</SheetDescription>
        {products.map((product) => (
          <div key={product.id}>
            <div>{product.name}</div>
            <div>{product.quantity}</div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
