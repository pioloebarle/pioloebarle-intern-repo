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

The messy code is difficult to understand because of the vague function name `t`, the non-descriptive variable `x`, and the unexplained constant `1.12`. In contrast, the cleaner version uses meaningful names like `calculateTotalWithTax` and `SALES_TAX_RATE`, making it clear what the function does and why the constant is used. The use of array methods like `map` and `reduce` also enhances readability by abstracting away the loop logic, allowing the reader to focus on the intent of the code rather than its mechanics.

## Issue 48: Reflection

Code formatting is essential for developers because it enhances readability and maintainability. Proper indentation, spacing, and consistent use of brackets make it easier for developers to understand the structure of the code at a glance. With this, collaborative projects become more efficient as team members can quickly navigate and comprehend each other's code without confusion.

When I ran **ESLint** on my codebase, it detected several common issues:
* **Unused Variables:** Variables that were declared but never used in the logic.
* **Inconsistent quote:** A mix of single and double quotes
* **Missing Semicolons:** Several lines were missing termination, which can lead to rare but frustrating bugs

Yes, significantly. After using and running **Prettier**, it automatically formatted my code to be consistent with the project's style guidelines. This not only made my code look cleaner but also improved readability. It saved me time that I would have spent manually fixing formatting issues, allowing me to focus more on the logic and functionality of my code rather than worrying about style inconsistencies.

## Issue 49: Reflection

A good naming convention is crucial for code readability and maintainability. It should tell the reader why it exists, what it does, and how it should be used. 
* **Variables** should be nouns that describe the data (`userEmail`, `userAge`)
* **Functions** should be verbs that describe the action they perform (`calculateTotal`, `sendEmail`) 

Poorly named variables and functions can lead to confusion and make it difficult for other developers to comprehend the code's purpose. This slows down the development and debugging process, as team members may have to spend extra time deciphering the intent behind a variable or function. Maintenance team makes it harder to update or extend the code in the future.

Refactoring names transforms the code from being cryptic to being self-explanatory. It enhances readability, making it easier for developers to understand the logic and purpose of each component. For example, changing a function from `proc()` to `processMonthlyInvoices()` immediately tells the reviewer exactly what the business logic is, allowing them to focus on the correctness of the code rather than just trying to decipher what it is. 