import { Children } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";

const Content = styled.div`
  height: calc(100% - 100px);
  padding: 25px;
  overflow: scroll;
  box-sizing: border-box;
`;

const Header = styled.div`
  height: 50px;
  margin-left: 15px;
  margin-right: 15px;
  box-sizing: border-box;
  padding: 15px;
  border-bottom: 1px solid ${colors.secondary.light};
`;

const Footer = styled.div`
  height: 50px;
  margin-left: 15px;
  margin-right: 15px;
  box-sizing: border-box;
  padding: 15px;
  border-top: 1px solid ${colors.secondary.light};
`;

const MainContainer = styled.div`
  height: 100%;
  box-sizing: border-box;
`;

type DialogueContainerPropTypes = {
  header?: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
  footer?: React.ReactNode;
};
const DialogueContainer = (props: DialogueContainerPropTypes) => {
  return (
    <MainContainer>
      <Header>{props.header}</Header>
      <Content>{props.children}</Content>
      <Footer>{props.footer}</Footer>
    </MainContainer>
  );
};
export default DialogueContainer;
