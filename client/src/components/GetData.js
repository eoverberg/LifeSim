// retrieves file from server 

import React from "react";

 function GetData ({fileName, setData}){
    if (fileName !== ""){
    fetch(`/service/getData/${fileName}`,{
        method: "POST",
        headers: {Accept: "text"},
    }).then(r=>r.text())
    .then(text=>{setData(text)});
}

return(
    <></>
);
}

export default GetData;