// for every student in the roster file
// if not in use, save it to local storage 
// if no directory exists set directorytry{
import React, {createRef} from "react";

 function UpdateRoster ({setRoster}){
    
   // e.preventDefault();

     fetch('/service/updateRoster',{
        method: "POST",
        headers: {Accept: "text"},
    }).then(r=>r.text())
    .then(text=>{setRoster(text)});
    





    //setRoster(response.responseText());
    // await response.json();
    // if (response.ok) {
    //     
    //     console.log("File uploaded"); //popup after submission

    // } else {
    //     console.error("some error occured");//maybe put something to output to header
    // }

return(
    <h1 >Roster Updated</h1>
);
}

export default UpdateRoster;