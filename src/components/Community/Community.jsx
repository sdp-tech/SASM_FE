import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"
import styled from 'styled-components'
import CommunityList from './CommunityList'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Request from '../../functions/common/Request'

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


export default function Community({value, format}) {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const navigate = useNavigate();
  const request = new Request(cookies, localStorage, navigate);
  return (
    <Section>
      <Content>
        <TabPanel value={value} index={0}><CommunityList format={format} board={value}/></TabPanel>
        <TabPanel value={value} index={1}><CommunityList format={format} board={value}/></TabPanel>
        <TabPanel value={value} index={2}><CommunityList format={format} board={value}/></TabPanel>
        <TabPanel value={value} index={3}><CommunityList format={format} board={value}/></TabPanel>
      </Content>
    </Section>
  )
}