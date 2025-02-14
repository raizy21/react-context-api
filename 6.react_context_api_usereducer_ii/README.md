<p>In computer science, a reducer is a way of reducing elements of an array into a single element: the total number of items in a cart, the amount in Euros of said item arrays, etc.&nbsp;</p>
<p>In JavaScript, we know reducers from <code>Array.prototype.reduce</code>, a higher-order method that takes a reducer function. This function takes the accumulated value, the current value and returns the next.</p>
<p>In React, we have something similar: a reducer is a function that takes the current state and returns the next value!</p>
<p>This is the same example as the previous one but using reducers.</p>
<p>The <code>cartReducer</code> function defines how the state should be updated based on different action types. Each case in the switch statement handles a specific action:</p>
<ul>
<li><strong>ADD_TO_EXISTING_IN_CART</strong>: Increases the quantity of an existing item in the cart.</li>
<li><strong>ADD_NEW_TO_CART</strong>: Adds a new item to the cart.</li>
<li><strong>REMOVE_FROM_CART</strong>: Removes an item from the cart.</li>
<li><strong>DECREMENT_QUANTITY</strong>: Decreases the quantity of an item in the cart.</li>
<li><strong>EMPTY_CART</strong>: Empties the entire cart.</li>
</ul>
<p><code>useReducer</code> takes a reducer function&nbsp; and an initial state, it returns an array with the value of the state and a <code>dispatch</code> function. This function will be called whenever we want to update our state!</p>
<p><code>dispatch({ type: ACTION_IN_REDUCER, payload: optional })</code></p>
<p>Remember, code optiomisation is not always about writing less lines. In this case, we are able to breakdown our state updates into more atomic cases. Based on the action passed to dispatch, we will return a new object that will be set to the new value of state. We can even have a default case. A switch statement is normally used for a reducer but it's not mandatory.</p>
<p>It's important to note that the <code>dispatch</code> function has a stable identity accross renders, which makes it suitable to be passed down as props or exposed in a context provider.</p>