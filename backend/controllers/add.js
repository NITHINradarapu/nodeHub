const fs = require('fs').promises;
const path = require('path');


async function addRepo(){
    const addPath = path.resolve(process.cwd(), ".apnaGit");
    const staging = path.join(addPath, "staging");

    try{
        
    }catch(error){
        console.error("Error adding file: ", error);
    }
}

module.exports = {addRepo};