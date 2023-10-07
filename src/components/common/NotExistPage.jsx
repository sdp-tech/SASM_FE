import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  text-align: center;
  margin-top: 200px;
  font-size: 1.2rem;
`

const NotExistPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || "존재하지 않는 페이지입니다."
  useEffect(() => {
    const timer = setTimeout(() => {
      location.state?.path ? navigate(`${location.state.path}`) : navigate(-2);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
    }}, [])

  return (
    <Box>
      <div>{message}</div>
      <div>잠시 후 이전 페이지로 돌아갑니다.</div>
    </Box>
  )
}

export default NotExistPage