import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function TabsHome() {
  const [value, setValue] = useState("1");
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
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHaikus();
  }, []);

  return (
    <Box sx={{ dp: 2, width: "110%", typography: "body1" }} className="margTop">
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 0, borderColor: "divider" }}
          display="flex"
          justifyContent="center"
          width="100%"
          position="fixed"
          top="6%"
          className="blur"
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="New"
              value="1"
              sx={{ color: "whitesmoke !important" }}
            />
            <Tab
              label="Top"
              value="2"
              sx={{ color: "whitesmoke !important" }}
            />
            <Tab
              label="Flow"
              value="3"
              sx={{ color: "whitesmoke !important" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="haikus">
            {haikus.map((haiku) => {
              return (
                <>
                  <Paper
                    key={haiku._id}
                    elevation={8}
                    sx={{
                      padding: 2,
                      backgroundColor: "rgba(255,255,255,0)",
                      color: "whitesmoke",
                      width: "90%",
                    }}
                  >
                    <Avatar
                      key={haiku.user._id}
                      className="totemPosition"
                      sx={{ width: 70, height: 70 }}
                      src={haiku.user.totem}
                    />

                    <Typography sx={{ marginTop: -5 }}>
                      {haiku.line1}
                    </Typography>
                    <Typography>{haiku.line2}</Typography>
                    <Typography>{haiku.line3}</Typography>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        position: "relative",
                        left: "100%",
                      }}
                      src={haiku.emoji}
                    />
                  </Paper>
                </>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
