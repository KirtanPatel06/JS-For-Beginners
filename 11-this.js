console.log("-----------------------------------------------------------------------------------------");
//In Node.js, it evaluates to the global object. Calling typeof "this", returns "empty object {}"
console.log(this);
// But In a standard browser script, this evaluates to the Window Object. If you write console.log(this) on a browser by clicking the inspect. then it will also return a global Object called "Window Object". 
// The value of this is completely dynamic. It depends entirely on how and where a function is executed, rather than where it was written:
// Global Scope (Browser): Points to the window object.
// Global Scope (Node.js file): Points to module.exports, which is initially an empty object {}.

function ranveerOnGlobalStage(){
    return typeof this;
}

console.log("Type of 'this' -> ", ranveerOnGlobalStage());
console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

// The this keyword points differently in strict mode versus non-strict mode (sloppy mode) when dealing with global function calls and explicit binding primitives.
// Non-Strict Mode: this automatically defaults to the global object (window in browsers, global in Node.js).
// Strict Mode: this remains undefined. This prevents accidental modification of global variables.
function ranveerWithNoScriptInNonStrictMode(){
    return this;
}
console.log("In non-strict mode -> ", ranveerWithNoScriptInNonStrictMode());

function ranveerWithNoScriptInStrictMode(){
    "use strict";
    return this;
}
console.log("In strict Mode -> ", ranveerWithNoScriptInStrictMode());


console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

const bollyWoodFilm = {
    movieName: "Dhurandhar",
    leadActor: "Ranveer",

    // Normal Function
    introduce(){
        return `Movie Name: ${this.movieName} \nLead Actor: ${this.leadActor}`;
    }
}
console.log(bollyWoodFilm.introduce());

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

const filmDirector = {
    directorName: "Sanjay Leela Bhansali",
    cast: ["Ranveer", "Deepika", "Priyanka"],

    announceCast(){
        this.cast.forEach((actor) => {
            console.log(`${this.directorName} introduces ${actor}`);
        })
    }
}
filmDirector.announceCast(); //call to function

// We know that arrow function does not have "this" keyword. But here "this" is used inside a normal function(i.e announceCast()). And inside it we have used a forEach() loop which uses an  Arrow function  (i.e (actor) => {}). Here forEach() loop have access of "this" keyword, so arrow function inside it will also have the access of "this" keyword. And also

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("++++++++++++++++++++++++++++++++ Outer Normal Funtion +++++++++++++++++++++++++++++++++\n");
// MMMMMMMMMMIIIIIIIIMMMMMMMMMMPPPPPPPPPP
// A Nested Normal function(Nested Inside a Normal funtion) does not inherit "this". It gives 'undefined' if you try to print 'this'. But A Nested Arrow function(nested Inside a Normal funtion) inherits "this" keyword. Also an arrow function in a forEach() loop inherits "this" as shown above, because a forEach() loop is a built-in JS function/Method and an Arrow function inside it acts as a Nested Arrow function. That's why it inherits the "this" keyword from the forEach() loop.

// MMMMMIIIIMMMMPPP Note: The Nested Arrow funtion should be Nested Inside a Normal Funtion.

const filmSet = {
    crew: "Spot boys",

    // Outer Normal function
    prepareProps(){
        console.log("Outer Normal function, this.crew ->", this.crew);

        // Nested Normal funtion(Nested Inside a Normal Funtion)
        function arrangeChairs(){
            console.log("Nested Normal function(Nested Inside a Normal Funtion), this.crew ->", this.crew);
        }
        arrangeChairs();
        
        // Nested Arrow Function(Nested inside a Normal Funtion)
        const arrangeLights = () => {
            console.log("Nested Arrow function(Nested Inside a Normal Funtion), this.crew ->", this.crew);

            // Double Nested Arrow Function
            const arrangeFloodLights = () => {
                console.log("Double Nested Arrow Function, this.crew ->", this.crew);
            }
            arrangeFloodLights();
        }
        arrangeLights();
    }
}
filmSet.prepareProps(); //call to funtion

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("++++++++++++++++++++++++++++ Outer Arrow Function +++++++++++++++++++++++++++++++++++++\n");
// If You use Nest an Arrow funtion inside an Outer Arrow funtion. then it gives "empty Object{}". Because the Outer Arrow function does not have "this" keyword.
// If you print 'this' inside an arrow function, JavaScript will look up the scope chain to find the nearest parent scope that defines a this value. What actually prints depends entirely on where you wrote the arrow function.
// If you define and run an arrow function directly in your global script, this falls back to the global execution context.
// In a Browser: It prints the Window object.
// In Node.js: It prints an empty object {} (the global module exports).

