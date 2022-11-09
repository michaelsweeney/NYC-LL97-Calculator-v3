import * as React from "react";

import { FooterTextAKF } from "styles/typography";
import styled from "styled-components";

const Right = styled.div`
  display: "inline-block";
  width: "calc(100% - 600px)";
  text-align: "right";
  vertical-align: "top";
  padding-left: "15px";
  box-sizing: "border-box";
  padding-right: "20px";
  padding-top: "15px";
`;

const Left = styled.div`
  display: "inline-block";
  width: "600px";
  text-align: "left";
  vertical-align: "top";
  padding-right: "10px";
  box-sizing: "border-box";
  padding-left: "20px";
  padding-top: "15px";
`;

const Root = styled.div`
  box-sizing: border-box;
`;

const Footer = () => {
  const akfurl = "http://www.akfgroup.com";

  return (
    <Root>
      <Left></Left>
      <Right>
        <FooterTextAKF>
          Calculator engine by{" "}
          <a href={akfurl} target="_blank" rel="noopener noreferrer">
            AKF Group LLC
          </a>
        </FooterTextAKF>
      </Right>
    </Root>
  );
};

export default Footer;
