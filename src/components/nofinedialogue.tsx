import { SubHeaderLined } from "styles/typography";
import { InlineStylesType } from "types";

const styles: InlineStylesType = {
  root: {
    padding: 20,
  },
};

const NoFineDialog = () => {
  return (
    <div style={styles.root}>
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
    </div>
  );
};
export default NoFineDialog;
