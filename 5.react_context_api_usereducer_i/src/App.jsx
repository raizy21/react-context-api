/*
useReducer i
Let's consider this example. 
It includes a list of products and a ShoppingCart component 
that allows users to add and remove items from the cart and view the cart's contents. 
The useState hook is used to manage the state of the cart.

user: A string representing the name of the user.
items: An array that will contain the items added to the cart.
total: A formatted string representing the total price of all items in the cart.
itemCount: The total count of items in the cart.

The addToCart and removeFromCart functions handle adding and removing items from the cart, respectively. 
These functions illustrate the complexity of the state management:

Adding to Cart
Check if Product Exists: The addToCart function checks if the product already exists in the items array.
Update Quantity or Add New Item: If the product exists, it increments the quantity. If not, it adds the product to the items array.
Calculate New Totals: It then calculates the new itemCount and total based on the updated items array.
Set New State: Finally, it updates the state with the new items, itemCount, and total.

Removing from Cart
Find Product: The removeFromCart function finds the product to be removed in the items array.
Update Quantity or Remove Item: If the product quantity is more than one, it decrements the quantity. If it is one, it removes the product from the array.
Calculate New Totals: It recalculates the itemCount and total after the removal.
Set New State: The state is updated with the new items, itemCount, and total.
Emptying the Cart
The emptyCart function resets the items array to empty and the total and itemCount to zero.

Managing a complex object in state can become a tedious text because of deeply nested properties, 
interconnected computed values that translate to creating a bunch of functions for different actions.

 These functions are then recreated on every render, 
 which technically has an impact on performance, although, in this case is rather nelligible. 
 Only the setCart function has a stable identity accross renders!

Luckily there's a more powerful hook at our disposal useReducer

 

*/

import { useState } from "react";

const products = [
  { id: 1, name: "Product 1", price: 29.99 },
  { id: 2, name: "Product 2", price: 49.99 },
  { id: 3, name: "Product 3", price: 19.99 },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState({
    user: "Anoj",
    items: [],
    total: new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(0),
    itemCount: 0,
  });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const { items, ...rest } = prevCart;
      const existingProduct = items.find((item) => item.id === product.id);
      if (existingProduct) {
        const newItems = items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...rest,
          items: newItems,
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
          total: formatCurrency(
            newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
          ),
        };
      } else {
        items.push({ ...product, quantity: 1 });
        const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
        const total = formatCurrency(
          items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
        return { ...rest, items, itemCount, total };
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const { items, ...rest } = prevCart;
      const existingProduct = items.find((item) => item.id === productId);
      if (existingProduct.quantity === 1) {
        const newItems = items.filter((item) => item.id !== productId);
        return {
          ...rest,
          items: newItems,
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
          total: formatCurrency(
            newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
          ),
        };
      } else {
        const newItems = items.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        return {
          ...rest,
          items: newItems,
          itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0),
          total: formatCurrency(
            newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
          ),
        };
      }
    });
  };

  const emptyCart = () => {
    setCart((prev) => ({
      ...prev,
      items: [],
      total: new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(0),
      itemCount: 0,
    }));
  };

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
