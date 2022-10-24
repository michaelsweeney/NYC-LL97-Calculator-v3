import { SubHeaderLined } from "styles/typography";

import { InlineStylesType } from "types";

const styles: InlineStylesType = {
  root: {
    padding: 20,
  },
};

const NoInputDialogue = () => {
  return (
    <div style={styles.root}>
      <SubHeaderLined>Incomplete Building Input Information</SubHeaderLined>
      Building and/or Utility Inputs have not been completed. Enter information
      manually using the panel on the left, or search for your building with the
      "Search LL84 Database" option on the upper-right menu.
    </div>
  );
};

export default NoInputDialogue;
