import React from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import { loginId, signupEmailAndId } from '../../firebase.js';
const buttons = document.getElementById('buttons');

const Login = () => {
    return (
      <AuthContent title="로그인">
          <InputWithLabel label="아이디" name="id" placeholder="아이디"/>
          <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
          <AuthButton>로그인</AuthButton>
          <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
      </AuthContent> 
    );
}


//Email 로그인, 회원가입 구현
buttons.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.id == 'signin') {
    loginEmail(email.value, pw.value).then((result) => {
      console.log(result);
      const user = result.user;
      loginSuccess(user.email, user.uid);
    });
  } else if (e.target.id == 'signup') {
    signupEmail(email.value, password.value) //
      .then((result) => {
        const user = result.user;
        loginSuccess(user.email, user.uid);
      })
      .catch((error) => console.log(error));
  }
});
//로그인 성공시 UI 변경
const loginSuccess = (email, uid) => {
  const login_area = document.getElementById('login-area');
  login_area.innerHTML = `<h2>Login 성공!</h2><div>uid: ${uid}</div><div>email: ${email}</div>`;
};


export default Login;