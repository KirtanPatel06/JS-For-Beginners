function brewpotion(ingredient, dose) {
  return `Brewing potion with ${ingredient}(X${dose})... Potion ready`;
}

const yaadrakhje = brewpotion;
console.log(brewpotion("Healing Herbs", 5));
console.log(yaadrakhje("Dolo", 1));

// This is a normal way to write function in JS
console.log("--------------------------------------------------------------------------------------------");
// ---------------------------------------------------------------------------------------------------------------
// Writing functions in this way in JS is called "Function Expression"

const mixElixir = function (ingredient) {
  return `Mixing Elixir with ${ingredient}`;
}
console.log(mixElixir("Gold"));

console.log("--------------------------------------------------------------------------------------------");
// ---------------------------------------------------------------------------------------------------------------

// This is called as Arrow function.
const distilEssence = (ingredient) => {
  return `Brewing a new potion with ${ingredient}`;
}
// Arrow function does not creates its own 'this' execution context when it is executed. Also they do not create an implicit 'argument' variable.
console.log(distilEssence("Silver"));
console.log("--------------------------------------------------------------------------------------------");
// ----------------------------------------------------------------------------------------------------------------

// The difference of 'this' between Norml & Arrow function is showed below

// Node.js global context (this === {}) & in browser global context (this === Window object)
const user = {
  username: "Alice",

  sayHiRegular: function() {
    console.log(`Hi, I am ${this.username}`);
  },

  sayHiArrow: () => {
    console.log(`Hi, I am ${this.username}`);
  }
};
user.sayHiRegular(); // Output: "Hi, I am Alice"
user.sayHiArrow();   // Output: "Hi, I am undefined" (or empty if global window context)

// It is a common misconception that the curly braces {} of the user object create a new scope. In JavaScript, plain objects do not create a scope. Only functions and block statements (like if or for loops using let/const) create scopes.

/**
 * 📝 JAVASCRIPT ARCHITECTURE NOTES: OBJECT PROPERTIES VS VARIABLE SCOPE
 * 
 * =========================================================================
 * 1. THE CORE RULE: OBJECTS DO NOT CREATE SCOPE
 * =========================================================================
 * - Plain object `{}` do NOT create a local variable environment.
 * - Only functions and block statements (`if`, `for`, `try/catch`) create scope.
 * - Writing `username: "Alice"` creates an object PROPERTY, not a variable.
 * 
 * =========================================================================
 * 2. REGULAR FUNCTIONS: DYNAMIC 'this' (WORKS)
 * =========================================================================
 * - Regular functions create their own fresh `this` binding at execution time.
 * - Calling `user.sayHiRegular()` uses the "Left-of-the-Dot" rule.
 * - The engine looks to the left of the dot, sees the `user` object, and 
 *   automatically binds the function's internal `this` to that object.
 * - Result: `this.username` successfully reads the object property `"Alice"`.
 * 
 * =========================================================================
 * 3. ARROW FUNCTIONS: LEXICAL 'this' (FAILS)
 * =========================================================================
 * - Arrow functions are completely hollow. They NEVER create their own `this`.
 * - When an arrow function runs into `this`, it treats it like any normal
 *   missing variable and looks upward to its parent scope for answers.
 * - Because the parent `user` object is a plain object (no scope), the engine
 *   skips right past it and jumps straight to the Global Scope (Window/File).
 * - Result: It looks for `window.username`. Since no global variable exists,
 *   it returns `undefined` (completely unaware that `"Alice"` even exists).
 * 
 * =========================================================================
 * 4. SUMMARY RULE OF THUMB
 * =========================================================================
 * - Arrow functions are excellent for searching parent VARIABLE scopes.
 * - Arrow functions are blind to plain object PROPERTY structures.
 * - If you need to access object properties via `this`, use a regular function.
 */
console.log("--------------------------------------------------------------------------------------------");
// ----------------------------------------------------------------------------------------------------------------

// When you not handle the arguments passed in the function call of a Normal function, then JS implcitly converts that arguments into an Object like below.
// ("Sage", "Rosemary") are not handled in the function declaration. So it is converted to object as 
// { '0': 'Sage', '1': 'Rosemary' }
// and this gets hold by an implicity created variable called 'arguments'.
// JavaScript automatically creates a local variable called 'arguments' inside all standard (non-arrow) functions.
function oldBrewings() {
  console.log("Type: ", typeof arguments);
  console.log("Is Array: ", Array.isArray(arguments));
  console.log(arguments);

  const argsArray = Array.from(arguments); //converting object(i.e arguments) to Array
  console.log(Array.isArray(argsArray));
  console.log("arguments converted to Array -> ", argsArray);
}
oldBrewings("Sage", "Rosemary");
console.log("--------------------------------------------------------------------------------------------");
// ----------------------------------------------------------------------------------------------------------------

