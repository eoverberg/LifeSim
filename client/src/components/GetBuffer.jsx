// when needed, retrieves a new buffer from the server

import React, {useEffect} from "react";

 function GetBuffer ({name, nameMod, setMod, fileName, setFileName, buffer, setBuffer, bufferA, setBufferA, bufferFlag, setBufferFlag, setSimEnd}){
  useEffect(()=>
  { 
    async function one() 
    {
      const response = await fetch(`/service/nextUpdate/${name}`,
        { 
              method: "POST",
              headers: {Accept: "json"}
        }
      );
      await response.json();
      if (response.ok) 
      {   
        setMod(nameMod+1);

        await fetch(`/service/getBuffer/${name}`,
          { 
            method: "POST",
            headers: {Accept: "text"}
          }).then(r=>r.text())
          .then(text=>{
            try{
              setBufferA(text); 
              if (buffer===""){setBuffer(text)};
            }
            catch(e){
              setSimEnd(true);
            }
          })
      }
    }
    
    // bufferflag to know when a new buffer is needed
    if (bufferFlag )
    {
      if (buffer !== "")
      {
        one();
        setBufferFlag(false)
      }else if(nameMod===1){// ensure it doesn't call again before first call is finished
        one();
      }
    }
  },[name, nameMod, setMod, fileName, setFileName, bufferFlag, setBufferFlag, buffer, setBuffer, bufferA, setBufferA]);
      
return(
    <></>
);
}

export default GetBuffer;
