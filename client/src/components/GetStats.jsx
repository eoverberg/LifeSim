import React from "react";

 function GetStatistics ({setStatistics}){

    fetch('/service/getStats',{
        method: "POST",
        headers: {Accept: "text"},
    }).then(r=>r.text())
    .then(text=>{setStatistics(text)});
    

return(
    <></>
);
}

export default GetStatistics;