// The difference of 'arguments' between Norml & Arrow function is showed below
// Normal function
function showArgs() {
  console.log(arguments);
}
showArgs("A", "B"); // Logs an array-like object: { 0: "A", 1: "B" }

// Arrow Function
const showArgsArrow = () => {
  console.log(arguments);
};
showArgsArrow("A", "B"); // Throws Uncaught ReferenceError: arguments is not defined
console.log("--------------------------------------------------------------------------------------------");
// ----------------------------------------------------------------------------------------------------------------

// The Modern Solution for handling arguments in Arrow function: Rest Parameters
// To access all arguments passed to an arrow function, use the rest parameter syntax (...args). This creates a true array containing all passed arguments.
const arrowBrew = (...args) => {
  try {
    // args is a real array, so this will not throw an error
    console.log(args);
  }
  catch (e) {
    console.log("This won't run because args is defined:", e.message);
  }
}

arrowBrew("Coffee", "Tea", "Espresso");
// Output: [ 'Coffee', 'Tea', 'Espresso' ]

console.log("--------------------------------------------------------------------------------------------");
// ----------------------------------------------------------------------------------------------------------------

// Pure and Impure Functions
// The primary difference between pure and impure functions in JavaScript is that pure functions are completely predictable and have no side effects, whereas impure functions can produce different results for the same inputs or alter the external state.

// Pure Functions
// A function is considered pure if it satisfies two strict rules:
// 1. Deterministic: It always returns the exact same output when given the exact same arguments.
// 2. No Side Effects: It does not read from or modify any variables, objects, or states outside its own scope. It does not perform I/O operations, network requests, or DOM mutations.

// This function only depends on its inputs and changes nothing outside
function calculateTotal(price, tax) {
  return price + (price * tax);
}

console.log(calculateTotal(100, 0.1)); // Always returns 110
console.log(calculateTotal(100, 0.1)); // Always returns 110


// Impure Functions
// A function is impure if it violates either of the rules above. It becomes impure when it depends on an external variable, generates random data, fetches api data, or modifies a variable outside its local scope.

// 1. Impure because it relies on and mutates an external variable
let total = 0;
function addToTotal(amount) {
  total += amount;
  return total;
}

console.log(addToTotal(5));
console.log(addToTotal(5));

// 2. Impure because it produces non-deterministic results (different every time)
function getRandomNumber(base) {
  return Math.random() * base;
}
console.log(getRandomNumber(10));

// 3. Impure because it mutates the original object passed to it (side effect)
function updateAge(user) {
  user.age += 1;
  return user;
}
console.log(updateAge(user));

console.log("--------------------------------------------------------------------------------------------");
// ----------------------------------------------------------------------------------------------------------------

// An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs automatically as soon as it is defined. It is a common design pattern used to isolate variable scope and prevent code from interfering with other scripts and prevents from creating Impure functions.
// The Syntax
// 1. The Function Expression: Enclosed inside grouping parentheses (). This turns a standard function declaration into an expression that the JavaScript engine can evaluate immediately.
// 2. The Invocation: A final pair of parentheses () at the end, which actually executes the function.

// Normal function
(function () {
  console.log("This runs instantly!");
})();

// Arrow function
(() => {
  console.log("This arrow function also runs instantly!");
})();
console.log("--------------------------------------------------------------------------------------------");
// ----------------------------------------------------------------------------------------------------------------

const potionShop = (function () {
  let inventory = 0;

  return {
    brew() {
      inventory++;
      return `Brew Potion #${inventory}`;
    },

    getStock() {
      return inventory;
    }
  }
})()

potionShop = {
  brew() {
    inventory++;
    return `Brew Potion #${inventory}`;
  },

  getStock() {
    return inventory;
  }
}

console.log(potionShop);
console.log(potionShop.brew);
console.log(potionShop.brew());

// MMMMMIIIIMMMMPPPPP: In IFFE function you cannot access its variable like (potionShop.inventory). If you acces them then it return undefined.
console.log(potionShop.inventory);

console.log("--------------------------------------------------------------------------------------------");
// ----------------------------------------------------------------------------------------------------------------

function makeFunc() {
  const name = "Mozilla";

  function display() {
    console.log(name);
  }

  return display;
}

const myFunc = makeFunc();
myFunc();



