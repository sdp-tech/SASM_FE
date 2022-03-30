import React, { useEffect, useState } from "react";
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  console.log('user:',user);
  console.log('loading:',loading);
  console.log('error:',error);

    const onChangeEmail = (e)  => {
            const email =   e.target.value;
            console.log(email);
            setEmail(email)
        }

    const onChangeName = (e)  => {
            const name =   e.target.value;
            console.log(name);
            setName(name)
        }    
      
    const onChangePassword = (e)  => {
        const password =   e.target.value;
        console.log(password);
        setPassword (password)
    }

    const onChangePasswordConfirm = (e)  => {
        const passwordConfirm =   e.target.value;
        console.log(passwordConfirm);
        setPasswordConfirm(passwordConfirm)
    }

    const onClickRegister = () => {
        console.log('email:', email);
        console.log('pw:',password);
        registerWithEmailAndPassword(name, email, password);
    }

    return (
        <AuthContent title="회원가입">
            <InputWithLabel label="이메일" name="email" placeholder="이메일" value={email} onChange={onChangeEmail} /> 
            <InputWithLabel label="이름" name="name" placeholder="이름" value={name} onChange={onChangeName}/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" value={password} onChange={onChangePassword} />
            <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" value={passwordConfirm} onChange={onChangePasswordConfirm}/>
            <AuthButton onClick={onClickRegister}>회원가입</AuthButton>
            <RightAlignedLink to="/auth">로그인</RightAlignedLink>
        </AuthContent>
    );
}

export default Register;