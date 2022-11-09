import { SubHeaderLined } from "styles/typography";

import styled from "styled-components";

const Root = styled.div`
  padding: 20px;
`;

const NoInputDialogue = () => {
  return (
    <Root>
      <SubHeaderLined>Enter or Load Building Information</SubHeaderLined>
      Building and/or Utility Inputs have not been completed. Enter information
      manually using the panel on the left or clicking "find your building", or
      search for your building with the "Search LL84 Database" option on the
      upper-right menu.
    </Root>
  );
};

export default NoInputDialogue;
