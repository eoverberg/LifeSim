// dropdown menu and button to delete a student from the roster
import React, {createRef, useEffect} from "react";

function StudentDeleter({roster, setRoster}){
    const dropdown_menu = createRef(null);

    // removes student from current roster
    // calls server to save the new roster
    function clickHandle(){
        const name = dropdown_menu.current.value;
        let new_roster;
        const students = roster.split(',');
        new_roster = students.filter((student)=>student!==name);
        new_roster = new_roster.join(',');
        setRoster(new_roster);
        fetch(`/service/setRoster/${new_roster}`,{
          method: "POST",
        }); 
        return roster;
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
        // adds students to menu
        const students = roster.split(',');
        for(let student of students){
        let option = document.createElement("option");
        option.text = student;
        ddm.add(option);
        }
    },[roster, dropdown_menu]);

    return(
        <nav>
        <p>Select student before uploading file</p>
        <select ref={dropdown_menu} />
        <button onClick={clickHandle}>Delete Student</button>
        </nav>
        
    );
}

export default StudentDeleter