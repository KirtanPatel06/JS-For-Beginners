console.log("-----------------------------------------------------------------------------------------");

// pending, resolve, reject

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Chaicode");
        reject("Chai nahi bann payi sorry...");
        console.log("Ho gaya...(pure do seconds lage complete hone me)");
    }, 2000);
});

console.log(promise);

promise.then((value) => {
    console.log(value);
});

//MMMMMMMIIIIMMMMMPPPP: Niche wali line Interview me bohot puchi jaati hai 
promise.then(console.log); //it prints the value return from the resolve(i.e Chaicode)

// ------------------------------------------------------------------------------------------------------

// ---> By default promise remains in pending state.
// ---> But it takes two parameters inside [() => {...}] as (resolve, reject) => {...}.
// ---> Promises turant khatam nahi hote, wo thodi der ke baad khatam hote hai, Kyunki uska kaam hi yahi hai ki jo request ayi hai, usse bol de ki "thodi der ruk jaa me apna kuch kaam nipta lu baad me pakka(promise) tera kaam kar dunga."
// ---> Isliye ham setTimeout() ka use karte hai. setTimeout() delay introdue karta hai. Matlab agar koi promise puri karni hai to wo kehta hai ki "thik hai bhai kar dunga par abhi nahi thode time(delay) ke baad karta hu". Isliye kuch delay dene ke liye ham setTimeout() ka use karte hai.
// ---> setTimeout() do parameters leta hai. setTimeout(kya_kaam_karna_hai, kitne_der_baad_karna_hai);
// Eg:- setTimeout(() => { resolve("chaicode") }, 1000).
// ---> upar ke eg. ka matlab hai ki "kuch kaam karna hai (resolve karni hai promise ko aur resolve karke 'chaicode' return karna hai, par 1000ms ke baad karna hai ye kaam)". To ho gaya na ki 'kuch kaam karna, par thodi der ke baad karna hai'. To ye setTimeout() ka kaam hai promises me.
// ---> Ab jab setTimeout() apna kaam kar lega thodi der ke baad, tab agar promise resolve() hui hogi to wo kuch return karegi jaise ki "Chaicode". To wo return value .then() ke andar jaati hai(agar promise resolve hui hai to). Fir ham .then() ke andar promise resolve hone par kuch print ya kuch kaam karva sakte hai.
// ---> Ek baat aur yaad rakhna ki setTimeout me jo bhi resolve ke andar likha hoga, jaise ki       resolve("Jo bhi yaha likha hoga"), wo sab .then() ke andar aayega jaise ki .then((sab kuch yaha aayega) => {}).
// ---> Aur ye .then() ka kaam hota hai ki jo bhi value resolve ne di hai, wo value .then() ke andar jo bhi function likha hai ya jo bhi print karva rahe ho aap console.log karke usko wo value de de.
// To agar me aisa likhu ki "promise.then(console.log)". Fir bhi wo value ko print kar dega. kyunki ye to .then() ka kaam hai ki console.log ko "Chaicode" de de. To .then() wo value console.log ko de dega aur console.log usko print bhi kar dega. Aisa jaruri nahi ki ham hamesha aise hi likhe  ki          "promise.then((value) => console.log(value))". Wo to hamne isme bas sirf value ko hold kiya aur baad me usko console.log(value) karke print karwaya. Baki ham direct bhi to value de sakte hai usko.
// ---> Aur console.log ki jagah koi aur function hota jaise ki "myFunction". To ham aisa likh hai ki  "promise.then(myFunction)". Ab myFunction ko to value .then() ne de di kyunki resolve ki value dene ki jimmedaari .then() ki thi. Ab ham myFunction me kuch bhi karva sakte hai jaise ki...
// const myFunction = (value) => { console.log(value) }. Aise bhi print karwa sakte hai.
// Matlab .then() hame value de dega ab us value ko kaise lena hai kya karna hai uske saath wo to ham apne tarike se kar sakte hai.
// ------------------------------------------------------------------------------------------------------
// ---> Chalo ab ye to baat ho gai resolve() ki. Par agar promise resolve nahi hua to ?
// ---> To uske liye ham reject() use karte hai.
// ---> reject() ka kaam hai ki agar promise resolve nahi hua to kuch error throw kar de.
// ---> Usually ham reject() me kuch aisa likhte hai "reject(new Error("Error aa gai"))".
// ---> Ab hame iss error ko 'throw' keyword se throw karne ki jarurat nahi hai, reject() khud kar deta hai throw karne ka kaam.
// ---> Aage agar baat kare to is error ko bhi recive .then() hi karta hai.
// ---> Hanji .then() sirf resolve() handle nahi karta, wo reject() ko bhi handle kar sakta hai.
// ---> .then() do parameters bhi le sakta hai [.then(ye wala resolve ke liye, ye wala reject ke liye)].
// ---> Isko ham kuch aise likhe ge...
// Eg:- promise.then((value) => {...}, (error) => {...});
// ---> resolve hua to 1st parameter meine jayega, aur reject hua to 2nd parameter mmein.
// ------------------------------------------------------------------------------------------------------
// ---> To bhaiya aap kahoge ki .catch() naam ki bhi koi cheez hoti hai. Wo kya karti hai ?
// ---> To suno .then() ke upar load badh jata hai(aisa hota nahi bas, syntactically jyada ho jata hai 
// .then() ke liye).
// ---> Isliye ham .catch() ko picture me laaye. Ki bhai errors ko tu handle karle.
// ---> Dekho .then() bhi kar sakta hai, par phir thoda syntactically code ko dekhne me maja nahi aata, isliye hamne .catch() ko bula liya.
// ---> Ab ham kuch aise likhe ge....
// Eg:- promise
//      .then((value) => {...})
//      .catch((error) => {...})
// ------------------------------------------------------------------------------------------------------
// ---> Chalo to ab aate hai PROMISE CHAINING par.
// ---> Hamara jo .then() hai wo values aage pass kar sakta hai(.catch() bhi aage pass kar sakta hai).
// ---> Matlab ham kuch aise likh sakte hai...
// Eg:- promise
//      .then((value) => {...})
//      .then((value) => {...})
//      .then((value) => {...})
//      .catch((error) => {...});
// ---> Isse kahte hai promise chaining.
// ---> Chalo ab samajhte hain ye kaam kese karta hai.
// ---> Dekho agar Promise resovle hui to wo kuch value return karegi aur hamara 1st .then() usko accept karega. Ab 1st .then() uss value pe kuch kaam karke, ek aur cheez return karega. Ab jo 1st .then() ne return kiya hai usse hamara 2nd .then() accept karega, aur wo bhi kuch return karega. Ab jo 2nd .then() ne return kiya hai usse hamara 3rd .then() accept karega. Aur bas aise hi chalta rahega.

