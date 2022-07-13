import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { sizing } from '@mui/system';
import { spacing } from '@mui/system';


import "../formHaiku.scss"

export default function FormNewHaiku() {
    const [haiku_Line_1_Length, sethaiku_Line_1_Length] = useState(0)
    const [haiku_Line_2_Length, sethaiku_Line_2_Length] = useState(0)
    const [haiku_Line_3_Length, sethaiku_Line_3_Length] = useState(0)

    const handleLine1 = () => {

    }

  return (

    <Box
      component="form"
      display="flex"
      justifyContent="center"
      alignItems="center"
        sx={{ width: '100%' }}
      noValidate
      autoComplete="off"
    >   
        <div className="textFormNewHaiku">
            <Typography variant="h8" component="h5" justify="flex-end">
                nouvel Haïku
            </Typography>
            <div className='newHaikuLine'>
                <TextField style ={{width: '60%'}} id="standard-basic"  variant="standard" 
                    onChange={(e)=>sethaiku_Line_1_Length(e.target.value.length)}/>
                <div className='haikuLineLengthCount'> { haiku_Line_1_Length != 0 ? haiku_Line_1_Length : null } </div>
            </div>
            <div className='newHaikuLine'>
                <TextField style ={{width: '60%'}} id="standard-basic"  variant="standard" 
                    onChange={(e)=>sethaiku_Line_2_Length(30-(e.target.value.length))}/>
                <div className='haikuLineLengthCount'> { haiku_Line_2_Length != 0 ? haiku_Line_2_Length : null } </div>
            </div>
            <div className='newHaikuLine'>
                <TextField style ={{width: '60%'}} id="standard-basic"  variant="standard" 
                    onChange={(e)=>sethaiku_Line_3_Length(e.target.value.length)}/>
                <div className='haikuLineLengthCount'> { haiku_Line_3_Length != 0 ? haiku_Line_3_Length : null } </div>
            </div>
        </div>
    </Box>
  );
}
