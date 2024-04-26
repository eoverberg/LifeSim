import React from "react";

 function GetStatistics ({setStatistics, name}){

    fetch(`/service/getStats/${name}`,{
        method: "POST",
        headers: {Accept: "text"},
    }).then(r=>r.text())
    .then(text=>{setStatistics(text)});
    

return(
    <></>
);
}

export default GetStatistics;