// ---> Ek aur cheez. Aap .catch() ko bhi beech me likh sakte ho. Aur baad me .catch() bhi aage .then() ko kuch return kar sakta hai. Matlab kuch aise....
// Eg:- promise
//      .then((value) => {...})
//      .catch((error) => {...}) // aise bhi likh sakte hai beech me agar zarurat pade to.
//      .then((value) => {...}) // Jo .catch() return karega wo ye wala .then() accept karega.
//      .then((value) => {...})
//      .catch((error) => {...}); // warna normally to aise last me hi hota hai.
// ------------------------------------------------------------------------------------------------------

const secondPromise = new Promise((res, rej) => {
    setTimeout(() => {
        res("3 second ho gaye guyz...");
    }, 4000)
})

secondPromise
    .then((value) => {
        console.log(value);
        return value + "Ho gae bhaaaiii...";
    })
    .then((value) => {
        console.log(value);
    })
    .then((value) => {
        console.log("Aage wale ne kuch return nahi kiya to fir ye print hoga ->", value);
    })

// ---> Ek aur MMMMMMMMMMIIIIIIIIIMMMMMMMMMPPPPPP baat. Ki agar maanlo 2nd .then() ne kuch return hi nahi kiya, aur aap 3rd .then() mein kuch accept karke print karwa rahe ho to aapko 'undefined' milega.   Kyunki agar aage wala .then() kuch return hi nahi kar raha hai to piche wala .then() by default 'undefined' hi accept karega aur jo usne accept kiya hai(i.e. undefined) wo hi print karega.
// Eg:- promise
//      .then((value) => console.log(value))
//      .then((value) => console.log(value));
// OUTPUT:- Chaicode
//          undefined
// Kyunki 1st wala .then() sirf value ko print kar raha hai par kuch return nahi kar raha. Aur 2nd wala  .then() value accept kar raha hai, to by default usme 'undefined' hoga. To 2nd wala .then() jab value ko print karega to 'undefined' print hoga.
// ------------------------------------------------------------------------------------------------------


