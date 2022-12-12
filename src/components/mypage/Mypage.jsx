import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Myplace from "./myplace/Myplace";
import Mystory from "./mystory/Mystory";
import { Routes, Route, useNavigate } from "react-router-dom";
import InfoForm from "./myInfo/InfoForm";
import ChangeForm from "./myInfo/ChangeForm";
import SendFeedback from "./myInfo/SendFeedback";
const Section = styled.div`
  box-sizing: border-box;
  position: relative;
  height: calc(100vh - 64px);
  width: 100%;
  grid-area: mypage;
  display: flex;
`;

const LeftSection = styled.div`
  height: calc(100vh - 64px);
  background: #5480e51f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListBox = styled.div`
  height: 100%;
  width: 80%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const MYPAGE = styled.div`
  display: flex;
  align-items: center;
  height: 10%;
  width: 90%;
  box-sizing: border-box;
  margin-top: 10%;
  border-bottom: 2px solid black;
  font-size: 2em;
  font-weight: 400;
`;

const TabsBox = styled.div`
  padding-top: 7%;
  margin-left: 20%;
  height: 70%;
  width: 100%;
  display: flex;
`;
const NewTab = styled(Tab)({
  // boxSizing: "border-box",
  // border: "none",
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  // height: "30px",
  // width: "30px",
  // marginTop: "30px",
  width: "200px",
  fontSize: "300px",
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Mypage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Section>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} minHeight="xl">
          <Grid item xs={3}>
            <LeftSection>
              <ListBox>
                <MYPAGE>MY PAGE</MYPAGE>
                <TabsBox>
                  <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    // textColor="#5480E5"
                    // indicatorColor="none"
                  >
                    <Tab
                      label={<span style={{ fontSize: "1.5em" }}>MY INFO</span>}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label={<span style={{ fontSize: "1.5em" }}>MY PICK</span>}
                      {...a11yProps(1)}
                    />
                    <Tab
                      label={
                        <span
                          style={{
                            fontSize: "1.5em",
                            minWidth: "190px",
                            marginLeft: "25%",
                          }}
                        >
                          ·MY PLACE
                        </span>
                      }
                      {...a11yProps(2)}
                    />
                    <Tab
                      label={
                        <span
                          style={{
                            fontSize: "1.5em",
                            minWidth: "190px",
                            marginLeft: "25%",
                          }}
                        >
                          ·MY STORY
                        </span>
                      }
                      {...a11yProps(3)}
                    />
                  </Tabs>
                </TabsBox>
              </ListBox>
            </LeftSection>
          </Grid>
          <Grid item xs={9}>
            <TabPanel value={value} index={0}>
              <Routes>
                <Route path="/" element={<InfoForm />} />
                <Route path="/change" element={<ChangeForm />} />
                <Route path="/feedback" element={<SendFeedback />} />
                <Route path="/*" element={<div>Nothing</div>} />
              </Routes>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Myplace />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Myplace />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <Mystory />
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Section>
  );
}
