import React,{ useEffect, useReducer } from "react";

// const reducer = (mod, action) => {
//   switch(action.type){
//     case true:
//       action.setMod(action.nameMod+1);
//       return ;
//     default:
//       return mod;
//   }
// }

function IntervalControl({runFlag, setRunFlag, fileName, setFileName, nameMod, setMod, name}){

    function clickHandle(){
        setRunFlag(!runFlag);
    }

   // const [mod, dispatch] = useReducer(reducer, 0);
    //dispatch({type: runFlag, mod: nameMod, setMod: setMod});
    // useEffect(()=>{
      
    // })

    useEffect(() =>{
        const interval = setInterval( async() => { //const interval =
            
            if (runFlag === true){
              try{
              const response =  await fetch(`/service/nextUpdate/${name}/${nameMod}/${fileName}`,{ 
                  method: "POST",
                  headers: {Accept: "json"}
              });
              await response.json();
              if (response.ok) {
                const oldName  = fileName;
                setFileName(name.concat(nameMod));
                setMod(nameMod+1);
                await fetch(`/service/remove/${oldName}`,{ 
                  method: "POST",
                  headers: {Accept: "json"}
              });
                console.log("DataUpdated"); //popup after submission
              } else {
                console.error("some error occured");
              }
      
              }catch (error) {
                console.error("error")
              }
            }
        }, 1000);
       return () => clearInterval(interval);
    }, [name, nameMod, fileName, runFlag]);

    return(
        <button onClick={clickHandle}>Run</button>
    );

}

export default IntervalControl

