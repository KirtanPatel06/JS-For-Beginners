
const fruitsOriginal = "Mango | Banana | Pineapple  | Cherry";
console.log("fruitsOriginal :", fruitsOriginal, " ---> type:", typeof(fruitsOriginal), "\n");

const fruitsArray = fruitsOriginal.split(" | "); //returns an Array
console.log("fruitsArray :", fruitsArray, " ---> type:", typeof(fruitsArray), "\n");

const fruitsCopy = fruitsArray.join(" - ")
console.log("fruitsCopy :", fruitsCopy, " ---> type:", typeof(fruitsCopy), "\n");

// .split() ---> string to array
// .join() ---> array to string

const myValue = "SOS".split("");
console.log("myValue :", myValue, " ---> type:", typeof(myValue), "/ isArray:", Array.isArray(myValue), "\n");

console.log(`myvalue: ${myValue} ---> type: ${typeof(`${myValue}`)} \n`);

console.log(`myvalue: ${JSON.stringify(myValue)} ---> type: ${typeof(`${JSON.stringify(myValue)}`)}\n`);

console.log("\"Tempelate literals (\` \`)\" converts the value of the variable \"myValue\" into \"String\" to print them.", "\n");
console.log("Where as \"JSON.stringify(myvalue)\" prints the value as if it looks like an \"Array\". But it is just looking like an Array, in reality it is also a \"String\"", "\n");

// MIMP: INTERVIEW
console.log(void("Anything"), "---> \"void\" will always return \"undefined\" for any dataypes whether it is a \"number\", \"string\", \"boolean\", etc.");