const turant = Promise.resolve("fatak se ho gaya...");
console.log(turant);

const allPromise = Promise.all([
    Promise.resolve("Chai"),
    Promise.resolve("Code"),
    Promise.resolve(".com")
]);

allPromise.then(console.log);

const anyPromise = Promise.any([
    Promise.reject("Chai"),
    Promise.reject("Code"),
    Promise.resolve(".com")
]);

anyPromise.then(console.log);

const allSettledPromise = Promise.allSettled([
    Promise.reject("Chai"),
    Promise.resolve("Code"),
    Promise.reject(".com")
])

allSettledPromise.then(console.log);

// ---> Ab baat karte hain Promise.all() ki.
// ---> Promise.all() tab use karte hain jab hame multiple promises ko saath me execute karna ho.
// ---> Iska rule bahut simple hai: "Ya to sab pass honge, ya sab fail honge."

// Syntax:
// Promise.all([promise1, promise2, promise3])

// ---> Promise.all() ek array leta hai jisme promises hote hain.
// ---> Ye saare promises ko parallel me start kar deta hai.
// ---> Fir wait karta hai ki sab complete ho jaye.

// ---> Agar saare promises resolve ho gaye to:
// Promise.all()
//      |
//      v
// resolve ho jayega, Aur hame ek array milega: [result1, result2, result3]

// Example: Promise.all([p1, p2, p3])
//          .then((values) => {
//              console.log(values);
//          });

// Output: ["Data1", "Data2", "Data3"]

// ---> Dhyaan dene wali baat:
// Result usi order me aata hai jis order me promises array me diye gaye the.

// Chahe p3 sabse pehle complete ho jaye,phir bhi output: [p1_result, p2_result, p3_result] hi rahega.
// ------------------------------------------------------------------------------------------------------
// ---> Lekin agar ek bhi promise reject ho gaya:

// p1 -> resolve
// p2 -> reject
// p3 -> resolve

// To Promise.all() turant reject ho jayega.

// Matlab: Promise.all()
//              |
//              v
// First Rejection milte hi reject ho jayega. Aur baaki successful results hame nahi milenge.

// Example: Promise.all([p1, p2, p3])
//          .then((values) => {
//              ...
//          })
//          .catch((error) => {
//              console.log(error);
//          });

// ---> Isliye Promise.all() tab use karo jab: "Mujhe sabka result chahiye. Agar ek bhi fail hua to pura kaam fail maana jayega."

// Example:
// - User Details
// - User Orders
// - User Payment Info

// Teeno chahiye.
// Ek bhi na mila to page incomplete hai.

// Isliye Promise.all() perfect hai.

// MEMORY RULE: Promise.all() = ALL SUCCESS OR FIRST FAILURE

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// ---> Ab baat karte hain Promise.allSettled() ki.
//
// ---> Promise.allSettled() bhi multiple promises ko parallel me chalata hai.

