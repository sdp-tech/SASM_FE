import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  text-align: center;
  margin-top: 200px;
  font-size: 1.2rem;
`

const NotExistPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-2);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
    }}, [])

  return (
    <Box>
      <div>존재하지 않는 페이지입니다.</div>
      <div>잠시 후 이전 페이지로 돌아갑니다.</div>
    </Box>
  )
}

export default NotExistPage