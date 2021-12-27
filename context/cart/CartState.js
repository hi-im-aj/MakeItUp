import React, {useReducer} from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { SET_CART, GET_SHIPPING_OPTIONS } from "../types";
import commerce from "../../lib/commerce";

export default (props) => {
  const initialState = {
    total_items: 0,
    total_unique_items: 0,
    line_items: [],
    subtotal: 0,
    id: "",
    shippingOptions: null,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const setCart = (payload) => {
    dispatch({ type: SET_CART, payload });
  };

  const retrieveCart = () => {
    commerce.cart
      .retrieve()
      .then((cart) => {
        setCart(cart);
      })
      .catch((err) => console.error(err));
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart)
  }
  const getShippingOptions = async (token) => {
    try {
      const res = await commerce.checkout.getShippingOptions(token, {
        country: "DK",
      });
      dispatch({ type: GET_SHIPPING_OPTIONS, payload: res[0] });
    } catch (err) {
      console.error(err);
    }
  };

  const incrementByOne = (productID, quantity) =>
    commerce.cart
      .update(productID, {
        quantity: quantity + 1,
      })
      .then(({ cart }) => setCart(cart))
      .catch((err) => console.error(err));;

  const decrementByOne = (productID, quantity) =>
    commerce.cart
      .update(productID, {
        quantity: quantity - 1,
      })
      .then(({ cart }) => setCart(cart))
      .catch((err) => console.error(err));;

  const clearCart = () =>
    commerce.cart
      .empty(state.id)
      .then(({ cart }) => setCart(cart))
      .catch((err) => console.error(err));;

  const addToCart = (objectID) =>
    commerce.cart
      .add(objectID)
      .then(({ cart }) => setCart(cart))
      .catch((err) => console.error(err));;

  return (
    <CartContext.Provider
      value={{
        total_items: state.total_items,
        total_unique_items: state.total_unique_items,
        line_items: state.line_items,
        subtotal: state.subtotal,
        id: state.id,
        shippingOptions: state.shippingOptions,
        setCart,
        retrieveCart,
        getShippingOptions,
        clearCart,
        incrementByOne,
        decrementByOne,
        addToCart,
        refreshCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
