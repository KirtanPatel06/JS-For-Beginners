/*
DOES PROTOTYPE MEAN INHERITANCE?

Yes, JavaScript uses prototypes to implement inheritance.

A prototype serves two main purposes:

1. Method Sharing
---> Multiple objects can share the same methods instead of creating duplicate copies (refer 13-new.js).

2. Inheritance
---> An object can access properties and methods from another object's prototype.

When JavaScript cannot find a property on an object, it searches up the prototype chain.

This behavior allows child objects to inherit features from parent prototypes.

Therefore:
Prototype = The mechanism
Inheritance = One of the things that mechanism provides.

Memory Rule:
Prototype enables inheritance. Inheritance happens through the prototype chain.
*/
// ------------------------------------------------------------------------------------------------------
console.log("-----------------------------------------------------------------------------------------");
console.log("++++++++++++++++++++++++++++++++++++ Pruthviraj Era ++++++++++++++++++++++++++++++++++++\n")

const prithviraj = {
    name: "Prithviraj",
    generation: "Grandfather",
    cookTraditionalDish(){
        return `${this.name} cooks an Ancient Family recipie`;
    }
}

console.log(prithviraj);

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------
console.log("+++++++++++++++++++++++++++++++++++++++ Raj Era ++++++++++++++++++++++++++++++++++++++++\n")

const raj = Object.create(prithviraj);
console.log("Still prints ->", raj.name); // prints 'prithviraj' instead of 'raj'

raj.name = "raj";
raj.generation = "father";
raj.runBusiness = function(){
    return `${this.name} runs family business`;
}
console.log(raj.name); // now it will print 'raj'
console.log(raj.generation);
console.log(raj.runBusiness());
console.log(raj.cookTraditionalDish()); // raj got cookTraditionalDish() in inheritance
console.log(raj);

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("++++++++++++++++++++++++++++++++++++++ Ranbir Era ++++++++++++++++++++++++++++++++++++++\n")

const ranbir = Object.create(raj);
console.log("Still prints ->", ranbir.name);

ranbir.name = "ranbir";
ranbir.generation = "son";
ranbir.makeFilms = function(){
    return `${this.name} directs blockbuster movies`;
}

console.log(ranbir.name);
console.log(ranbir.makeFilms());
console.log(ranbir.runBusiness()); //ranbir got runBusiness() in Inheritance
console.log(ranbir.cookTraditionalDish()); // ranbir got cookTraditionalDish() in Inheritance

console.log("Does Ranbir's runBusiness() is its Own property ->", ranbir.hasOwnProperty("runBusiness"));
console.log("Does Ranbir's cookTraditionalDish() is its Own property ->", ranbir.hasOwnProperty("cookTraditionalDish"));
console.log("Does Ranbir's makeFilms() is its Own property ->", ranbir.hasOwnProperty("makeFilms"));

console.log(ranbir);

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("+++++++++++++++++ Creating own methods in Array Object using Prototype ++++++++++++++++\n");

console.log("-> Created a .last() method which gives las index of the array");
Array.prototype.last = function(){
    return this[this.length - 1];
}

console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].last());
console.log(["Anni", "Sexa", "Mumy", "Derek"].last());


console.log("-> Created a .myReduce() method works same as inbuilt .reduce()");
Array.prototype.myReduce = function(callback, initialValue){
    let accumulator = initialValue;

    for(let i = 0; i < this.length; i++){
        accumulator = callback(
            accumulator,
            this[i],
            i,
            this
        );
    }
    return accumulator;
}   

console.log([1, 2, 3].myReduce((acc, curr) => {
    return acc + curr;
}, 0));

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------