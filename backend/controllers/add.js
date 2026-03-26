const fs = require('fs').promises;
const path = require('path');


async function addRepo(filePath){
    const addPath = path.resolve(process.cwd(), ".apnaGit");
    const stagingPath = path.join(addPath, "staging");

    try{
        await fs.mkdir(stagingPath, {recursive : true});
        const fileName = path.basename(filePath);
        const destPath = path.join(stagingPath, fileName);
        await fs.copyFile(filePath, destPath);
        console.log(`File ${fileName} added to staging area`);
    }catch(error){
        console.error("Error adding file: ", error);
    }
}

module.exports = {addRepo};