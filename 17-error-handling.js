function bootNavigation(mapLoaded){
    try{
        console.log(`IS Navigation Loaded: ${mapLoaded}`);
        if(!mapLoaded)
            throw new Error("Map was not passed in this function");
        return `NAV_OK`;
    }
    catch(e){
        console.log(e);
        console.log(`Navigation Failed ${e.message}`);
    }
    finally{
        console.log("Navigation Sequence completed...");
    }
}

console.log(bootNavigation(true));
console.log("----------------------------------------------------------------------------------------");
console.log(bootNavigation(false));