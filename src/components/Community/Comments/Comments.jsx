import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import Request from '../../../functions/common/Request';
import styled from 'styled-components';
import Comment from './Comment';

export default function Comments({ review }) {
  return (
  <>
    {review.map((data, index) => (
      <Comment data={data} />
    ))}
  </>
  )
}
