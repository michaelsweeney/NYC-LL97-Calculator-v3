// import * as React from "react";
// import { useState } from "react";

// import SVGWrapper from "../svgwrapper";
// import { Button } from "@mui/material";
// import { ButtonSecondary } from "styles/components";
// import { useAppSelector } from "store/hooks";
// import { D3WrapperCallbackPropTypes, InlineStylesType } from "types";
// import { ChartHeaderLined } from "styles/typography";
// import createCostGraph from "./_void_createcostgraph";

// const styles: InlineStylesType = {
//   root: {},
//   header: {
//     height: "50px",
//     padding: 10,
//     boxSizing: "border-box",
//   },
//   main: {
//     height: "calc(100% - 50px)",
//     boxSizing: "border-box",
//   },
// };

// const CostView: React.FunctionComponent = () => {
//   const { building_outputs } = useAppSelector((state) => state);
//   const { annual_carbon_summary_by_year } = building_outputs;
//   const { annual_cost_by_fuel } = building_outputs;

//   const [isStacked, setIsStacked] = useState(true);

//   const handleToggleStacked = () => {
//     setIsStacked(!isStacked);
//   };

//   const createCostLayout = (container: D3WrapperCallbackPropTypes) => {
//     createCostGraph({
//       container: container,
//       annual_carbon_summary_by_year: annual_carbon_summary_by_year,
//       is_stacked: isStacked,
//       annual_cost_by_fuel: annual_cost_by_fuel,
//     });
//   };

//   return (
//     <>
//       <div style={styles.header}>
//         <div style={styles.chartTitle}>
//           <span>
//             <ChartHeaderLined>Cost Summary</ChartHeaderLined>
//           </span>
//           <span>
//             <ButtonSecondary
//               color="secondary"
//               onClick={handleToggleStacked}
//               size="small"
//               variant={isStacked ? "contained" : "outlined"}
//             >
//               Stack by Fuel Type
//             </ButtonSecondary>
//           </span>
//         </div>
//       </div>
//       <div style={styles.main}>
//         <SVGWrapper createChartCallback={createCostLayout} />
//       </div>
//     </>
//   );
// };

const CostView = () => <div>void</div>;

export default CostView;
