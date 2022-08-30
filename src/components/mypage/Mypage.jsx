import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Myplace from "./myplace/Myplace";

const Section = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: mypage;
  display: flex;
  //   flex-direction: column;
`;

const LeftSection = styled.div`
  height: 87vh;
  background: #5480e51f;
  width: 100%;
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
          <Typography>{children}</Typography>
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
        <Grid container spacing={2} minHeight="xl">
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
                            marginLeft: "50%",
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
                            marginLeft: "50%",
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
              Item One
            </TabPanel>

            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Myplace />
            </TabPanel>

            <TabPanel value={value} index={3}>
              story grid
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Section>
  );
}

// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import styled from "styled-components";

// const MypageSection = styled.div`
//   box-sizing: border-box;
//   position: relative;
//   height: 100%;
//   width: 100%;
//   display: flex;
//   background-color: yellow;
//   margin-top: -1%;
//   grid-area: mypage;
//   //   outline: none;
// `;

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// export default function Mypage() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <MypageSection>
//       <Box
//         sx={{
//           flexGrow: 1,
//           //   bgcolor: "background.paper",
//           display: "flex",
//           height: "100%",
//           border: "1px solid red",
//         }}
//       >
//         <Tabs
//           orientation="vertical"
//           //   variant="scrollable"
//           value={value}
//           onChange={handleChange}
//           aria-label="Vertical tabs example"
//           sx={{ width: "20%", borderRight: 1, borderColor: "divider" }}
//         >
//           <Tab label="MY INFO" {...a11yProps(0)} />
//           <Tab label="MY PICK" {...a11yProps(1)} />
//           <Tab label=" * MY PLACE" {...a11yProps(2)} />
//           <Tab label=" * MY STORY" {...a11yProps(3)} />
//         </Tabs>
//         <TabPanel value={value} index={0}>
//           Item One
//         </TabPanel>
//         <TabPanel value={value} index={1}>
//           Item Two
//         </TabPanel>
//         <TabPanel value={value} index={2}>
//           Item Three
//         </TabPanel>
//         <TabPanel value={value} index={3}>
//           Item Four
//         </TabPanel>
//       </Box>
//     </MypageSection>
//   );
// }
