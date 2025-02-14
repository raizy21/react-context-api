/*
useReducer ii
In computer science, a reducer is a way of reducing elements of an array into a single element: 
the total number of items in a cart, the amount in Euros of said item arrays, etc. 

In JavaScript, we know reducers from Array.prototype.reduce, 
a higher-order method that takes a reducer function. 
This function takes the accumulated value, the current value and returns the next.

In React, we have something similar: a reducer is a function that takes the current state and returns the next value!

This is the same example as the previous one but using reducers.

The cartReducer function defines how the state should be updated based on different action types. Each case in the switch statement handles a specific action:

ADD_TO_EXISTING_IN_CART: Increases the quantity of an existing item in the cart.
ADD_NEW_TO_CART: Adds a new item to the cart.
REMOVE_FROM_CART: Removes an item from the cart.
DECREMENT_QUANTITY: Decreases the quantity of an item in the cart.
EMPTY_CART: Empties the entire cart.
useReducer takes a reducer function  and an initial state, it returns an array with the value of the state and a dispatch function. 
This function will be called whenever we want to update our state!

dispatch({ type: ACTION_IN_REDUCER, payload: optional })

Remember, code optiomisation is not always about writing less lines. 
In this case, we are able to breakdown our state updates into more atomic cases. 
Based on the action passed to dispatch, we will return a new object that will be set to the new value of state. 
We can even have a default case. A switch statement is normally used for a reducer but it's not mandatory.

It's important to note that the dispatch function has a stable identity accross renders, 
which makes it suitable to be passed down as props or exposed in a context provider.


*/

import { useReducer } from "react";

const products = [
  { id: 1, name: "Product 1", price: 29.99 },
  { id: 2, name: "Product 2", price: 49.99 },
  { id: 3, name: "Product 3", price: 19.99 },
];
const formatCurrency = (amount) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

const initialState = {
  user: "Anoj",
  items: [],
  total: new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(0),
  itemCount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_EXISTING_IN_CART": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
        total: formatCurrency(
          newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        ),
      };
    }
    case "ADD_NEW_TO_CART": {
      const newItems = [...state.items, action.payload];
      const itemCount = newItems.reduce((acc, item) => acc + item.quantity, 0);
      const total = formatCurrency(
        newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
      return {
        ...state,
        items: newItems,
        itemCount,
        total,
      };
    }
    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
        total: formatCurrency(
          newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        ),
      };
    }
    case "DECREMENT_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
        total: formatCurrency(
          newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        ),
      };
    }
    case "EMPTY_CART":
      return {
        ...state,
        items: [],
        itemCount: 0,
        total: formatCurrency(0),
      };
    default:
      return state;
  }
};

const ShoppingCart = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    const { items } = cart;
    const existingProduct = items.find((item) => item.id === product.id);
    if (existingProduct) {
      dispatch({ type: "ADD_TO_EXISTING_IN_CART", payload: product });
    } else {
      dispatch({
        type: "ADD_NEW_TO_CART",
        payload: { ...product, quantity: 1 },
      });
    }
  };

  const removeFromCart = (productId) => {
    const { items } = cart;
    const existingProduct = items.find((item) => item.id === productId);
    if (existingProduct.quantity === 1) {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    } else {
      dispatch({ type: "DECREMENT_QUANTITY", payload: productId });
    }
  };

  const emptyCart = () => dispatch({ type: "EMPTY_CART" });

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {cart.user} this is your shopping cart
          </div>
          <ul className="mt-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center p-2"
              >
                <span>{product.name}</span>
                <span>${product.price}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded ml-4"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h2 className="text-lg font-bold">Cart Items</h2>
            <ul className="mt-2">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-2"
                >
                  <span>{item.name}</span>
                  <span>
                    ${item.price} x {item.quantity}
                  </span>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded ml-4"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right font-bold">Total: {cart.total}</div>
            <div className="mt-4 text-right font-bold">
              Item count: {cart.itemCount}
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded ml-4"
              onClick={emptyCart}
            >
              Empty cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => <ShoppingCart />;

export default App;
