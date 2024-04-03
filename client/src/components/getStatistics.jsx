import React from "react";

 function GetStatistics ({setStatistics}){

    fetch('/service/getStatistics',{
        method: "POST",
        headers: {Accept: "text"},
    }).then(r=>r.text())
    .then(text=>{setStatistics(text)});
    

return(
    <></>
);
}

export default GetStatistics;