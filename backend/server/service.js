const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const initialFileParser = require('./utility/initialFileParser');
const Manager = require('../src/Manager');
let simManager = new Manager();

const router = express.Router();
//router.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
router.use(fileUpload({ }));



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
        res.send(simManager.m_roster_string);
        // fs.readFile(path.join("./assets/", "roster.txt"), 'utf8', (error, students) => {
        //     res.send(students);
        //     //res.status(200).json({message: 'ok' });
        // });
    } catch (e) {
        //res.status(500).json({message: e.message });
    }

})

//
// replaces text to the roster file
router.post('/setRoster/:roster', (req, res) => {
    const roster = req.params.roster;
    try {
        simManager.changeRoster(roster, ()=>{
            res.status(500).json({message: 'roster changed' });
        });
    } catch (e) {
        res.status(500).json({message: e.message });
    }

})
// returns the text from the roster file
router.post('/getBuffer/:name', (req, res) => {
    const userName = req.params.name;
    try {
        console.log("in buffer getter");
        res.send(simManager.getBuffer(userName));
    } catch (e) {
        //res.status(500).json({message: e.message });
    }

})

//
// updates the data file
router.post('/nextUpdate/:name', (req, res) => {
    const userName = req.params.name;
    if(simManager.checkBuffers(userName)){
        res.status(200).json({ message: 'ok' });
    }
    else{
        res.status(500).json({ message: 'not updated' });
    }
});


// initial file upload
router.post('/instructorStore', (req, res) => {
    const { avatar } = req.files;

    try {
        
        simManager.instructorNewSimFile( avatar, ()=>{
        res.status(200).json({ message: 'ok'});
    })
        
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

});

//
// initial file upload
router.post('/initialStore/:userName', (req, res) => {
    const userName = req.params.userName;
    const { avatar } = req.files;
    //const { exp } = avatar.data;
    try {
        simManager.studentNewSimFile(userName, avatar, ()=>{
            res.status(200).json({ message: 'ok'});
        })
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
        res.send(simManager.fetchScores());
    } catch (e) {
        //res.status(500).json({message: e.message });
    }

});
router.post('/GetStats/:name', (req, res) => {
    const userName = req.params.name;
    try {
        res.send(simManager.fetchReview(userName));
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