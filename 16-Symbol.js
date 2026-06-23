console.log("-----------------------------------------------------------------------------------------");

const aadhar_of_mayur = Symbol("Aadhar");
const aadhar_of_piyush = Symbol("Aadhar");

console.log(typeof aadhar_of_mayur);
console.log(aadhar_of_mayur === aadhar_of_piyush);
console.log(aadhar_of_mayur.toString());
console.log(aadhar_of_mayur.description);

/*
============================================================================
SYMBOL BASICS
============================================================================

A Symbol is a unique primitive value.

Even if two Symbols have the same description, they are always different.

The description ("Aadhar" in this example) is only used for debugging and readability.

============================================================================
CODE EXPLANATION
============================================================================

const aadhar_of_mayur = Symbol("Aadhar");
const aadhar_of_piyush = Symbol("Aadhar");

Two different Symbols are created.

Although both have the same description:
    "Aadhar"

they are still unique values.

----------------------------------------------------------------------------

console.log(typeof aadhar_of_mayur);

Output: "symbol"

Reason: Symbol is its own primitive data type.

----------------------------------------------------------------------------

console.log(aadhar_of_mayur === aadhar_of_piyush);

Output: false

Reason: Every Symbol is unique.

Symbol("Aadhar") !== Symbol("Aadhar")

----------------------------------------------------------------------------

console.log(aadhar_of_mayur.toString());

Output: "Symbol(Aadhar)"

Reason: Converts the Symbol into a readable string.

----------------------------------------------------------------------------

console.log(aadhar_of_mayur.description);

Output: "Aadhar"

Reason: Returns the description that was passed while creating the Symbol.

============================================================================
MEMORY RULE
============================================================================

Description can be the same. But Actual Symbol value is always unique.

Symbol("Aadhar") !== Symbol("Aadhar")
============================================================================
*/

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

// MMMMMMMMMIIIIIIIMMMMMMMMMPPPPPPPPP for Interview
const nonIndian = Symbol();
console.log("---> If no description is passed in the Symbol then it will return 'undefined'");
console.log(nonIndian.description); // If no description is passed then it returns 'undefined';

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

const biometricHash = Symbol("biometricHash");
const bloodGroup = Symbol("bloodGroup");

const citizenRecord = {
    name: "Arjun Pandey",
    age: 19,
    [biometricHash]: 'fo7w4n3xpyr7yon',
    [bloodGroup]: 'O+'
}

console.log(Object.keys(citizenRecord)); // Symbol keyed properties(like biometricHash & bloodGroup) will not be displayed. They are hidden from 'Object.keys()'.

console.log(Object.getOwnPropertySymbols(citizenRecord)); 
// .getOwnPropertySymbols() returns all the Symbol keys present in the Object.

// Use case: Use Symbols when you want unique property keys that won't appear in normal key enumeration(Hidden Properties).

console.log("---------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("++++++++++++++++++ Iterating Objects using [Symbol.iterator](){...} +++++++++++++++++++\n");

const rtiQueryBook = {
    queries: ["Infra Budget", "Ration Card", "Education Budget", "Startup laws"],
    [Symbol.iterator](){
        let index = 0;
        const queries= this.queries;  
        return {
            next(){
                if(index < queries.length)
                    return {value: queries[index++], done: false};

                return {value: undefined, done: true};
            }
        };
    }
}

for(const query of rtiQueryBook){
    console.log(`Filing RTI: ${query}`);
}

//Here we are iterating over the values of the key named queries. So here we are taking have written  "const queries = this.queries" .If you want to iterate a Whole Object instead of just iterating a key. Then you can do "const properties = Object.entries(this)", by doing this you will have all the      [key, value] pairs of the that Object in the variable named 'properties'.

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

console.log("++++++++++++++++++++++ Playing with [Symbol.toPrimitive](){...} +++++++++++++++++++++++\n");

const governmentScheme = {
    name: "PM Krishi Sinchai Yojna",
    people: 63,
    [Symbol.toPrimitive](hint){
        if(hint === "string") return this.name;
        if(hint === "number") return 5000;
    }
}

console.log(+governmentScheme); //Converting an Object named governmentScheme into number by using (+ObjName);
console.log(`${governmentScheme}`); // Converting an Object named governmentScheme into string by using (`${ObjName}`)

