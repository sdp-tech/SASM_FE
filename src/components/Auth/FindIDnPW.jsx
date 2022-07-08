import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import FindID from "./FindIDnPW/FindID";
import FindPW from "./FindIDnPW/FindPW";
import EmailExist from "./FindIDnPW/EmailExist";
import EmailNotExist from "./FindIDnPW/EmailNotExist";
import FindId from "../../functions/Auth/FindId";

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
  const [id, setId] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleId = (event) => {
    setId({
      ...id,
      email: event.target.value,
    });
  };

  const Try = async () => {
    const res = await FindId(id);
    console.log(res);
    if (res[0] === "존재하는 이메일입니다") {
      setPage(1);
    } else if (res[0] === "존재하지 않는 이메일입니다") {
      setPage(2);
    }
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
            textColor="inherit"
            variant="fullWidth"
            position="sticky"
            centered
          >
            <Tab label="아이디 찾기" {...a11yProps(0)} />
            <Tab label="비밀번호 찾기" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <>
          <Box
            sx={{
              minHeight: "300px",
            }}
          >
            <TabPanel value={value} index={0}>
              {page === 0 ? (
                <FindID Try={Try} handleId={handleId} />
              ) : page === 1 ? (
                //이메일 존재할 경우
                <EmailExist id={id} />
              ) : (
                //이메일 존재하지 않을 경우
                <EmailNotExist id={id} handleAnotherEmail={()=>setPage(0)}/>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FindPW />
            </TabPanel>
          </Box>
        </>
      </Box>
      {/* </AuthContent> */}
    </>
  );
};
export default FindIDnPW;
