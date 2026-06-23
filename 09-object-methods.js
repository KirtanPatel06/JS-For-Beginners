const artifact = {
    name: "Obsidian Crown",
    era: "Ancient",
    value: 50000,
    material: "Volcanic Glass",
}

const keys = Object.keys(artifact);
const values = Object.values(artifact);
const entries = Object.entries(artifact);

console.log(keys);
console.log(values);
console.log(entries);

for(const [key, value]  of Object.entries(artifact)){
    console.log(`${key}: ${value}`);
}
// ----------------------------------------------------------------------------------------------------------------

const pricelist =[
    ["Obsidian Crown", "50000"],
    ["Ruby Pendant", "10000"],
    ["Iron Sword", "5000"]
]

const priceObject = Object.fromEntries(pricelist);
console.log(priceObject);
// ----------------------------------------------------------------------------------------------------------------

const secureArtifacts = {name: "Ruby Pendant"};

// .defineProperty() is used to manually define each property of a key in a object. Using it we can manipulate the properties of our  key(i.e. catelogId).   
Object.defineProperty(secureArtifacts, "catelogId", {
    value: "Secure - 999",
    writable: false, 
    enumerable: false,
    configurable: false 
});
// Here above our key(i.e. catelogId) is add using .defineProperty() in a object named "secureArticfats".

// "value:" is used to give the value to that property.

// "writable:" is used to give access to change or cannot not change the value of object. false(cannot change).

// "enumerable:" is used to give acces to loop that property. false(means the property will not be looped). It means enumerable is 'false' for a particular property, then It will not be displayed if you do Object.keys(), Object.values() or Object.entries(),.

// "confugurable: " is used to give access to delete or redefine the property. false(means cannot delete it). 
// ----------------------------------------------------------------------------------------------------------------

console.log(secureArtifacts);
secureArtifacts.catelogId = "HACKED"; // cannot change the value beacuse "writable:" property is set to "false".
console.log("changing value-> ", secureArtifacts.catelogId, "(not changed)");

for(const [key, value] of Object.entries(secureArtifacts)){
    console.log(`looping-> ${key}: ${value} (catelogId is not looped)`);
} // the "catelogId" will not be looped beacuse "enumerable:" property is set to "false".

console.log("-------------------------------------------------");
console.log("Object -> ", secureArtifacts);

console.log(`Is catelogId present in secureArtifacts -> ${"catelogId" in secureArtifacts}`); 
// the above line returns true if the key "catelogId" is present in secureArtifacts
console.log(`is catelogId is it's own key ->  ${secureArtifacts.hasOwnProperty("catelogId")}`); 
//the above line returns true if "catelogId" is it's own key and not inherited from anyone.

console.log(`Is toString present in secureArtifacts -> ${"toString" in secureArtifacts}`);
console.log(`is toString is it's own key -> ${secureArtifacts.hasOwnProperty("toString")}`);
console.log("-------------------------------------------------");

// .getOwnPropertyDescriptor() returns the properties of a key(i.e. cateLogId)
let descriptor = Object.getOwnPropertyDescriptor(secureArtifacts, "catelogId");
console.log("catelogId -> ", descriptor);

descriptor = Object.getOwnPropertyDescriptor(secureArtifacts, "name");
console.log("name -> ", descriptor);

// ----------------------------------------------------------------------------------------------------------------
