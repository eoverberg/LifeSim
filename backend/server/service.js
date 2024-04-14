const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const initialFileParser = require('./utility/initialFileParser');
const simUpdate = require('./utility/simUpdate');
const combineXML = require('./utility/combinator');
const xmlimporter = require('./utility/xmlToClass');
const Global = require('../src/Global');
let tempSim = new Global();



const router = express.Router();
router.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

//
//
router.post('/update/:userName', (req, res) => {
    const userName = req.params.userName;
    try {
        console.log(userName);
        fs.readFile(path.join("./assets/", "LifeSimulation01.xml"), 'utf8', (error, numbers) => {
            initialFileParser(numbers, path.join("../frontend/src/assets/Student/", `${userName}.xml`));
        });
        res.status(200).json({ message: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

})

//
// returns the text from the roster file
router.post('/getRoster', (req, res) => {
    try {
        fs.readFile(path.join("./assets/", "roster.txt"), 'utf8', (error, students) => {
            res.send(students);
            //res.status(200).json({message: 'ok' });
        });
    } catch (e) {
        //res.status(500).json({message: e.message });
    }

})

//
// replaces text to the roster file
router.post('/setRoster/:roster', (req, res) => {
    const roster = req.params.roster;
    try {
        fs.writeFile("./assets/roster.txt", roster, (err) => {
            if (err) throw err;
            console.log(`${roster}`);
        });
    } catch (e) {
        //res.status(500).json({message: e.message });
    }

})
// returns the text from the roster file
router.post('/getBuffer/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    try {
        console.log("in buffer getter");
        console.log(`${fileName}`);
        fs.readFile(path.join("./assets/", `${fileName}.txt`), 'utf8', (error, buffer) => {
            res.send(buffer);
            //res.status(200).json({message: 'ok' });
        });
    } catch (e) {
        //res.status(500).json({message: e.message });
    }

})

//
// updates the data file
router.post('/nextUpdate/:name/:userMod/', (req, res) => {
    const userName = req.params.name;
    const userMod = req.params.userMod;
    try 
    {
        const newFile = userName.concat(userMod,'.txt');
        console.log("Update Start");
        let bufferString = tempSim.update()
        fs.writeFile(path.join("./assets/", newFile), bufferString, (err) => 
            {
                if (err) throw err;
                console.log("Update Done");
                res.status(200).json({ message: 'ok' });
            }
        );
        
        
    } catch (e) 
    {
        res.status(500).json({ message: e.message });
    }
});

//
// updates the data file
router.post('/remove/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    try {
       // console.log(fileName);
        //fs.rmSync(`assets/${fileName}.txt`);
        res.status(200).json({ message: 'ok' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// initial file upload
router.post('/instructorStore', (req, res) => {
    const { avatar } = req.files;

    try {
        console.log(avatar.name);
        let pName = path.join('./assets/InstructorFile.xml');
        console.log(pName);
        fs.copyFile(avatar.tempFilePath, pName, (err) => {
            if (err) {
                console.log("Error Found: ", err);
            } else {
                res.status(200).json({ message: 'ok' });
            }
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

});

//
// initial file upload
router.post('/initialStore/:userName/:userMod', (req, res) => {
    const userName = req.params.userName;
    const { avatar } = req.files;

    try {
        console.log(userName);
        console.log(avatar.name);
        const oname = "./assets/" + avatar.name;
        const cname = "./assets/combined" + avatar.name;
        console.log(oname);
        fs.copyFile(avatar.tempFilePath, oname, (err) => {
            if (err) {
                console.log("Error Found: ", err);
            } else {
                console.log("\nFile Contents of copied_file:");
                combineXML(oname, './assets/InstructorFile.xml', cname, () => {
                    console.log('maybe');
                    xmlimporter(tempSim, cname, () => {
                        console.log("imported xml");
                        fs.writeFile(path.join("./assets/", `${userName}0.txt`), `${tempSim.printEnts()}`, (err) => {
                            if (err) throw err;
                            console.log(`${"wrote initial"}`);
                            res.status(200).json({ message: 'ok' });
                        });

                    });

                    //initialFileParser(fs.readFileSync(cname, "utf8"), path.join("./assets/", `${userName}${userMod}.txt`) );

                })
            }
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

});

//
// retrieves the display data from the backend
router.post('/getData/:fileName', (req, res) => {
    const fileName = req.params.fileName;

    try {
        let pName = path.join('./assets/', `${fileName}.txt`);
        console.log(pName);
        fs.readFile(pName, 'utf8', (error, fileText) => {
            res.send(fileText);
        });

    } catch (e) {
        //add error handling
    }

});
router.post('/GetStats', (req, res) => {
    try {
        fs.readFile(path.join("./assets/", "stats.txt"), 'utf8', (error, students) => {
            res.send(students);
            //res.status(200).json({message: 'ok' });
        });
    } catch (e) {
        //res.status(500).json({message: e.message });
    }

});
router.post('/setStatistics/:statstics', (req, res) => {
    const statstics = req.params.statstics;
    try {
        fs.writeFile("./assets/stats.txt", statstics, (err) => {
            if (err) throw err;
            console.log(`${statstics}`);
        });
    } catch (e) {
        //res.status(500).json({message: e.message });
    }

});







module.exports = router;