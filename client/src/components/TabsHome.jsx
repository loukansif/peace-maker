import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';


export default function TabsHome() {
    const [value, setValue] = useState('1');
    const [haikus, setHaikus] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // récupération de tous les Haikus

    const getHaikus = () => {
        fetch("http://localhost:5000/haikus")
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                setHaikus(result);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getHaikus();
    }, []);
    return (
        <Box sx={{ dp: 2, width: '80%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 0, borderColor: 'divider' }} display='flex' justifyContent='center'>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="New" value="1" sx={{color: "whitesmoke !important"}} />
                        <Tab label="Top" value="2" sx={{color: "whitesmoke !important"}}/>
                        <Tab label="Flow" value="3" sx={{color: "whitesmoke !important"}}/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div className="rooms">
                        {haikus.map((hayku) => {
                            return <Paper elevation={8} sx={{ margin: 2, padding: 2, backgroundColor:'rgba(255,255,255,0)', color:'whitesmoke', width:'90%'}}>{hayku.text}</Paper>;
                        })}
                    </div>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    );
}
