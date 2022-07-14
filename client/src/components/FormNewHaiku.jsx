import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



import "../formHaiku.scss"

export default function FormNewHaiku() {
    
    const [haiku_Line_1_Length, sethaiku_Line_1_Length] = useState(0)
    const [haiku_Line_2_Length, sethaiku_Line_2_Length] = useState(0)
    const [haiku_Line_3_Length, sethaiku_Line_3_Length] = useState(0)
    
    let counterspaceDefault = <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    
    const [age, setAge] = React.useState('');
    
    const handleChange = (event) => {
        setAge(event.target.value);
      };

  return (
    <div>

        {/* // Formulaire d'écriture du Haiku  */}
        <Box
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
            sx={{ width: '100%' }}
        noValidate
        autoComplete="off"
        >   
            <div className='textAndCounterFormNewHaiku'>

            {/* les 3 lignes à remplir par l'auteur */}
            <div className="textFormNewHaiku">
                <Typography className='titleFormHaiku' variant="h8" component="h5" justify="flex-start">
                    nouvel Haïku
                </Typography>
                <div className='newHaikuLine'>
                    <TextField style ={{width: '100%'}} id="standard-basic"  variant="standard" 
                        onChange={(e)=>sethaiku_Line_1_Length(30-(e.target.value.length))}/>
                </div>
                <div className='newHaikuLine'>
                    <TextField style ={{width: '100%'}} id="standard-basic"  variant="standard" 
                        onChange={(e)=>sethaiku_Line_2_Length(30-(e.target.value.length))}/>
                </div>
                <div className='newHaikuLine'>
                    <TextField style ={{width: '100%'}} id="standard-basic"  variant="standard" 
                        onChange={(e)=>sethaiku_Line_3_Length(30-(e.target.value.length))}/>
                </div>
            </div>

            {/* les 3 compteur de lettres */}
            <div className="LineCounterFormNewHaiku">
                <div className='haikuLineLengthCount'> { haiku_Line_1_Length == 0 || haiku_Line_1_Length == 30 ? counterspaceDefault : haiku_Line_1_Length } </div>
                <div className='haikuLineLengthCount'> { haiku_Line_2_Length == 0 || haiku_Line_2_Length == 30 ? counterspaceDefault : haiku_Line_2_Length } </div>
                <div className='haikuLineLengthCount'> { haiku_Line_3_Length == 0 || haiku_Line_3_Length == 30 ? counterspaceDefault : haiku_Line_3_Length } </div>
            </div>

            </div>
        </Box>

        {/* slider pour selectionner l'emoji du mood */}
        <Box 
        component="form"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '80%' }}
        >
        <FormControl 
            sx={{ width: '100%' }}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            >

            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        </Box>
    </div>

  );
}
