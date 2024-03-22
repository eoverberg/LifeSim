// for every student in the roster file
// if not in use, save it to local storage 
// if no directory exists set directorytry{
import React from "react";

 function GetRoster ({setRoster}){

    fetch('/service/getRoster',{
        method: "POST",
        headers: {Accept: "text"},
    }).then(r=>r.text())
    .then(text=>{setRoster(text)});
    

return(
    <></>
);
}

export default GetRoster;