// run button that start the interval of parsing the display data

import React,{ useEffect } from "react";
import Switch from '@mui/material/Switch';
import {Navigate} from "react-router-dom";
function RunBuffer({runFlag,setRunFlag, buffer, setBuffer, bufferA, bufferLine, setBufferLine, setData, setBufferFlag, bufferFlag, intervalTime, simEnd, setSimEnd}){

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (buffer!=="")
    {
      setRunFlag(!runFlag);
    }
  }
    function clickHandle(){
      if (buffer!=="")
      {
        setRunFlag(!runFlag);
      }
    }

    useEffect(() =>{
      let bufferData = buffer.split('\n');
      if (bufferData.length <= 500 && bufferLine > bufferData.length)
      {
          setSimEnd(true);
      }
    
      if ( bufferLine === 0 ){
        setData(bufferData[bufferLine]);
      }
        const interval = setInterval( async() => { //const interval =
            
          if (runFlag && !simEnd){
            if(bufferLine > bufferData || buffer === null)
            {
              alert("Simulation ended due to error");
              setRunFlag(false);
            }
            try{
              setData(bufferData[bufferLine]);
              setBufferLine(bufferLine+1);
               // local storage can hold between 4000 and 5000 in initial testing
              if(bufferLine >= 500 ){
              setBuffer(bufferA);
              setBufferLine(0);
              setBufferFlag(true);
            }
            }
            catch(e)
            {
              setSimEnd(true);
            }
          }
        }, intervalTime);
       return () => clearInterval(interval);
    }, [simEnd, setSimEnd, runFlag, setRunFlag, setBuffer, bufferA, buffer, setBufferLine, bufferLine, setData,setBufferFlag, bufferFlag, intervalTime]);

    return(
      <>
        <h3>Simulation Options</h3>
        <b>Start/Stop</b>
        <Switch
          checked={runFlag}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        {simEnd && (<Navigate to="/Review" replace={true}/>)}
      </>
    );

}

export default RunBuffer
