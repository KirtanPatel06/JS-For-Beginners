// .call() & .apply() => basic chef (kitchen)
// .bind() => returns a new function

// ------------------------------------------------------------------------------------------------------
console.log("-----------------------------------------------------------------------------------------");
console.log("+++++++++++++++++++++++++++++++ .call() & .apply() ++++++++++++++++++++++++++++++++++++\n");

function cookDish(ingredient, style){
    return `${this.name} prepares ${ingredient} in ${style} style !`;
}

const sharmaKitchen = {name: "Sharma jis Kitchen"};
const guptaKitchen = {name: "Gupta jis Kitchen"};
const rajaKitchen = {name: "Raja ji ka Kitchen"};

// console.log(sharmaKitchen.cookDish("Panner & spices", "Mughlai"));
// the above line will give error because "cookDish()" function is not declared(mentioned) in the Object named sharmaKitchen or in the guptKitchen.

// The solution is to use .call(), .apply().
// call() and apply() do the same thing:
// They invoke a function immediately and let you explicitly set the value of this.
// The only difference is how the arguments are passed.

// .call(): Arguments are passed one by one.
// Using .call()
console.log("Using .call() ->", cookDish.call(sharmaKitchen, "Panner Afghani", "Mughlai"));

// .apply(): Arguments are passed as an array.
// Using .apply()
const guptaOrder = ["Panner Lababdar", "Punjabi Dhaba"]; //array
console.log("Using .apply() ->", cookDish.apply(guptaKitchen, guptaOrder));


// You can also use spread Operator(...) with .call(): Arguments are passed using spread operator(...)
// Using (...) with .call()

const rajBhog = ["Chhappan Bhog", "Shahi"];
console.log("Using spread Operator(...) with .call() ->", cookDish.call(rajaKitchen, ...rajBhog));

// const rajBhog = {ingredient:"Chhappan Bhog", style:"Shahi"};

// rajBhog[Symbol.iterator] = function(){
//     const properties = Object.entries(this);
//     let index = 0;

//     // 2. The method must return an iterator object
//     return {
//       // 3. The iterator object must have a next() function
//       next() {
//         if (index < properties.length) {
//           const [role, name] = properties[index++];
//           // Custom behavior: format the output string dynamically
//           return { value: `${name}`, done: false };
//         }
//         // Tell the loop to stop
//         return { value: undefined, done: true };
//       }
//     };
// }
// console.log("Using spread Operator(...) with .call() ->", cookDish.call(rajaKitchen, ...rajBhog));



console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("+++++++++++++++++++++++++++++++++++++++ .bind() +++++++++++++++++++++++++++++++++++++++\n");

// bind() is often easier to understand if you compare it with call() and apply().
// bind() creates and returns a new function.
function reportDelivery(location, status){
    return `${this.name} at ${location}: ${status}`;
}

const deliveryBoy = {name: "Chotu"};

console.log(".bind() returns a new funtion -> ", reportDelivery.bind(deliveryBoy, "Pune", "Ordered")); // returns a new function.

const bindReport = reportDelivery.bind(deliveryBoy, "Pune", "Ordered");
console.log("Using .bind() ->", bindReport());

/*
bind() does not execute the function.

It returns a new function with:

1. 'this' permanently set to the provided object.
2. Optional arguments pre-filled.

const boundFn = fn.bind(obj);

Later:

boundFn();

is similar to:

fn.call(obj);

Use bind() when a function may lose its
original object context (detached methods,
callbacks, event handlers, timers, etc.).

Memory Rule:
call()  -> execute now
apply() -> execute now (array args)
bind()  -> create a new function, execute later

// MMMIIIMMMPPP: bind() returns a new function with 'this' permanently fixed.
It means that after using b.ind(), JavaScript no longer decides 'this' from the call site. Instead, 'this' is locked to the object you provided.
*/

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("+++++++++++++++++++++ using .bind() to solve detached method problem ++++++++++++++++++\n");

const actor = {
    name: "Ranveer",
    bow(){
        return `${this.name} takes the Bow`;
    }
};

// Without .bind()
const detachedBow = actor.bow;
console.log("Without .bind() ->", detachedBow());

// With .bind()
const boundBow = actor.bow.bind(actor);
console.log("With .bind() ->", boundBow());
// Here .bind() locked the 'this' pointer to the object named 'actor'. Now Another object, let us say 'actor2' cannot change it.

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("+++++++++++++++ Example of 'this' pointer permanently fixed using .bind() +++++++++++++\n");

function showName() {
    return this.name;
}

const person1 = { name: "Virat" };
const person2 = { name: "Ranveer" };

const boundFn = showName.bind(person1);
boundFn.call(person2);
console.log("Even after doing 'boundFn.call(person2)' in line no. 122 it will print ->", boundFn());
