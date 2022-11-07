import styled from "styled-components";
import { FooterTextAKF } from "styles/typography";
import { colors } from "styles/colors";

const Root = styled.div`
  border-top: 4px solid ${colors.secondary.main};
  height: 5px;
`;

const PageNumber = () => <div></div>;

const PageCounter = styled(PageNumber)`
  &:after {
    counter-increment: page;
    content: "Page " counter(page);
  }
`;

const PrintFooter = () => {
  return (
    <Root>
      <PageCounter />
      <FooterTextAKF>
        Calculator engine by <span>AKF Group LLC</span>
      </FooterTextAKF>
    </Root>
  );
};

export default PrintFooter;
