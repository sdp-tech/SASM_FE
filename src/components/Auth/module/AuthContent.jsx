import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    width: 90%;
    // background-color: pink;
    // display: flex;
    // position: relative;
    // flex-direction: column;
    // justify-content: center;
`

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${oc.gray[8]};
    margin-bottom: 4rem;
    text-align: center;
`;

const AuthContent = ({title, children}) => (
    <Wrapper>
        <Title>{title}</Title>
        {children}
    </Wrapper>
);

export default AuthContent;