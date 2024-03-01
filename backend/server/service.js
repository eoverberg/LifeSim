const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const initialFileParser = require('./utility/initialFileParser');
//const simUpdate = require('./simUpdate');
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
//
router.post('/updateRoster', (req, res) => {
    try{
    fs.readFile(path.join("./assets/", "roster.txt"), 'utf8',(students, error) => {    
    res.send(students);
    res.status(200).json({message: 'ok' });
});
    }catch (e) {
        res.status(500).json({message: e.message });
    }

})

//
//
router.post('/nextUpdate/:userName/:userMod/:fileName', (req, res) => {
    const userName = req.params.userName;
    const userMod = req.params.userMod;
    const fileName = req.params.fileName;
    try{
        console.log(userName);
        const nam = userMod + fileName;
        let pName = path.join('./assets', nam );
        console.log(pName);
        //simUpdate(fs.readFileSync(pName, "utf8"), path.join("../frontend/src/assets/Student/", `${userName}.xml`) );
    }catch (e) {
        res.status(500).json({message: e.message });
    } 
});

//initial file upload
router.post('/:userName/:userMod', (req, res) => {
    const userName = req.params.userName;
    const userMod = req.params.userMod;
    const { avatar } = req.files;
    
    try{
        console.log(userName);
        const nam = userMod + avatar.name;
        let pName = path.join('./assets', nam );
        console.log(pName);
        fs.copyFile(avatar.tempFilePath, pName, (err) => {
            if (err){
                console.log("Error Found: ", err);
            }else{
                console.log("\nFile Contents of copied_file:");
                initialFileParser(fs.readFileSync(pName, "utf8"), path.join("../frontend/src/assets/Student/", `${userName}.xml`) );
                res.status(200).json({message: 'ok' });  
            }
        });  
    }catch (e) {
        res.status(500).json({message: e.message });
    } 

})

//  delete_extra(nam);
// function delete_extra(file_name){
//     fs.readdirSync('./assets').forEach(file => {
//         if (file!==file_name || file !== 'LifeSimulation01.xml'){
//         fs.rm(file);}
//     });
// };

module.exports = router;