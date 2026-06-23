function makeFunc(){
    const name = "Mozilla";
    const age = 19;
    function displayName(){
        console.log(name);
    }
    return displayName;
}

const myFunc = makeFunc();
myFunc();

// ---> Upar ke code me hamare paas ek problem aata hai ki...

// ---> PROBLEM: displayName() function ke andar 'name' variable use ho raha hai.

// ---> Lekin 'name' variable makeFunc() ke andar declare hua hai.

// function makeFunc(){
//     const name = "Mozilla";
//     ...
// }

// ---> Aur hame pata hai ki local variables sirf usi function ke andar accessible hote hain jisme wo declare hue hain.

// ---> Ab dekho: const myFunc = makeFunc();

// ---> Yaha makeFunc() execute hua aur displayName() return ho gaya.

// ---> Ab makeFunc() ka kaam khatam ho gaya hai aur usne displayName() return kar diya 'myFunc' naam ke variable mein.

// ---> To logically uske local variables bhi remove ho jane chahiye,
// ---> including: const name = "Mozilla";

// ---> Ab baad me ham execute karte hain: myFunc();

// ---> myFunc me sirf itna hi content hai ===> line 3  displayName(){
//                                              line 4      console.log(name);
//                                              line 5  }

// ---> Matlab displayName() ab makeFunc() ke bahar execute ho raha hai.

// ---> To ab displayName() ko 'name' variable milna nahi chahiye, kyunki 'name' variable to 'makeFunc()' ka tha na, aur 'makeFunc()' to execute ho ke 9th no. ki line pe hi khatam ho gaya, to 'name' naam ka variable bhi usi ke saath destroy ho gaya hoga kyunki 'makeFunc()' to khatam ho gaya hai.

// ---> To logically output aana chahiye -> ReferenceError: name is not defined

// ---> Lekin actual output aata hai: "Mozilla"

// ---> Sawal: Jab makeFunc() khatam ho gaya tha, to displayName() ko 'name' kaha se mila?

// ---> Isi sawal ka answer CLOSURE deta hai.
// ------------------------------------------------------------------------------------------------------

/*
---> Normally: Har function ke saath ek Tiffin Box (Lexical Environment) hota hai.

---> Us Tiffin Box ke andar function ke saare local variables rakhe hote hain.

---> Maan lo Tiffin Box me: (name, age) dono variables rakhe hain.
---------------------------------------------------------

Ab function ke andar ek inner function hai.

Aur Ye inner function sirf: 'name' ko use karta hai. 'age' ko use nahi karta.
---------------------------------------------------------

---> To ab outer function ka kaam khatam ho jata hai, to normally uska Tiffin Box bhi hata diya jana chahiye.

---> Lekin JavaScript check karta hai:  "Kya koi inner function abhi bhi is Tiffin Box ki kisi cheez ko use kar raha hai?"
---------------------------------------------------------

JavaScript dekhta hai ki: name  -> inner function use kar raha hai ✅
//                        age   -> koi use nahi kar raha ❌
---------------------------------------------------------
Isliye: 'name' ko JavaScript Tiffin Box me zinda rakhta hai. Kyuki inner function ko future me iski zarurat pad sakti hai.

Lekin: 'age' ko JavaScript remove kar sakta hai, kyuki ab uski kisi ko zarurat nahi hai.

---> Matlab poora Tiffin Box nahi, balki sirf wo cheezein bachayi jati hain jo inner function use kar raha hota hai.


---> Yahi ClOSURE hai.

Closure ka kaam hai: Inner function ke liye required variables ko Tiffin Box me preserve karke rakhna,
taaki outer function khatam hone ke baad bhi inner function unhe access kar sake.

---------------------------------------------------------

Memory Rule: Inner function jis variable ko use karta hai,JavaScript usse Tiffin Box me zinda rakhta hai.

---> Jis variable ko koi use nahi karta, wo Garbage Collection ke liye eligible ho jata hai.

Initial Tiffin Box: ┌─────────────────┐
//                  │ name -> Mozilla │
/                   │ age  -> 25      │
//                  └─────────────────┘
---------------------------------------------------
Inner Function only needs:┌─────────────────┐
//                        │ name -> Mozilla │  ✅
//                        └─────────────────┘
//                        age removed ❌
---------------------------------------------------
Final Closure Tiffin Box: ┌─────────────────┐
//                        │ name -> Mozilla │
//                        └─────────────────┘
*/
console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("++++++++++++++++++++++++++++++++++++ Using closures +++++++++++++++++++++++++++++++++++\n");

function createCompany(){
    function creator(name){
        return `Name of your comapny is '${name}'`;
    }
    return creator;
}

const getCompany = createCompany();
const myCompanyName = getCompany("Hulala");
console.log(myCompanyName);

console.log("------------------------------------------");
// =================================================================

function eternal(guest){
    const guestName = guest;
    let count = 0;

    function zomato(){
        console.log(`Hi ${guestName}, from Zomato`);
    }

    function blinkit(){
        if(count > 0){
            return console.log(`Ye function ab dusri baar same O/P nahi dega (esa hi kuch react ke useMemo hook me hota hai)`);   
        }
        console.log(`Hi ${guestName}, from blinkit`);
        count++;
    }

    return {
        zomato,
        blinkit
    };
}

const kirtan = eternal("Kirtan");
const nidhi = eternal("Nidhi");

nidhi.zomato();
nidhi.blinkit();
kirtan.zomato();
kirtan.blinkit();
nidhi.blinkit(); // again nidhi.blinkit() will not give same O/P, because it's (count == 1).

console.log("------------------------------------------");
// =================================================================

const cups = ["blue", "green", "yellow", "orange", "red"];

// cups.map();


