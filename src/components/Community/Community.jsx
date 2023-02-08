import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from "prop-types"
import styled from 'styled-components'
import { margin } from '@mui/system'
import FreeBoard from './Contents/FreeBoard/FreeBoard'
import PlaceBoard from './Contents/PlaceBoard/PlaceBoard'
import PromotionBoard from './Contents/PromotionBoard/PromotionBoard'
import GroupBoard from './Contents/GroupBoard/GroupBoard'

const Section = styled.div`
  height: 100%;
`
const Content = styled.div`
  height: 100%;
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


export default function Community({value}) {
  return (
    <Section>
      <Content>
        <TabPanel value={value} index={0}><FreeBoard /></TabPanel>
        <TabPanel value={value} index={1}><PlaceBoard /></TabPanel>
        <TabPanel value={value} index={2}><PromotionBoard /></TabPanel>
        <TabPanel value={value} index={3}><GroupBoard /></TabPanel>
      </Content>
    </Section>
  )
}