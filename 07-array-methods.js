const orders = [
    {dish: "Pasta Carbonara", price: 14, spicy: "not spicy", qty: 2}, //order - 1
    {dish: "Dragon Ramen", price: 12, spicy: "spicy", qty: 1},  //order - 2
    {dish: "Caesar Salad", price: 9, spicy: "not spicy", qty: 3},  //order - 3
    {dish: "Inferno Wings", price: 11, spicy: "spicy", qty: 2},  //order - 4
    {dish: "Truffle Risotto", price: 18, spicy: "not spicy", qty: 1},  //order - 5
]; // an Array of objects

const myData = orders.forEach((order, index) => {
    console.log(`👉 ${index + 1}: ${order.qty} X ${order.dish} = ${order.qty * order.price}$`);
});

// console.log(myData); //forEach() does not returns anything it just iterates over "orders". So, in "myData" there is no value(undefined). To copy the data into any variable use .map()

// to copy orders to another array by making changes in it use .map(). The .map() method always returns a "new array containing the results of the callback(function) executed on each element of the original array.
const bill = orders.map((o) => {
    return `dish:${o.dish} X ${o.qty} = ${o.price * o.qty}`;
})
console.log("bill_details", bill);

// In JavaScript, .filter() returns a "new array containing only the elements from the original array" that pass a specific test (return true) implemented by a callback function. It does not change the original array and returns an empty array if no elements pass the test. So, rather then using some logic in .map() to filter the dishes which are "spicy", we can directly use the ".filter()" method 
const spicyItems = orders.filter((o)=> {
    return o.spicy === "spicy";
})
console.log("Spicy", spicyItems);

// In JavaScript, the .reduce() method returns the single value that results from the final execution of your reducer callback function. When your original array consists of objects, the return value depends entirely on whether you provide an initial value (the second argument to .reduce()) and what your callback returns.
const totatlRevenue = orders.reduce((sum, o) => {
    return sum + (o.price * o.qty);
}, 0);
console.log(`Total = ${totatlRevenue}$`);

const grouped = orders.reduce((acc, o) => {
    const taste = (o.spicy === "spicy") ? "spicy" : "mild";

    acc[taste].push(`${o.dish} (price: ${o.price}$)`);
    return acc;

}, {spicy: [], mild: []});
console.log(grouped);

// const ticketsNumbers = [100, 25, 27, 89, 15];
// const sorted = ticketsNumbers.slice().sort((a, b) => a - b);
//
// const sorted = [...ticktesNumbers].sort((a, b) => a - b); (you can also use [...] "spread operator" to copy an array). Also do .sort((a, b) => a - b). Beacause .sort() sortes the elements as string.
// console.log(sorted);

// .forEach() = to iterate the array. (returns undefined)
// .map() = to copy the array and make changes in it (returns a new copy of array).
// .filter() = to filter out something from array based on some conditions (return a new copy of array).
// .reduce() = it returns a single value. The return type of value depends on the 2nd parameter of ".reduce()"  function (it can be "0(int)" or "object{} like {spicy: [], mild: []}" or a "String" or an "Array[]").