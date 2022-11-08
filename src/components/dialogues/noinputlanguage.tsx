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
      <SubHeaderLined>Enter or Load Building Information</SubHeaderLined>
      Building and/or Utility Inputs have not been completed. Enter information
      manually using the panel on the left or clicking "find your building", or
      search for your building with the "Search LL84 Database" option on the
      upper-right menu.
    </div>
  );
};

export default NoInputDialogue;
