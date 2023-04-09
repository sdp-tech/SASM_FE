import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import InfoForm from "./myInfo/InfoForm";
import ChangeForm from "./myInfo/ChangeForm";
import SendFeedback from "./myInfo/SendFeedback";
import ChangePassword from "../Auth/FindIDnPW/ChangePassword";
const Section = styled.div`
  box-sizing: border-box;
  position: relative;
  height: calc(100vh - 64px);
  width: 100%;
  grid-area: mypage;
  display: flex;
`;

export default function Mypage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Section>
      <Box sx={{ flexGrow: 1}}>
        <Routes>
          <Route path="/" element={<InfoForm />} />
          <Route path="/change" element={<ChangeForm />} />
          <Route path="/changepassword" element={<ChangePassword />}/>
          <Route path="/feedback" element={<SendFeedback />} />
          <Route path="/*" element={<div>Nothing</div>} />
        </Routes>
      </Box>
    </Section>
  );
}

