import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Label } from '@mui/icons-material';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({rangeValues}) {
  const [value, setValue] = React.useState([56, 674]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    rangeValues(value)
  };
  
  

  
  const marks =[
    {value:100,label:'100'},
    {value:200,label:'200'},
    {value:300,label:'300'},
    {value:400,label:'400'},
    {value:500,label:'500'},
    {value:600,label:'600'},
  ]

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={56}
        max={674}
        marks ={marks}
        sx={{
          width:380,
          height:14,
          color:'rgb(255, 165, 0)',
          '& .MuiSlider-thumb':{
            color:'rgb(0,0,0)',
            width:26,
            height:26
          },
          '& .MuiSlider-rail':{
            color:'rgba(50,50,50,0.5)',

          },
          '& .MuiSlider-markLabel':{
            marginTop:2,
            fontSize:10,
          }
        }}
      />
    </Box>
  );
}
