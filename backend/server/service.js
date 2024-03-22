const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const initialFileParser = require('./utility/initialFileParser');
const simUpdate = require('./utility/simUpdate');
const router = express.Router();

router.use(fileUpload({useTempFiles : true, tempFileDir:'/tmp/'}));

//
//
router.post('/update/:userName', (req, res) => {
    const userName = req.params.userName;
    try{
    console.log(userName);
    fs.readFile(path.join("./assets/", "LifeSimulation01.xml"), 'utf8',(error, numbers) => {
        initialFileParser(numbers, path.join("../frontend/src/assets/Student/", `${userName}.xml`) );
    });
    res.status(200).json({message: 'ok' });
    }catch (e) {
        res.status(500).json({message: e.message });
    }

})

//
// returns the text from the roster file
router.post('/getRoster', (req, res) => {
    try{
    fs.readFile(path.join("./assets/", "roster.txt"), 'utf8',( error, students) => {    
    res.send(students);
    //res.status(200).json({message: 'ok' });
});
    }catch (e) {
       //res.status(500).json({message: e.message });
    }

})

//
// replaces text to the roster file
router.post('/setRoster/:roster', (req, res) => {
    const roster = req.params.roster;
    try{
        fs.writeFile("./assets/roster.txt", roster, (err) => {
            if (err) throw err;
            console.log(`${roster}`);
          });
    }catch (e) {
       //res.status(500).json({message: e.message });
    }

})


//
// updates the data file
router.post('/nextUpdate/:name/:userMod/:fileName', (req, res) => {
    const userName = req.params.name;
    const userMod = req.params.userMod;
    const fileName = req.params.fileName;
    try{
        console.log(fileName);
        //const nam = userMod + fileName;
        //let pName = path.join('./assets',  );
        const newFile = userName.concat(userMod);
        console.log(newFile);
        simUpdate(fs.readFileSync(`assets/${fileName}.txt`, "utf8"), newFile );
        res.status(200).json({message: 'ok' });
    }catch (e) {
        res.status(500).json({message: e.message });
    } 
});

//
// updates the data file
router.post('/remove/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    try{
        console.log(fileName);
        fs.rmSync(`assets/${fileName}.txt`);
        res.status(200).json({message: 'ok' });
    }catch (e) {
        res.status(500).json({message: e.message });
    } 
});


//
// initial file upload
router.post('/intialStore/:userName/:userMod', (req, res) => {
    const userName = req.params.userName;
    const userMod = req.params.userMod;
    const { avatar } = req.files;
    
    try{
        console.log(userName);
        console.log(avatar.name);
        const nam = userMod + avatar.name;
        let pName = path.join('./assets', nam );
        console.log(pName);
        fs.copyFile(avatar.tempFilePath, pName, (err) => {
            if (err){
                console.log("Error Found: ", err);
            }else{
                console.log("\nFile Contents of copied_file:");
                initialFileParser(fs.readFileSync(pName, "utf8"), path.join("./assets/", `${userName}${userMod}.txt`) );
                res.status(200).json({message: 'ok' });  
            }
        });  
    }catch (e) {
        res.status(500).json({message: e.message });
    } 

});

//
// retrieves the display data from the backend
router.post('/getData/:fileName', (req, res) => {
    const fileName = req.params.fileName;
       
    try{
        let pName = path.join('./assets/', `${fileName}.txt`);
        console.log(pName);
        fs.readFile(pName, 'utf8', (error, fileText)=>{
            res.send(fileText);
        });
       
    }catch (e) {
        //add error handling
    } 
        
});

module.exports = router;