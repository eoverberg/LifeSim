// run button that start the interval of parsing the display data

import React,{ useEffect } from "react";

function RunBuffer({runFlag,setRunFlag, buffer, setBuffer, bufferA, bufferLine, setBufferLine, setData, setBufferFlag, bufferFlag, intervalTime}){

    function clickHandle(){
      if (buffer!=="")
      {
        setRunFlag(!runFlag);
      }
    }

    let bufferData = buffer.split('\n');

    if (bufferLine === 0){
      setData(bufferData[bufferLine]);
    }

    useEffect(() =>{
        const interval = setInterval( async() => { //const interval =
            
          if (runFlag === true){
            setData(bufferData[bufferLine]);
            setBufferLine(bufferLine+1);
            // local storage can hold between 4000 and 5000 in initial testing
            if(bufferLine >= 400 ){
              setBuffer(bufferA);
              setBufferLine(1);
              setBufferFlag(true);
            } 
          }
        }, intervalTime);
       return () => clearInterval(interval);
    }, [runFlag, setRunFlag, setBuffer, bufferA, setBufferLine, bufferLine, setData, bufferData, setBufferFlag, bufferFlag, intervalTime]);

    return(
      <>
        <h4>Run Simulation</h4>
        <button onClick={clickHandle}>Start/Stop</button>
      </>
    );

}

export default RunBuffer
