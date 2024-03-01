import React from "react";

 function GetData ({fileName, setData}){

    fetch(`/service/getData/${fileName}`,{
        method: "POST",
        headers: {Accept: "text"},
    }).then(r=>r.text())
    .then(text=>{setData(text)});
    

return(
    <h1 >Data Retrieved</h1>
);
}

export default GetData;