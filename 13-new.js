// ------------------------------------------------------------------------------------------------------
console.log("-----------------------------------------------------------------------------------------");
console.log("+++++++++++++++++++++++++++ creating objects without 'new' ++++++++++++++++++++++++++++\n");

function createAutoRickshaw(id, route){
    return{
        id,
        route,
        run(){
            return `Auto ${this.id} running on ${this.route} route...`;
        }
    }
}

const auto1 = createAutoRickshaw("GJ-1", "Ahmedabad - Gandhinagar");
const auto2 = createAutoRickshaw("GJ-2", "Rajkot - Surat");

console.log(auto1.run());
console.log(auto2.run());

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("++++++++++++++++++++++++++++ creating objects with 'new' ++++++++++++++++++++++++++++++\n");

function TataCar(chasisNumber, modelName){
    this.chasisNumber = chasisNumber;
    this.modelName = modelName;
    this.fuelLevel = 100;
}

TataCar.prototype.status = function (){
    return `${this.modelName} #${this.chasisNumber} | Fuel: ${this.fuelLevel}`;
}

const car1 = new TataCar("GJ - 301281", "Nexon");
const car2 = new TataCar("GJ - 190806", "Harrier");

console.log(car1.modelName);
console.log(car2.modelName);
console.log(car1.status());
console.log(car2.status());
console.log(Object.getPrototypeOf(car1));
/*
WHY DO WE USE 'new'?

The 'new' keyword allows JavaScript to:

1. Create a new empty object.
2. Set up the prototype chain.
3. Bind 'this' to the new object.
4. Execute the constructor function.
5. Return the new object.

Without 'new', we would have to create and return the object manually.

The biggest advantage of 'new' is that objects can share methods through prototypes, which saves memory.


---> FACTORY FUNCTION(functions called without 'new' which Explicitly returns Object using 'return'):

A Factory Function manually creates and returns an object.

Example:
function createAutoRickshaw(id, route) {
    return {
        id,
        route,
        run() { ... }
    };
}

Factory Functions do not require 'new' because they explicitly return the object.

A common drawback is that if methods are defined inside the returned object, a new copy of those methods is created for every object instance.

For example:
auto1.run !== auto2.run

This means each object has its own separate run() function in memory.


---> CONSTRUCTOR FUNCTION(function called using new):

A Constructor Function is intended to be called with 'new'.

Example:
function AutoRickshaw(id, route) {
    this.id = id;
    this.route = route;
}

Methods can be placed on the prototype:

AutoRickshaw.prototype.run = function() {
    ...
};

Now all objects created with 'new' share the same run() method.

For example:
auto1.run === auto2.run

This is more memory efficient because only one copy of the method exists.


---> SUMMARY:
Factory Function:
    - Creates object manually.
    - Returns object manually.
    - No 'new' required.
    - Methods may be duplicated per object.

Constructor Function:
    - Uses 'new'.
    - JavaScript creates the object.
    - Constructor initializes the object.
    - Methods can be shared via prototypes.

Memory Rule:

Factory Function:
    "I create and return the object."

Constructor Function + new:
    "JavaScript creates the object;
     I initialize it."
*/

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------
