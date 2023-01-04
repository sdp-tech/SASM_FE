import React from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:768px)"
  });
  return <>{isMobile && children}</>
}

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({
    query: "(min-width:769px) and (max-width:1023px)"
  });
  return <>{isTablet && children}</>
}

export const Pc = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:1024px)"
  });
  return <>{isPc && children}</>
}