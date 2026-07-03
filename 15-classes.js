/*
============================================================================
CLASS CONCEPT IN JAVASCRIPT
============================================================================

A class is a blueprint/template used to create
multiple objects having the same structure and behavior.

The constructor initializes the object's data.

Each time 'new Cricketer(...)' is executed:

1. JavaScript creates a new empty object.
2. 'this' is bound to that object.
3. The constructor initializes the object's properties.
4. The object is returned automatically.

Example:

const p1 = new Cricketer(...);
const p2 = new Cricketer(...);

Both objects have their own separate data:

p1.name
p2.name

but they share common methods through the prototype.

============================================================================
CLASS METHODS
============================================================================

Methods written inside a class are NOT copied
into every object.

Instead, JavaScript stores them on:

Cricketer.prototype

Therefore all Cricketer objects share the same
copy of the method.

Memory Benefit:

p1.introduce === p2.introduce

returns true because both objects use the same
shared function.

============================================================================
OWN PROPERTIES vs PROTOTYPE PROPERTIES
============================================================================

Own Properties:
    Stored directly on the object(these properties are written inside the constructor).

Example:
    name
    role
    matchesPlayed
    stamina

Prototype Properties:
    Stored on Cricketer.prototype.

Example:
    introduce()

Therefore:

p1.hasOwnProperty("name")
    -> true

p1.hasOwnProperty("introduce")
    -> false

because introduce() is inherited from the prototype.

============================================================================
INTERVIEW NOTE
============================================================================

typeof Cricketer

returns:

"function"

Reason:

Classes in JavaScript are syntactic sugar over
constructor functions and prototypes.

Behind the scenes, a class is still a function.

Java:
    Built around Classes and Objects.

JavaScript:
    Built around Functions, Objects, and Prototypes.

============================================================================
*/

class Cricketer{
    constructor(name, role){
        this.name = name;
        this.role = role;
        this.matchesPlayed = 0;
        this.stamina = 100;
    }

    // introduce() is Internally created as "Cricketer.prototype.introduce = (){....}". Because it is cretaed outside the constructor. So instead of belonging to each objects individually, introduce() is shared by all objects. whereas, the properties which are defined inside the constructor are individually given to each object as their own properties(they are not shared). Means 'p1' has it's own 'name', also 'p2' hase it's own 'name'. But they share introduce() method. Because introduce() belongs to the Class not to any individual Objects.
    introduce(){
        return `My name is ${this.name} I am ${this.role} | Matches Played: ${this.matchesPlayed} | Stamina: ${this.stamina}`;
    }
}

const p1 = new Cricketer("Virat Kohli", "Right Hand Batsman");
const p2 = new Cricketer("Jasprit Bumrah", "Right Hand Fast Bowler");

console.log(p1.introduce());
console.log(p2.introduce());

console.log(p1.hasOwnProperty("name")); //true
console.log(p1.hasOwnProperty("role")); //true
console.log(p1.hasOwnProperty("matchesPlayed")); //true
console.log(p1.hasOwnProperty("stamina")); //true
console.log(p1.hasOwnProperty("introduce")); //false(beacuse it belongs to class Cricketer and created inside 'Cricketer.prototype.introduce = (){...}'. And is Inherited into the 'p1' form 'Cricketer.prototype'.)

console.log(typeof Cricketer); //MMMIMP for Interview: In JS all the classes are treated as Functions.Infact as JAVA works on classes & objects. Similary, whole JS works on Functions & Objects.

console.log("-----------------------------------------------------------------------------------------");
// ------------------------------------------------------------------------------------------------------

class Debutant{ 
    constructor(name){
        this.name = name;
        // this.walkOut = () =>{
        //     return `${this.name} Walks Out for Debut`;
        //}
    }

    walkOut = function(){
        'strict mode';
        return `${this.name} Walks Out for Debut`;
    }   
}

const debutant1 = new Debutant("Yuvraj Singh");
const somethingFromLastClass = debutant1.walkOut;
console.log(somethingFromLastClass());