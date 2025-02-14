<p>Let's consider this example. It includes a list of products and a <code>ShoppingCart</code> component that allows users to add and remove items from the cart and view the cart's contents. The <code>useState</code> hook is used to manage the state of the cart.</p>
<ul>
<li><code>user</code>: A string representing the name of the user.</li>
<li><code>items</code>: An array that will contain the items added to the cart.</li>
<li><code>total</code>: A formatted string representing the total price of all items in the cart.</li>
<li><code>itemCount</code>: The total count of items in the cart.</li>
</ul>
<p>The <code>addToCart</code> and <code>removeFromCart</code> functions handle adding and removing items from the cart, respectively. These functions illustrate the complexity of the state management:</p>
<h4>Adding to Cart</h4>
<ul>
<li><strong>Check if Product Exists</strong>: The <code>addToCart</code> function checks if the product already exists in the <code>items</code> array.</li>
<li><strong>Update Quantity or Add New Item</strong>: If the product exists, it increments the quantity. If not, it adds the product to the <code>items</code> array.</li>
<li><strong>Calculate New Totals</strong>: It then calculates the new <code>itemCount</code> and <code>total</code> based on the updated <code>items</code> array.</li>
<li><strong>Set New State</strong>: Finally, it updates the state with the new <code>items</code>, <code>itemCount</code>, and <code>total</code>.</li>
</ul>
<h4>Removing from Cart</h4>
<ul>
<li><strong>Find Product</strong>: The <code>removeFromCart</code> function finds the product to be removed in the <code>items</code> array.</li>
<li><strong>Update Quantity or Remove Item</strong>: If the product quantity is more than one, it decrements the quantity. If it is one, it removes the product from the array.</li>
<li><strong>Calculate New Totals</strong>: It recalculates the <code>itemCount</code> and <code>total</code> after the removal.</li>
<li><strong>Set New State</strong>: The state is updated with the new <code>items</code>, <code>itemCount</code>, and <code>total</code>.</li>
</ul>
<h4>Emptying the Cart</h4>
<p>The <code>emptyCart</code> function resets the <code>items</code> array to empty and the <code>total</code> and <code>itemCount</code> to zero.</p>
<p>Managing a complex object in state can become a tedious text because of deeply nested properties, interconnected computed values that translate to creating a bunch of functions for different actions.</p>
<p>&nbsp;These functions are then recreated on every render, which technically has an impact on performance, although, in this case is rather nelligible. Only the <code>setCart</code> function has a stable identity accross renders!</p>
<p>Luckily there's a more powerful hook at our disposal <code>useReducer</code></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3>&nbsp;</h3>