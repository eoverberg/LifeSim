import React from "react";
import { Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';


function IntervalControl({setIntervalTime}){
  const [speed, setSpeed] = React.useState('');
  
  const handleChange = (event) => {
    setSpeed(event.target.value);
    let intervalSwitch = 0;
      const selected = event.target.value;
      console.log(selected)
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
    
  };

    return(
      <div>
        <h4></h4>
      <Box sx = {{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Speed</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={speed}
          label="Speed"
          onChange={handleChange}
        >
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={"10"}>10</MenuItem>
          <MenuItem value={"50"}>50</MenuItem>
          <MenuItem value={"100"}>100</MenuItem>
        </Select>
      </FormControl>
      </Box>
      </div>



);

}

export default IntervalControl

