// ECMAScript (ES) is the official specification (rulebook) for JavaScript.
// It defines what features the language should have and how they should behave.

// JavaScript engines (V8, SpiderMonkey, JavaScriptCore, etc.) implement
// these specifications so they can execute JavaScript code.

// Sometimes a new ECMAScript version introduces a feature (e.g. Array.prototype.includes()).

// Older JavaScript engines may not have implemented that feature yet.
// So if we try to use it, we'll get an error because the engine doesn't
// know how to execute it.

// A Polyfill is our own JavaScript implementation of that missing feature.
// It mimics the behavior defined by the ECMAScript specification, allowing
// older engines to support newer JavaScript features.

// In short:
// ECMAScript → Defines the feature
// JavaScript Engine → Implements the feature
// Polyfill → Adds the feature if the engine doesn't support it

// ----------------------------------------------------------------------------------------------
// Rough implementation of .map()
// Array.prototype.myMap = function(callback){
//     let arr = [];

//     for(let i = 0; i < this.length; i++){
//         arr.push(callback(this[i], i, this));
//     }
//     return arr;
// }

// Native Implementaion of .map()
Array.prototype.myMap = function (callback, thisArg) {
    let arr = new Array(this.length);

    for (let i = 0; i < this.length; i++) {        //Hole
        //                                         👇
        // Skip empty slots (holes).       Eg:- [1, , 3]
        if (i in this) {
            arr[i] = callback.call(thisArg, this[i], i, this);
        }
    }

    return arr;
}

let arr = ["Orange", "Mango", "Strawberry", "Pineapple", "Banana"];

arr = arr.myMap((fruit) => {
    return fruit + " Juice";
});

console.log(arr);

// ----------------------------------------------------------------------------------------------
// Arrays in JavaScript are actually Objects.
// Their indexes (0, 1, 2, ...) are object property keys.

// Example:
// const arr = ["A", "B", "C"];

// Internally (conceptually):
// {
//   "0": "A",
//   "1": "B",
//   "2": "C",
//   length: 3
// }

// The `in` operator checks whether a property/key exists in an object.
// It DOES NOT check the value stored at that key.

// Example:
// 0 in arr; // true
// 1 in arr; // true
// 5 in arr; // false

// -------------------------------
// Sparse Arrays
// -------------------------------

// const sparse = [10, , 30];

// Conceptually:
// {
//   "0": 10,
//   // No property "1"
//   "2": 30,
//   length: 3
// }

// Hence:
// 1 in sparse;    // false
// sparse[1];      // undefined

// -------------------------------
// undefined vs Empty Slot (Hole)
// -------------------------------

// const arr2 = [10, undefined, 30];

// Conceptually:
// {
//   "0": 10,
//   "1": undefined,
//   "2": 30
// }

// Here, index 1 exists, but its value is undefined.
// 1 in arr2;      // true
// arr2[1];        // undefined

// -------------------------------
// Why does native map() use:
// if (i in this)
// ?
//
// Because it wants to process ONLY the indexes that actually exist.
// This preserves empty slots (holes) in sparse arrays instead of
// treating them as undefined values.

// -----------------------------------------------------------------------------------------------
// Implementation of .myforEach()
Array.prototype.myForEach = function (callback) {

    for (let i = 0; i < this.length; i++) {

        if (i in this) {  // skip holes
            callback(
                this[i], // Current element
                i, // Current Index
                this // Original Array
            );
        }
    }
    return undefined;
}

const sweets = ["Doodh Pak", "Gulab Jamun", "Kaju Katli", "Gajar ka Halwa"];

sweets.myForEach((sweet, index) => {
    console.log(`${index}: ${sweet}`);
});

// -----------------------------------------------------------------------------------------------
// Rough Implementation of .flat()
// Array.prototype.myFlat = function () {
//     let arr = [];

//     for (i = 0; i < this.length; i++) {

