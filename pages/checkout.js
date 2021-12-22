import { useContext, useEffect, useState } from "react";
import AddressForm from "/components/AddressForm";
import commerce from "/lib/commerce";
import CartContext from "/context/cart/CartContext";

export default () => {
  const { id: cartId } = useContext(CartContext);
  const [checkoutToken, setcheckoutToken] = useState(null);

  useEffect(() => {
    commerce.checkout
      .generateToken(cartId, { type: "cart" })
      .then((checkout) => {
        setcheckoutToken(checkout.id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [cartId]);

  return (
    <div id="checkoutPage" className="frame">
      {checkoutToken && <AddressForm checkoutToken={checkoutToken} />}
    </div>
  );
};
