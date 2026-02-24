## Issue 47

**Clean Code Principles**
* **Simplicity:** Avoid over-complicating logic. Simple code is easier to read and maintain.
* **Readability:** Code should be self-explanatory. Use meaningful variable and function names that convey intent. 
* **Maintainability:** Write code that can be easily updated or extended in the future. Avoid hardcoding values and use constants or configuration files instead.
* **Consistency:** Follow consistent naming conventions and code formatting throughout the project. If the project uses `moveUp()`, don't switch to `move_up()` in another part of the codebase. 
* **Efficiency:** While clean code prioritizes readability, it should also be efficient. Avoid unnecessary computations or complex algorithms when a simpler solution exists. However, never sacrifice readability for micro-optimizations unless it's a critical performance bottleneck. 

**Messy Code:**

```Javascript
function t(items) {
  let x = 0;
  for (let i = 0; i < items.length; i++) {
    // What is 1.12? Why is 'x' used here?
    x += items[i].p * 1.12; 
  }
  return x;
}
```

**Cleaner Version:**

```Javascript
const SALES_TAX_RATE = 1.12;

function calculateTotalWithTax(cartItems) {
  const pricesWithTax = cartItems.map(item => item.price * SALES_TAX_RATE);
  
  return pricesWithTax.reduce((total, price) => total + price, 0);
}
```