import React, {createRef, useEffect} from "react";

function StudentDeleter({roster, setRoster}){
    const dropdown_menu = createRef(null);

    function clickHandle(){
        const name = dropdown_menu.current.value;
        let new_roster;
        const students = roster.split(',');
        let firstFlag = true;
        for(let student of students){
            if (student === name){
            }else{
                if (firstFlag)
                {
                    new_roster = student;
                    firstFlag = false;
                }else{
                    new_roster = new_roster.concat(',', student);
                }
            }
        }
        firstFlag = false;
        setRoster(new_roster);
        fetch(`/service/setRoster/${new_roster}`,{
          method: "POST",
        }); 
        return roster;
    }

    useEffect(() =>{
        const ddm = dropdown_menu.current;
        const ddlength = ddm.length;
        for(let i = 0; i < ddlength; i++){
            ddm.remove(0);
        }
        // defualt option, allows for onchange of first student
        let default_opt = document.createElement("option");
        default_opt.text = 'Select your option';
        default_opt.value="";
        default_opt.disabled = default_opt.selected;
        ddm.add(default_opt);
        // removes defualt on options on startup, no idea why it works
        //ddm.remove(0); 
        // iterates through roster and creates menu options
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