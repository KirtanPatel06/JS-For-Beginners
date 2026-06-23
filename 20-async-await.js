// ------------------------------------------------------------------------------------------------------
// ---> Ab baat karte hain async aur await ki.
// ---> Promise samajhne ke baad async-await samajhna bahut easy ho jata hai.
//
// ---> Sabse pehle ek baat yaad rakho:
//
// async-await koi alag cheez nahi hai. Ye Promise ke upar bana hua ek cleaner syntax hai.
//
// Matlab:  Promise
//             .then(...)
//             .catch(...)

//  aur:   async
//         await

// dono same kaam karte hain.

// async-await sirf code ko zyada readable bana deta hai.

// ------------------------------------------------------------------------------------------------------
// ---> Sabse pehle samajhte hain async keyword ko.

// Syntax: async function getData() {
//
//         }

// ---> Jab bhi kisi function ke aage async likhte ho, to JavaScript us function ko automatically Promise-returning function bana deta hai.

// Example: async function getData() {
//             return "Chaicode";
//          }

// ---> Ye internally kuch aisa behave karta hai:

// function getData() {
//     return Promise.resolve("Chaicode");
// }

// Matlab: return "Chaicode" 
// ke badle JavaScript khud likh deta hai: return Promise.resolve("Chaicode")

// ------------------------------------------------------------------------------------------------------

// Example: async function getData() {
//              return "Chaicode";
//          }
//         console.log(getData());

// Output: Promise { 'Chaicode' }

// ---> Dhyaan dena: Function ne string return kari thi, lekin output Promise aaya.
// ---> Kyunki async function hamesha Promise return karta hai.

// MEMORY RULE: async -> Function ko Promise-returning function bana deta hai.

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
//
// ---> Ab baat karte hain await keyword ki.
//
// ---> await sirf async function ke andar hi use ho sakta hai. Halaki latest JS me await ko async function ke bahar bhi globally use kar sake hai.

// Example:
// async function getData() {
//     await promise; //generally await ko async ke andar hi use karna perfer karna chahiye.
// }

// ------------------------------------------------------------------------------------------------------
// ---> await ka kaam hai: "Promise complete hone tak wait karo."
//
// Example: const promise = new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve("Chaicode");
//             }, 2000);
//          });
// 
//          async function getData() {
//             const value = await promise;
//             console.log(value);
//          }
//
//          getData();

// ---> Yaha kya hoga?

// getData() execute hoga.

// await promise
//      |
//      v
// Promise complete hone ka wait karega.

// 2 second baad: resolve("Chaicode") chalega.

// Fir: value = "Chaicode" ho jayega.

// Aur print hoga: Chaicode

// ------------------------------------------------------------------------------------------------------
// ---> Dhyaan dene wali baat: await promise ki VALUE nikaal deta hai.

// Promise: Promise { 'Chaicode' }

// await Promise: "Chaicode"

// Isliye: 'const value = await promise' ke baad: value me Promise nahi, actual resolved value hoti hai.

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// ---> Ab compare karte hain .then() aur await.
//
// Promise style: promise
//                  .then((value) => {
//                     console.log(value);
//                  });
//
// Async-Await style: const value = await promise;
//                    console.log(value);

// Dono ka output same hai.

// Async-await bas padhne me zyada natural lagta hai.

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
//
// ---> Ab baat karte hain multiple awaits ki.
//
// Example: async function getData() {
//
//             const user = await getUser();
//
//             const orders = await getOrders();
//
//             const payment = await getPayment();
//
//             }
//
// ---> Yaha kya hoga?

// Pehle: getUser() complete hoga.

// Fir: getOrders() complete hoga.

// Fir: getPayment() complete hoga.

// Matlab:Ye sequential execution hai. Ek ke baad ek.

// ------------------------------------------------------------------------------------------------------
// ---> Iska drawback?

// Time zyada lag sakta hai.

// Example: getUser()     -> 2 sec
//          getOrders()   -> 2 sec
//          getPayment()  -> 2 sec

// Total: 6 sec lag jayenge.

// ------------------------------------------------------------------------------------------------------
// ---> Agar sab independent hain,
// to Promise.all() better hai.
//
// Example: const [user, orders, payment] = await Promise.all([
//             getUser(),
//             getOrders(),
//             getPayment()
//          ]);

// Ab teeno parallel me chalenge.

// Total: ~2 sec

// instead of: ~6 sec

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// ---> Chalo ab baat karte hain errors ki.

// Promise style: promise
//                  .then((value) => {
//                     ...
//                  })
//                  .catch((error) => {
//                     ...
//                  });

// Async-Await style: try {
//                        const value = await promise;
//                    }
//                    catch(error) {
//                        console.log(error);
//                    }

// ------------------------------------------------------------------------------------------------------

// ---> Agar Promise reject ho gaya: reject("Error aa gayi");

// To: 'await promise' line par exception throw hoga.

// Aur control jump karega: catch(error) me.

// Example: try {
//              const value = await promise;
//          }
//          catch(error) {
//              console.log(error);
//          }

// Output: Error aa gayi

// ------------------------------------------------------------------------------------------------------

// ---> Isliye: .catch() ka equivalent hota hai: try-catch, async-await ke saath.

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// ---> Ek aur important baat.

// await poore JavaScript program ko pause nahi karta. Sirf current async function ko pause karta hai.

// Example: async function test() {
//              await promise;
//          }
//
//          console.log("Main Program");

// ---> JavaScript baaki code execute karti rahegi.

// Sirf us async function ke andar execution temporarily rukega.

// ------------------------------------------------------------------------------------------------------
//
// QUICK REVISION
//
// async -> Function ko Promise-returning bana deta hai.

// await -> 1. Promise complete hone ka wait karta hai.
//          2. Promise ki resolved value deta hai.
//          3. Sirf async function ke andar use hota hai.(Modern JS me Globally bhi use kar sakte hai)

// .then() -> await ke equivalent hai.

// .catch() -> try-catch ke equivalent hai.

// ------------------------------------------------------------------------------------------------------

// EASY MEMORY

// async -> "Ye function Promise return karega."

// await -> "Promise complete hone tak ruk ja."
//
// try-catch -> "Agar Promise reject ho jaye to error handle kar."

// async + await -> Promise likhne ka cleaner aur readable syntax.
// ------------------------------------------------------------------------------------------------------

const hPromise = new Promise((res, rej) => {
    setTimeout(() => {
        // res("Masterji");
        rej(new Error ("Masterji nahi aaye"));
    }, 2000);
})

async function nice(){
    try{
        const result = await hPromise;
        console.log(result);
    }
    catch(error){
        // console.log(error);
        console.log("Error aa gayi:", error.message);
    }
}

nice();

// const newResult = await hPromise; // Modern JS mein await ko aise bahar bhi use kar sakte hai par 
// console.log(newResult);              kabhi karna nahi chahiye.