// Outer Arrow Funtion
const outerArrowFunction = () => {
    console.log("Outer Arrow Funtion, this ->", this); // Logs: Window (browser) or {} (Node.js)

    // Nested Arrow Funtion(Nested inside an Arrow Funtion)
    InnerArrowFuntion = () => {
        console.log("Inner Arrow Funtion(Nested inside an Arrow funtion), this ->", this); 
        // Logs: Window (browser) or {} (Node.js)
    }
    InnerArrowFuntion();

    // Nested Normal Funtion(Nested insied an Arrow Funtion). This Nested 
    // We know that a Normal Function creates its own 'this' keyword. So no matters whether it is Nested inside an Arrow funtion or not. It will always cretaes it's own 'this' and will execute.
    function normalNestedFunctionInStrictMode(){
        "use strict"; //Using strict mode will print "undefined"
        console.log("Normal Nested funtion(Nested insdide an Arrow Funtion) using strict mode, this ->", this);
    }
    normalNestedFunctionInStrictMode();

    function normalNestedFuntionInNonSrtictMode(){
        // using non-strict mode will print "Global" inside Node.js
        console.log("Normal Nested funtion(Nested insdide an Arrow Funtion) using non-strict mode, this ->", this);
    }
    normalNestedFuntionInNonSrtictMode();
    // Regular functions only care about how they are called, not where they are written. When you call a nested function as a standalone statement (e.g., inner()), JavaScript treats it as a plain function call with no owner object, forcing this to fall back to the global object or undefined.
}
outerArrowFunction(); //call to function

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

//----------------------------
// DETACHED METHOD            |
//----------------------------

const actor = {
    name: "Ranveer",
    bow: function(){
        return `${this.name} takes the Bow`;
    },
}

// detachedBow = function(){
//     return `${this.name} takes the Sword`;
// }

const actor_2 = {
   name: "Chiku",
    bow: function(){
        return `${this.name} takes the Sword`;
    }
}

const detachedBow = actor_2.bow.bind(actor);
console.log(detachedBow()); //It will print "undefined takes the Bow".

// So Why "undefined" is printed instead of "Ranveer"?
// Ans:- 
/*
IMPORTANT: A JavaScript function does NOT remember which object owns it.

function bow() {
    return `${this.name} takes the Bow`;
}

The same function can be shared by multiple objects:

const actor1 = { name: "Ranveer", bow };
const actor2 = { name: "Shah Rukh", bow };

Both actor1.bow and actor2.bow point to the SAME function object.

JavaScript does NOT store:
    bow -> actor1
or
    bow -> actor2

Instead, the value of 'this' is decided WHEN THE FUNCTION IS CALLED.

actor1.bow()
^^^^^^
The caller is actor1, so:
this === actor1

Result:
this.name -> "Ranveer"

---------------------------------------

actor2.bow()
^^^^^^
The caller is actor2, so:
this === actor2

Result:
this.name -> "Shah Rukh"

---------------------------------------

Key Rule:
'this' depends on the CALL SITE (how the function is invoked),
NOT on where the function was defined or stored.

Therefore the same function can behave differently depending on
which object calls it.

If the function is detached:

const detachedBow = actor1.bow;
detachedBow();

there is no object before the dot, so the function loses its
object context and 'this' will not be actor1.
---------------------------------------------------------------------------------------------------------
actor1.bow()   -> this === actor1
actor2.bow()   -> this === actor2
detachedBow()  -> no caller object
                  this === undefined (strict mode)
                  this === window (non-strict browser)
*/

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

/*
this ?

├── Arrow Function
│     └── Inherit 'this' from parent scope
│
└── Normal Function
      │
      ├── object.fn()
      │      └── this = object
      │
      ├── fn.call(obj)
      │      └── this = obj
      │
      ├── fn.apply(obj)
      │      └── this = obj
      │
      ├── fn.bind(obj)
      │      └── new function with this = obj
      │
      ├── new Fn()
      │      └── this = newly created object
      │
      └── plainFn()
             │
             ├── strict mode
             │      └── this = undefined
             │
             └── non-strict mode
                    └── this = global object
*/