//         if (Array.isArray(this[i])) {  //Use Array.isArray(). So that "string" get copied correctly
//             for (let j = 0; j < this[i].length; j++) {
//                 arr.push(this[i][j]);
//             }
//         }
//         else
//             arr.push(this[i]);
//     }
//     return arr;
// }


// Native Implementation
Array.prototype.myFlat = function(depth = 1){
    const arr = [];

    function flatten(array, currentDepth){
        for(const item of array){
            if(Array.isArray(item) && currentDepth > 0)
                flatten(item, currentDepth - 1); // Recursice call
            else
                arr.push(item);
        }
    }

    // Function call
    flatten(this, depth);

    return arr;
}

const nums = [1, 2, 3, [4, 5, 6, [7, 8, 9], "10", 11], 12];

const flatten = nums.myFlat(2);
console.log(flatten);

// -----------------------------------------------------------------------------------------------
// Rough Implementation of .filter()
// Array.prototype.myFilter = function(callback){
    //     let arr = [];
    
    //     for(let i = 0; i < this.length; i++){
        
    //         if(i in this){    // skip holes
    //             if(callback(this[i], i, this))
    //             arr.push(this[i]);
    //         }
    //     }
    //     return arr;
    // }
    
    // Native Implementaion of .filter()
    Array.prototype.myFilter = function(callback, thisArg) {
        // 1. Check if callback is a function
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        
        const result = [];
        
        // 2. Iterate over the array
        for (let i = 0; i < this.length; i++) {
            
            // 3. Skip holes in sparse arrays
            if (i in this) {
                
                // 4. Call callback with proper 'this'
                if (callback.call(thisArg, this[i], i, this)) {
                    
                    // 5. Keep the original element
                    result.push(this[i]);
                }
            }
        }
        
        return result;
    };
    
    const n = [2, 4, 534, 34, 9, 0, 7, 5, 34, 234, 7, 8];
    
    const even = n.myFilter((i) => {
        return i % 2 == 0;
    });
    
    console.log(even);
    
// -----------------------------------------------------------------------------------------------
// Native implementaion of .concat();
String.prototype.myConcat = function(...str){
    return String(this) + str.map(String).join("");
}

const f_name = "Joseph";
const l_name = " Alilo";
const father = " Z"

console.log("Hello".myConcat(123, true, null));

// -----------------------------------------------------------------------------------------------
// Rough Implementation of .split()
String.prototype.mySplit = function(separator, limit = Infinity) {
    const arr = [];
    let chunk = "";

    for (let i = 0; i < this.length; i++) {

        if (this[i] === separator && limit) {
            arr.push(chunk);
            chunk = "";
            limit -= 1;
        } 
        else
            chunk += this[i];
    }

    if(limit) 
        arr.push(chunk);

    return arr;
};

const nasto = "Dabeli Pizza Vadapav Sandwich";
const nastoArray = nasto.mySplit(" ", 2);
console.log(nastoArray);


// Native Implementation of .split()
String.prototype.mySplit = function (separator, limit = Infinity) {
    // If separator is undefined, return the whole string.
    if (separator === undefined)
        return [String(this)];

    // If separator is "", split every character.
    if (separator === "") {
        const result = [];

        for (let i = 0; i < this.length && result.length < limit; i++) {
            result.push(this[i]);
        }
        return result;
    }

    const result = [];
    let chunk = "";

    for (let i = 0; i < this.length; i++) {
        // Check if the next characters match the separator.
        if (this.slice(i, i + separator.length) === separator && result.length < limit - 1) {
            result.push(chunk);
            chunk = "";

            // Skip the entire separator.
            i += separator.length - 1;
        } else
            chunk += this[i];
    }
    // Push the last chunk.
    if (result.length < limit)
        result.push(chunk);

    return result;
};

const phones = "Samsung -- Apple -- Motorola -- Vivo -- Oppo -- Realme";
const phoneArray = phones.mySplit(" -- ");
console.log(phoneArray);