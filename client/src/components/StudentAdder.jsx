import { createRef } from "react";

function StudentAdder({setRoster, roster}){
    const newName = createRef(null);   
    
    function onSubmit(e){
      let new_roster = roster.concat(',', newName.current.value);
      setRoster(new_roster);
        fetch(`/service/setRoster/${new_roster}`,{
          method: "POST",
        }); 
    }

    return (
    <>
    <form onSubmit={onSubmit}>
      <label form="nameInput">Name</label><br/>
      <input type="text" id="nameInput" name="nameInput" placeholder="Student Name" ref={newName}/><br/>
      <input type="submit" value="Submit"></input>
    </form>
    

    </>
    );
};

export default StudentAdder;




