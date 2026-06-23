// const trainCode = Array.from("DUST");
// console.log(trainCode);

const tempTrain = ["A", "B", "C", "D", "E"];
console.log(tempTrain.length);
tempTrain.length = 3;
console.log(tempTrain);
tempTrain.length = 5;
console.log(tempTrain);


// push, pop, shift, unshift, splice - mutates the original content of the array

// concate, slice, flat (used in React, Redux to copy the data) - does not mutates the original array, instead returns a shallow copy of it

const trainCopy = tempTrain.slice(); // .slice() generally used in React & redux to copy the data.
console.log(trainCopy);



// indexOf, includes, find, finIndex - used for searching elements in array

// const inventory = [
//   { name: "apples", quantity: 2 },
//   { name: "bananas", quantity: 0 },
//   { name: "cherries", quantity: 5 }
// ];

// const result = inventory.find(fruit => fruit.name === "cherries");

// console.log(result); // Output: { name: "cherries", quantity: 5 }


/* key points
1. define array as "[]" not like "Array(3)"/ Beacuse Array(3) creates 3 empty slots and captures the space. Whereas "[]"    adds elements dynamically as new elements comes.
2. Array are 0 based means starts from 0. If you access 5th element in Array of size 3 then You will get "undefined" type error.
3. non flatted array means array inside an array Eg:- [1, 2, 3, [4, 5]]. Use methods like flatmap to make a flat array.
4. If you want to check whether the following is an Array or not the Always use "Array.isArray()". Do not use "typeof()" because "typeof() returns "object" for both "Array[]" & "Object{}". So always use "Array.isArray()" to check if it is Array or not.*/
