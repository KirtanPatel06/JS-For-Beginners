function testPromise() {
    return new Promise((res, rej) => {
        console.log("Executed before 'setTimeout'");

        setTimeout(() => {
            //res("resolved value");
            rej(new Error("rejected value"));
        }, 2000);

        console.log("Executed after 'setTimeout'");
    });
}

async function executePromise(){
    const valueFromPromise = await testPromise();
    console.log(valueFromPromise);
}

executePromise();

// testPromise()
//     .then(
//         function onFullFilled(vaue) {
//         console.log(value);
//         },
//         function onError(err) {
//             console.log(err.message);
//         });


// testPromise()
//     .then(console.log)
//     .catch((err) => console.log(err.message));

console.log("Outside of testPromise() function.");