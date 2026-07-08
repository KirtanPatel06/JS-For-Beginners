function sync_micro_macro() {
    console.log("Swastik");

    Promise.resolve("resolved value").then((v) => {
        console.log("Microtask", v);
    });

    console.log("Abhishek");
}

// ------------------------------------------------------------------------------------------------------
// ---> JavaScript execution order samajhna bahut important hai.
// ---> JavaScript sabse pehle synchronous code execute karta hai.

// Priority Order: 1. Synchronous Code
//                 2. Microtasks Queue (Promises, queueMicrotask, MutationObserver)
//                 3. Macrotasks Queue (setTimeout, setInterval, I/O, etc.)

// Rule: Sync Code
//          ↓
//      All Microtasks
//          ↓
//      One Macrotask
//          ↓
//      Again All Microtasks
//          ↓
//      Next Macrotask

// ------------------------------------------------------------------------------------------------------

// Execution:
// Step 1: console.log("Swastik");
// Output: Swastik
// ------------------------------------------------------------------------------------------------------
// Step 2: 'Promise.resolve(...).then(...)' Promise is already resolved.

// The callback: (v) => {
//                    console.log("Microtask", v);
//               }
// is NOT executed immediately. It is placed into the Microtasks Queue.

// Microtasks Queue:[ console.log("Microtask", "resolved value") ]
// ------------------------------------------------------------------------------------------------------
// Step 3: console.log("Abhishek");
// Output: Abhishek
// ------------------------------------------------------------------------------------------------------
// Step 4: Synchronous code has finished. JavaScript now checks: "Are there any Microtasks waiting?"
// Answer: Yes
// ---> So it executes: console.log("Microtask", "resolved value");
// Output: Microtask resolved value
// ------------------------------------------------------------------------------------------------------
// Final Output: Swastik
//               Abhishek
//               Microtask resolved value
// ------------------------------------------------------------------------------------------------------

// IMPORTANT: Even if a Promise is already resolved: Promise.resolve(...), its .then() callback NEVER runs immediately. It always goes into the Microtasks Queue.

// Therefore: console.log("Swastik");
//            Promise.resolve(...).then(...);
//            console.log("Abhishek");

// ✅Output: Swastik
//         Abhishek
//         Microtask resolved value

// ❌NOT: Swastik
//        Microtask resolved value
//        Abhishek
// ------------------------------------------------------------------------------------------------------
//
// Example with setTimeout: 
// console.log("Start");

// Promise.resolve()
//     .then(() => {
//         console.log("Promise");
//         setTimeout(() => {
//             console.log("Timer");
//         }, 0);
//         console.log("Promise-2");
//     });

// Promise.resolve().then(() => {console.log("Hello")});

// setTimeout(() => {
//     console.log("Timer-2");
//     Promise.resolve().then(() => {console.log("Hiii")});

//     setTimeout(() => {
//         Promise.resolve().then(() => {console.log("Hiiii - 2")});
//         console.log("Maja Ma");
//     }, 0)
// }, 1000);

// console.log("End");
// ------------------------------------------------------------------------------------------------------
// Execution Order: 1. Start          (Sync)
//                  2. End            (Sync)
//                  3. Promise        (Microtask)
//                  4. Timer          (Macrotask)

// Output: Start
//         End
//         Promise
//         Timer

// ------------------------------------------------------------------------------------------------------

// MEMORY RULE: JavaScript Priority =>  Sync Code
//                                          ↓
//                                      Microtasks (Promises)
//                                          ↓
//                                      Macrotasks (Timers)
//
// Easy Way: "Finish current work first,
//            then handle Promises,
//            then handle Timers."

// Sync > Microtask > Macrotask

// ------------------------------------------------------------------------------------------------------

function boliWater(time) {

    return new Promise((res, rej) => {
        console.log("Water is boiling...");

        if (typeof time !== "number" || time < 0) {
            rej(new Error("time should be a number & greater than zero(0)"));
        }

        setTimeout(() => {
            res("Water is boiled...");
        }, time);
    });
}

function grindLeaves() {
    return Promise.resolve("Leaves grinded...");
}

function steepTea(time) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("Steeped Tea");
        }, time);
    });
}

function addSugar(spoons) {
    return `Added ${spoons} spoons sugar.`;
}

function stiringTea(time) {
    return new Promise((res, rej) => {
        console.log("Stiring the tea...");
        setTimeout(() => {
            res("taking a while...");
        }, time)
    })
}

function teaReady(time) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(`Your tea is ready Sir !`);
        }, time);
    })
}


async function main() {
    sync_micro_macro();

    // Wait for current microtasks to finish
    await Promise.resolve();

    let variable = await boliWater(2000);
    console.log(variable);

    variable = await grindLeaves();
    console.log(variable);

    variable = await steepTea(2000);
    console.log(variable);

    variable = await addSugar(3);
    console.log(variable);

    variable = await stiringTea(3000);
    console.log(variable);

    variable = await teaReady(4000);
    console.log(variable);

    console.log("Bhavi ne chaa ?");
    
    // boliWater(2000)
    //     .then((val) => {
    //         console.log(val);
    //         return grindLeaves();
    //     })
    //     .then((val) => {
    //         console.log(val);
    //         return steepTea(2000);
    //     })
    //     .then((val) => {
    //         console.log(val);
    //         return addSugar(3);
    //     })
    //     .then((val) => {
    //         console.log(val);
    //         return stiringTea(3000);
    //     })
    //     .then((val) => {
    //         console.log(val);
    //         return teaReady(4000);
    //     })
    //     .then((val) => {
    //         console.log(val);
    //     })
    //     .catch((error) => console.log(error.message));
}

main();

