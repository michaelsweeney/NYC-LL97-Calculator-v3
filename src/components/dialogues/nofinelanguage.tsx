import { SubHeaderLined } from "styles/typography";
import styled from "styled-components";

const Root = styled.div`
  padding: 20px;
`;

const NoFineDialog = () => {
  return (
    <Root>
      <SubHeaderLined>Building Not Regulated</SubHeaderLined>
      <div>Based on your inputs, your building is less than 25,000 SF.</div>
      <div>Local Law 97 applies to the following buildings</div>
      <ul>
        <li>Buildings over 25,000 gross square feet</li>
        <li>
          Two or more buildings on the same tax lot that together are over
          50,000 gross square feet
        </li>
        <li>
          Two or more buildings owned by a condo association that are governed
          by the same board of managers and that exceed 50,000 gross square feet
        </li>
      </ul>
    </Root>
  );
};
export default NoFineDialog;
