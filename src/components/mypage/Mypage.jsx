import * as React from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import InfoForm from "./myInfo/InfoForm";
import ChangeForm from "./myInfo/ChangeForm";
import SendFeedback from "./myInfo/SendFeedback";
import ChangePassword from "../Auth/FindIDnPW/ChangePassword";
import Follower from "./myInfo/FollowerList";
import Following from "./myInfo/FollowingList";
const Section = styled.div`
  box-sizing: border-box;
  position: relative;
  height: calc(100vh - 64px);
  width: 100%;
  grid-area: mypage;
  display: flex;
`;

export default function Mypage() {

  return (
    <Section>
      <Box sx={{ flexGrow: 1}}>
        <Routes>
          <Route path="/" element={<InfoForm />} />
          <Route path="/change" element={<ChangeForm />} />
          <Route path="/changepassword" element={<ChangePassword />}/>
          <Route path="/follower" element={<Follower />}/>
          <Route path="/following" element={<Following />}/>
          <Route path="/feedback" element={<SendFeedback />} />
          <Route path="/*" element={<div>Nothing</div>} />
        </Routes>
      </Box>
    </Section>
  );
}

