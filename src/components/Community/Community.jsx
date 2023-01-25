import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from "prop-types"
import styled from 'styled-components'
import { margin } from '@mui/system'
import FreeBoard from './Contents/FreeBoard/FreeBoard'
import PlaceBoard from './Contents/PlaceBoard/PlaceBoard'
import PromotionBoard from './Contents/PromotionBoard/PromotionBoard'
import GroupBoard from './Contents/GroupBoard/GroupBoard'

const CommunitySection = styled.div`
  border: 1px red solid;
  height: calc(100vh - 64px);
  display: grid;
  grid-template-columns: 0.25fr 0.75fr;
  grid-template-areas: "menu content";
`
const Menu = styled.div`
  grid-area: menu;
  padding: 3vh 3vw;
  border: 1px blue solid;
`
const MenuTitle = styled.div`
  font-Size: 1.5rem;
  text-align: center;
  margin-bottom: 20%;
`
const Content = styled.div`
  grid-area: content;
  border: 1px yellow solid;
  padding: 3vh 3vw;
`


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
        <div>
          {children}
        </div>
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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Community() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CommunitySection>
      <Menu>
        <MenuTitle>
          Community
        </MenuTitle>
        <Tabs
          orientation='vertical'
          value={value}
          onChange={handleChange}
          sx={{
            borderBottom: '1px rgba(0,0,0,0.5) solid',
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTab-root': { borderTop: '1px rgba(0,0,0,0.5) solid' },
            '& .Mui-selected': {},
          }}
        >
          <Tab label="자유게시판" {...a11yProps(0)} />
          <Tab label="장소 추천" {...a11yProps(1)} />
          <Tab label="홍보게시판" {...a11yProps(2)} />
          <Tab label="모임게시판" {...a11yProps(3)} />
        </Tabs>
      </Menu>
      <Content>
        <TabPanel value={value} index={0}><FreeBoard /></TabPanel>
        <TabPanel value={value} index={1}><PlaceBoard /></TabPanel>
        <TabPanel value={value} index={2}><PromotionBoard /></TabPanel>
        <TabPanel value={value} index={3}><GroupBoard /></TabPanel>
      </Content>
    </CommunitySection>
  )
}