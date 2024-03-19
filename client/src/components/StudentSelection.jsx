import React, {createRef, useEffect} from "react";


function StudentSelection ({roster, setName}) {
    const dropdown_menu = createRef(null);

    function changeHandle(){
        const name = dropdown_menu.current.value;
        setName(name);
        window.location.href = `./Student/${name}`;
    }

    useEffect(() =>{
        const ddm = dropdown_menu.current;
        
        // defualt option, allows for onchange of first student
        let default_opt = document.createElement("option");
        default_opt.text = 'Select your option';
        default_opt.value="";
        default_opt.disabled = default_opt.selected;
        ddm.add(default_opt);
        // removes defualt on options on startup, no idea why it works
        ddm.remove(0); 
        // iterates through roster and creates menu options
        const students = roster.split(',');
        for(let student of students){
        let option = document.createElement("option");
        option.text = student;
        ddm.add(option);
    }
    });

    return(
        <nav>
        <p>Select student before uploading file</p>
        <select ref={dropdown_menu} onChange={changeHandle}/>
        </nav>
        
    );
}

export default StudentSelection;