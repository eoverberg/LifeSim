import React from "react";


function IntervalControl({setIntervalTime}){
    


    function handleClick(e){
      let intervalSwitch = 0;
      const selected = e.target.value;
      switch(selected){
        case "1": 
          intervalSwitch=1000;
          break;
        case "10":
          intervalSwitch=100;
          break;
        case "50":
          intervalSwitch=20;
          break;
        case "100":
          intervalSwitch=10;
          break;
        default:
          intervalSwitch=1000
      }
      setIntervalTime(intervalSwitch);
    }

    return(
      <div>
      <h4>Speed</h4>
      <input type="radio" id="1" name="interval_select" onChange={handleClick} value="1" checked="checked"/>
      <label for="1">1X </label> <br/>
      <input type="radio" id="10" name="interval_select" onChange={handleClick} value="10"/>
      <label for="10">10X </label> <br/>
      <input type="radio" id="10" name="interval_select" onChange={handleClick} value="50"/>
      <label for="50">50X </label> <br/>
      <input type="radio" id="10" name="interval_select" onChange={handleClick} value="100"/>
      <label for="100">100X</label> 
      </div>

);

}

export default IntervalControl

