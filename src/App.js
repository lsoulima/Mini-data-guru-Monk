import React, { useState } from "react";
import "./App.css";
// import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import VisibilityIcon from "@material-ui/icons/Visibility";
import StarIcon from "@material-ui/icons/Star";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Workflow from "./Workflow";

function App() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index } = props;
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && (
          <div
            style={{
              height: "80vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="App">
      <div>
        <AppBar position="static" style={{ background: "#116BEF" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">Monk</Typography>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Paper elevation={5}>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textcolor="primary"
            TabIndicatorProps={{ style: { background: "#116BEF" } }}
            style={{ background: "white" }}
          >
            <Tab
              icon={<PersonPinIcon />}
              label="Status 1"
              style={{ padding: "20px 0" }}
            />
            <Tab
              icon={<VisibilityIcon />}
              label="Status 2"
              style={{ padding: "20px 0" }}
            />
            <Tab
              icon={<StarIcon />}
              label="Validated"
              style={{ padding: "20px 0" }}
            />
            <Tab
              icon={<StarIcon />}
              label="Finished"
              style={{ padding: "20px 0" }}
            />
          </Tabs>
        </Paper>
        <TabPanel value={tab} index={0}>
          <Workflow />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          Content
        </TabPanel>
        <TabPanel value={tab} index={2}>
          Content
        </TabPanel>
        <TabPanel value={tab} index={3}>
          Content
        </TabPanel>
      </div>
    </div>
  );
}

export default App;
