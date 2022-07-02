import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { AuthContent } from "./module";
import FindID from "./FindID";
import FindPW from "./FindPW";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FindIDnPW = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <AuthContent title="아이디/비밀번호 찾기"> */}
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            // indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            centered
          >
            <Tab label="아이디 찾기" {...a11yProps(0)} />
            <Tab label="비밀번호 찾기" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FindID />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FindPW />
        </TabPanel>
      </Box>
      {/* </AuthContent> */}
    </>
  );
};
export default FindIDnPW;
