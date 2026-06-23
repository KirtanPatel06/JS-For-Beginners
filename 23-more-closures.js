const cache = {};

function add (a, b){
    const key = `${a}:${b}`;
    if(cache[key])
        return cache[key];

    const result = a + b;
    cache[key] = result;
    console.log(Object.entries(cache));

    return result;
}

add(3, 4);
add(10, 100);
add(45, 347);
add(3, 4);

// BONUS CONCEPT: CACHING (Memoization)

// Normally: function add(a, b) {
//              return a + b;
//           }

// ---> Har baar add(3, 4) call hoga, CPU dobara calculation karega.

// ---> Chhote calculations me koi problem nahi hoti, lekin agar calculation expensive ho (large loops, database queries, API calls, image processing, etc.) to baar-baar same calculation karna waste ho sakta hai.
// --------------------------------------------------------------------

// ---> Is problem ko solve karne ke liye ham Cache use karte hain.

// ---> Cache ek storage hoti hai jaha ham pehle se calculate kiye hue results rakh dete hain.

// Example: add(3, 4)

// Pehli baar: Cache me result nahi milega. CPU calculation karega. Result = 7

// Cache: {
//          "3:4": 7
//        }
// --------------------------------------------------------------------

// ---> Ab agar dobara: add(3, 4) call hua, To CPU calculation nahi karega.

// Ham direct cache me se: cache["3:4"] return kar denge.
// --------------------------------------------------------------------

// ---> Benefit: Same calculation baar-baar karne ki zarurat nahi. CPU work kam hota hai. Response faster milta hai.
// --------------------------------------------------------------------

// ---> Is technique ko Memoization bhi kehte hain. Memoization: "Store previous results and reuse them
// when the same input appears again."

// Memory Rule: First Time => Calculate + Store
//              Next Time => Read From Cache

// Calculation se sasta hota hai: Cache Lookup
// --------------------------------------------------------------------

// ---> Ab Agar ham add(), square(), multiply(), divide() sabke liye alag-alag cache object banaye, to code repetitive aur messy ho jayega.

// ---> Isliye ham ek generic memoization function bana rahe hain: createOptimizedVesrion(fn)

// ---> Ye kisi bhi function ko optimize kar sakta hai.

// ---> Yaha Closure ka concept use ho raha hai.

// ---> Jab createOptimizedVersion() execute hota hai, to uske andar ek private 'cache' object banta hai. Aur Ye 'cache' us function ka personal Tiffin Box hai.

// ---> Fir createOptimizedVersion() ek naya function return karta hai.

// ---> Returned function ko future me bhi cache ki zarurat padegi. Aur wo function 'cache' ko use bhi kar raha hai, jo ki createOptimizedversion() ka local variable hai.

// ---> Isliye JavaScript 'cache' ko destroy nahi karta. Kyunki aage returned hua function usko use kar sakta hai.

// ---> To Closure ki wajah se cache memory me zinda rehta hai.

// ---> Ab har optimized function ka apna alag personal cache hoga.
//
// Example: optimizedSquare
//              └── cache {}

//          optimizedMultiply
//              └── cache {}

// Dono ek dusre ka cache share nahi karte.

// ---> Jab same arguments dobara aate hain, to pehle cache check hota hai.

// ---> Agar result mil gaya: Return cached result.

// ---> Nahi mila: Function execute karo. Result cache me store karo. Fir result return karo.
// --------------------------------------------------------------------

// ---> MMMMIIIIMMMMMPPPP NOTE: Yaha hamne caches ki quantity kam nahi ki hai. Har optimized function ka apna alag cache hoga.

// ---> Ham manually bhi alag-alag cache bana sakte the, par usse code repetitive aur messy ho jata.Isliye ek generic optimizedCache() function bana diya jo kisi bhi function ko optimized  version me convert kar deta hai.

// ---> Aur Closure ki wajah se har function ka cache uske personal tiffin box me zinda rehta hai.

// ---> Memory Rule: Hamne memory nahi bachayi, hamne code duplication bachaya hai.

function createOptimizedVersion(fn){
    const cache = {

    } //Tiffin

    return function(...args){
        const key = JSON.stringify(args);
        if(cache[key])
            return cache[key];

        const result = fn(...args);
        cache[key] = result;
        console.log(Object.entries(cache));
        return result;
    }
}

function square(n){
    return n*n;
}

function multiply(a, b){
    return a * b;
}

function cube(n){
    return n * n * n;
}

function subtract(a, b){
    return a - b;
}

function divide(a, b){
    if(b == 0)
        return null;
    return a / b;
}

const optimizedSquare = createOptimizedVersion(square);
const optimizedMultiply = createOptimizedVersion(multiply);

optimizedSquare(3);
optimizedMultiply(5, 4);

