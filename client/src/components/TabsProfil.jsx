import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';


export default function TabsProfil() {
    const [value, setValue] = useState('1');
    const [haikus, setHaikus] = useState([]);
    const [users, setUsers] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // récupération de tous mes Haikus

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

    const getUsers = () => {
        fetch("http://localhost:5000/users")
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                setUsers(result);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getUsers();
        getHaikus();
    }, []);
    return (

        <Box sx={{ dp: 2, width: '80%', typography: 'body1' }} className="margTop">
            <TabContext value={value}>
                <Box sx={{ borderBottom: 0, borderColor: 'divider' }} display='flex' justifyContent='center'>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Haïkus" value="1" sx={{ color: "whitesmoke !important" }} />
                        <Tab label="Favoris" value="2" sx={{ color: "whitesmoke !important" }} />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div className="haikus">
                        {haikus.map((haiku) => {
                            return(
                            (localStorage.getItem('userId') === haiku.userId ?
                                <Paper elevation={8} sx={{ padding: 2, backgroundColor: 'rgba(255,255,255,0)', color: 'whitesmoke', width: '90%' }}>
                                    <Avatar className="totemPosition" sx={{ width: 70, height: 70 }} src={localStorage.getItem('userTotem')} />
                                    <p>{haiku.line1}</p>
                                    <p>{haiku.line2}</p>
                                    <p>{haiku.line3}</p>
                                    <Avatar sx={{ width: 30, height: 30, position: 'relative', left: '100%', }} src={haiku.emoji} />
                                </Paper>
                                : null))
                        }
                        )}

                    </div>
                </TabPanel>
                <TabPanel value="2">My favoris</TabPanel>
            </TabContext>
        </Box>

    );
}
