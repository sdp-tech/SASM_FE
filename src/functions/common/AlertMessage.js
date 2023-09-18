import { useEffect } from "react";
import styled from "styled-components";

function Message({setMessage, text}) {

  useEffect(() => {
    const timer = setTimeout(() => {
        setMessage(false);
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
  }, [setMessage]);

  return (
    <div>
      <MessageText>{text}</MessageText>
    </div>
  );
}

export default Message;

const MessageText = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`