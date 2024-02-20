const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const xmlParser = require('./xmlFileParse');

const router = express.Router();

router.use(fileUpload());

router.post('/:userName', (req, res) => {
    const userName = req.params.userName;
    const { avatar } = req.files;
    try{
   
    console.log(userName);
    avatar.mv(path.join(".\\assets\\", avatar.name)); //send incoming file to backend assets folder
    //parses data and sends to frontend assets folder
    fs.readFile(path.join(".\\assets\\", avatar.name), 'utf8',(error, numbers) => {
        xmlParser(numbers, path.join("..\\frontend\\src\\assets\\", `${userName}.xml`) );
    });
    
    res.status(200).json({message: 'ok' });
    }catch (e) {
        res.status(500).json({message: e.message });
    }

})

module.exports = router;

//const assetsFolder = path.join(__dir, "assets");
//const assetsFolder = path.join(, "assets");
//avatar.mv(path.join("..\\frontend\\src\\assets\\", avatar.name));
//avatar.mv(path.join("..\\frontend\\src\\assets\\", `${userName}.xml`));