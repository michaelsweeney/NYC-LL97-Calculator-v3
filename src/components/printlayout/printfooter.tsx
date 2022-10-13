import styled from "styled-components";
import {} from "styles/typography";
import { InlineStylesType } from "types";

const styles: InlineStylesType = {
  root: {
    borderTop: "4px solid #BAD636",
    height: "5px",
  },
  h1: {},
  h2: {},
};

const PageNumber = () => <div></div>;

const PageCounter = styled(PageNumber)`
  &:after {
    counter-increment: page;
    content: "Page " counter(page);
  }
`;

const PrintFooter = () => {
  return (
    <div style={styles.root}>
      <PageCounter />
    </div>
  );
};

export default PrintFooter;
