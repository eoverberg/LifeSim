// for every student in the roster file
// if not in use, save it to local storage 
// if no directory exists set directorytry{
import React, {createRef} from "react";

 function UpdateRoster ({setRoster}){

    fetch('/service/updateRoster',{
        method: "POST",
        headers: {Accept: "text"},
    }).then(r=>r.text())
    .then(text=>{setRoster(text)});
    

return(
    <h1 >Roster Updated</h1>
);
}

export default UpdateRoster;