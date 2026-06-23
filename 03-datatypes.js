function castSpell(){return "Fireball"};

console.log("Spell Type: ", typeof(castSpell)); //function
console.log(typeof("kirtan")); //string
console.log(typeof(null)); //object ----> gokhi nakho
console.log(typeof(Symbol())); //symbol
console.log(typeof(true)); //boolean
console.log(typeof(undefined)); //undefined
console.log(typeof({})); // object
console.log(typeof([])); // object
console.log(typeof(function(){})); //function

let arr = [1, 2, 3, 4]
console.log(typeof arr);