import { InlineStylesType } from "types";
import BeExLogo from "components/svgbeexlogo";
import { useAppSelector } from "store/hooks";

const styles: InlineStylesType = {
  root: {
    borderBottom: "4px solid #BAD636",
    height: "100%",
    padding: "0px",
    boxSizing: "border-box",
  },
  h1: { fontFamily: "CircularStd-Bold", color: "#595954", fontSize: "24px" },
  h2: { fontFamily: "CircularStd-Black", color: "#595954", fontSize: "16px" },
  logo: {
    position: "absolute",
    right: "-100px",
    bottom: "-10px",
  },
};

const PrintHeader = () => {
  const { ll84_selected_property } = useAppSelector(
    (state) => state.ll84_query
  );

  const property_name = ll84_selected_property.property_name || "Manual Entry";
  return (
    <div style={styles.root}>
      <div style={styles.h1}>NYC LL97 Carbon Emissions Report</div>
      <div style={styles.h2}>{property_name}</div>
      <div style={styles.logo}>
        <BeExLogo small={true} width={150} height={150} />
      </div>
    </div>
  );
};

export default PrintHeader;
