import React from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from './module';

const Register = () => {
    return (
        <AuthContent title="JOIN">
            <InputWithLabel label="메일 주소" name="email" placeholder="sasm@sdp.com"/>
            <InputWithLabel label="비밀번호" name="password" type="password"/>
            <InputWithLabel label="비밀번호 확인" name="passwordConfirm" type="password"/>
            <InputWithLabel label="닉네임" name="nickname"/>
            {/* <RightAlignedLink to="/auth">로그인</RightAlignedLink> */}
            <AuthButton>인증하고 시작하기</AuthButton>
        </AuthContent>
    );
}

export default Register;