// ---> Lekin ek bada difference hai.
//
// Promise.all(): Ek reject mila -> khatam
//
// Promise.allSettled(): Sabka result laa ke dega. Resolve hua ya reject hua, dono ka result dega.
//
// Syntax: Promise.allSettled([p1, p2, p3])
//
// ---> Ye kabhi fail nahi karta.
//
// Ye wait karega: p1 complete ho
//                 p2 complete ho
//                 p3 complete ho
//
// Sab complete hone ke baad result dega.
//
// Example Result: [
//                  {
//                      status: "fulfilled",
//                      value: "Data1"
//                   },
//                   {
//                      status: "rejected",
//                      reason: Error("Error")
//                   },
//                   {
//                      status: "fulfilled",
//                      value: "Data3"
//                   }
//                 ]
//
// ---> Notice: Resolve hua? to value milegi. Reject hua? to reason milega.
//
// Isliye hame har promise ka result mil jata hai.
//
// ------------------------------------------------------------------------------------------------------
// ---> Ye kab useful hai?
//
// Example: 10 files upload karni hain.

// Agar 8 upload ho gayi aur 2 fail ho gayi.

// To hame fir bhi report chahiye ki: Kaunsi upload hui?
//                                    Kaunsi fail hui?
//
// Yaha Promise.all() use nahi karenge. Kyunki ek fail hote hi wo reject ho jayega.

// Promise.allSettled() use karenge.

// MEMORY RULE: Promise.allSettled() = GIVE ME EVERY RESULT

// Resolve ho ya reject, sabka hisaab de.

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// ---> Ab baat karte hain Promise.any() ki.

// ---> Promise.any() ka rule sabse interesting hai.
//
// Ye kehta hai: "Mujhe pehli SUCCESS de do."

// Syntax: Promise.any([p1, p2, p3])

// ---> Ye multiple promises ko parallel me start karta hai.
//
// Fir wait karta hai: Ki Koi ek promise resolve ho jaye.
//
// Jaise hi pehla successful promise mil gaya:
//
// Promise.any()
//      |
//      v
// Resolve ho jayega
//
// Aur us successful promise ki value return karega.
//
// Example: p1 -> reject
//          p2 -> resolve("Data from Server 2")
//          p3 -> resolve("Data from Server 3")
//
// Output: "Data from Server 2"

// Kyunki p2 sabse pehla successful promise tha.

// ------------------------------------------------------------------------------------------------------
// ---> Dhyaan dene wali baat:
//
// Promise.any() rejection ko ignore karta hai.

// Jab tak koi successful promise mil sakta hai, tab tak reject hone se farak nahi padta.

// Example: p1 -> reject
//          p2 -> reject
//          p3 -> resolve("Success")
//
// Output: "Success"

// Pichle dono reject ko ignore kar diya.

// ------------------------------------------------------------------------------------------------------
// ---> Lekin agar sab reject ho gaye:

// p1 -> reject
// p2 -> reject
// p3 -> reject

// To Promise.any() reject ho jayega.
//
// Aur ek special error throw karega: AggregateError

// Example: Promise.any([p1, p2, p3])
//             .catch((err) => {
//                 console.log(err);
//             });
//
// Output: AggregateError

// Kyunki ek bhi successful promise nahi mila.
//
// ------------------------------------------------------------------------------------------------------
// ---> Promise.any() kab use karte hain?
//
// Example:
//
// Aapke paas 3 servers hain:
//
// India Server
// Singapore Server
// US Server
//
// Jo sabse pehle data bhej de,
// uska response le lo.
//
// Baaki ko ignore kar do.
//
// Yaha Promise.any() perfect hai.
//
// MEMORY RULE:
//
// Promise.any()
//     = FIRST SUCCESS WINS
//
// Rejects ko ignore karo.
// Pehla successful result de do.
//
// Agar sab reject ho gaye:
//     AggregateError
//
// ------------------------------------------------------------------------------------------------------
//
// QUICK REVISION
//
// Promise.all()
//     -> Sab resolve hone chahiye.
//     -> Ek reject = pura fail.
//
// Promise.allSettled()
//     -> Sabka result chahiye.
//     -> Resolve + Reject dono.
//
// Promise.any()
//     -> Pehla successful result chahiye.
//     -> Sab reject = AggregateError.
//
// EASY MEMORY: all() -> Sab pass hone chahiye.
//              allSettled() -> Sabka report card lao.
//              any() -> Jo pehle pass ho jaye usko le aao.
// ------------------------------------------------------------------------------------------------------