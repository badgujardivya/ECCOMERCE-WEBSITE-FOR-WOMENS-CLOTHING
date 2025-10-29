import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md flex flex-col">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {/* Scrollable area */}
      <div className="mt-4 flex-1 overflow-y-auto pr-2 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <UserCartItemsContent cartItem={item} key={index} />
          ))
        ) : (
          <p className="text-center text-muted-foreground mt-8">
            Your cart is empty.
          </p>
        )}
      </div>

      {/* Footer area (not scrollable) */}
      <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold"> ₹{totalCartAmount}</span>
        </div>
        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
