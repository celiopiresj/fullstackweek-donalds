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
  const { isOpen, toggleCart } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <p>Sheet description</p>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
