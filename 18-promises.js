// JS works on a Single threaded ( JS ek hi thread pe saara kaam karti hai, aur puri ki puri synchronized hai).
// To fir iska matlab ye hua ki, Agar apne kisi network ko join karne ke liye request kiya aur response aane me time laga servers se, to fir apki JS tab tak bethi rahegi jab tak response nahi aayega aur aage dusra kaam nahi kar payegi, to fir to time waste hoga.
// Aur agar aapne koi file read karne ko bol diya aur jan tak wo file read ho kar nahi aayegi, tab tak bhi aapki JS block ho jayegi. Aur agar file bohot lambi hogi to time waste hogd kyunki aage dusra kaam nahi ho payega.

// To is solution ke liye 'promises' picture me aate hai.
// Matlab jab ham koi network join karne ke liye request karte hai, to saath me uss function ke paas ek 'promise' bhi le lete hai ki 'bhai jab response aajay to bata dena, me tere me vishwwas rakh kar jaa raha hoon, ki tu bata hi dega' aur aage apna dusra kaam karne lagte hai.
// Wese hi jab koi file read karni hoti hai, ty uske function ke paas bhi 'promise' le lete hai ki 'bhai jab file read ho jaaye to bata dena', esa kuch promise leke haam aage apna kaam karne lag jaate hai.

// Iski wajah se time waste bhi nahi hoga aur hame response ka intezzar bhi nahi karna padega aur hamara code ka execution aage chalta rahega.


// Promises are newly introduced in JS, before it we have (callbacks) as shown below
// CREATING CALLBACKS
function prepareDishCallBack(dish, callback){
    setTimeout(() => callback(null, {dish, status: "prepared"}, 100));
}

function prepareOrderCallBack(order, callback){
    setTimeout(() => callback(null, {...order, status: "picked up"}, 100));
}

function deliverOrderCallBack(order, callback){
    setTimeout(() => callback(null, {...order, status: "delivered"}, 100));
}

// CONSUMING CALLBACKS
prepareDishCallBack("Frankie", (error, order) => {
    if(error) return console.log(error);
    prepareOrderCallBack(order, (error, order) => {
        if(error) return console.log(error);
        deliverOrderCallBack(order, (error, order) => {
            if(error) return console.log(error);
            console.log(`${order.dish}: ${order.status}`);
        })
    })
})

// Ye jo upar hamne callbacks use karke handle kiya (jo ki 'promises' aane se pehle karte the log isko use) uska syntax aur way of writting bohot difficult hai kyunki callbacks hai to ek ke andar dusra function execute karna padta hai.
// Isliye abhi ham 'promises' use krte hai kyunki wo likhne me aur samajhne me easy hai.

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("++++++++++++++++++++++++++++++++++ Using Promises +++++++++++++++++++++++++++++++++++++\n");

// Promise has 3 states:
// 1. Promise Fulfilled
// 2. Promise Rejected
// 3. Promise Pending(on hold)

// Parts of Promise:
// 1. resolve
// 2. reject

// See 'Promise' have 3 states but 2 parts.

// CREATING PROMISES
function prepareOrder(dish){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!dish){
                reject(new Error("No dish is there !"));//here no need to throw the Error Explicitly,
                                                        // using 'throw' keyword.
                                                        // Because reject() throws it implicitly.
                return;
            }
            console.log(`${dish} is ready`);
            resolve({dish, status: "prepared"});
        }, 1000);
    })
}

function pickOrder(order){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!order){
                reject(new Error("No order recieved !"));
                return;
            }
            console.log(`${order} is on the way...`);
            resolve({...order, status: "picked"});
        }, 1000);
    })
}

function deliverOrder(order){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`${order} is delivered`);
            resolve({...order, status: "delivered"});
        }, 3000);
    })
}

// CONSUMING PROMISES(famously called as Promise CHAINING)
// here we use .then(). It handles the success case(resolved case).


// PROMISE CHAINING:
// 'Promise Chaining' is the process of executing multiple asynchronous operations in a sequence, where each step waits for the previous one to complete. Instead of nesting callbacks deeply (often called "callback hell"), you chain .then() methods together. Each .then() returns a brand new promise, allowing you to pass the result of one task to the next in a clean, flat structure.

// What .then() handles?
// The .then() method handles the successful resolution (fulfillment) of a promise. It takes up to two callback functions as arguments:

// 1. OnFulfilled (Success): The first argument is a function that runs when the previous promise successfully completes. The result (or returned value) of the previous step is passed into this function.
// 2. OnRejected (Error): The optional second argument is a function that handles any errors if the promise gets rejected. (Note: It is considered best practice to handle all errors at the very end of the chain using .catch() rather than passing this second argument).

prepareOrder("chai")
    .then(order => pickOrder(order))
    .then(order => deliverOrder(order))
    .catch(error => console.log(error));

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------




