// creates a dropdown menu of students in roster
// when user select student, user will be directed to new site
import React, {createRef, useEffect} from "react";


function StudentSelection ({roster, setName}) {
    const dropdown_menu = createRef(null);

    // changes location when student is selected
    // used href instead of link, might create issues
    function changeHandle(){
        const name = dropdown_menu.current.value;
        setName(name);
        window.location.href = `./Student/${name}`;
    }

    // sets student roster in dropdown menu
    useEffect(() =>{
        // gets reference info
        const ddm = dropdown_menu.current;
        const ddlength = ddm.length;

        //removes old info
        for(let i = 0; i < ddlength; i++){
            ddm.remove(0);
        }
        // defualt option, allows for onchange of first student
        let default_opt = document.createElement("option");
        default_opt.text = 'Select your option';
        default_opt.value="";
        default_opt.disabled = default_opt.selected;
        ddm.add(default_opt);
        // adds new students
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