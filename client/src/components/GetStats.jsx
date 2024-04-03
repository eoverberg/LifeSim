import React from "react";

 function GetStats ({setStats}){

    fetch('/service/getStats',{
        method: "POST",
        headers: {Accept: "text"},
    }).then(r=>r.text())
    .then(text=>{setStats(text)});
    

return(
    <></>
);
}

export default GetStats;