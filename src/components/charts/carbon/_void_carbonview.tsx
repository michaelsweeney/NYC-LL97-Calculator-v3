// import * as React from "react";
// import { useState } from "react";

// import { Button } from "@mui/material";
// import { ButtonSecondary } from "styles/components";
// import SVGWrapper from "../svgwrapper";

// import { useAppSelector } from "store/hooks";
// import { ChartHeaderLined } from "styles/typography";
// import { D3WrapperCallbackPropTypes, InlineStylesType } from "types";

// import CarbonSummaryTable from "./_void_carbonsummarytable";
// import createCarbonGraph from "./_void_createcarbongraph";

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
//   tableContainer: {
//     position: "relative",
//     left: "105px",
//     height: "125px",
//     marginBottom: "10px",
//     paddingTop: "15px",

//     width: "calc(100% - 105px - 105px)",

//     boxSizing: "border-box",
//     // overflow: "hidden",
//   },
//   chartContainer: {
//     minWidth: "800px",
//     overflow: "hidden",
//     height: "calc(100% - 100px - 10px)",
//   },
// };

// const CarbonView: React.FunctionComponent = () => {
//   const { annual_carbon_summary_by_year, annual_carbon_by_year_by_fuel } =
//     useAppSelector((state) => state.building_outputs);

//   const [focusedYears, setFocusedYears] = useState([0]);

//   const [isStacked, setIsStacked] = useState(false);

//   const createCarbonLayout = (container: D3WrapperCallbackPropTypes) => {
//     createCarbonGraph({
//       container: container,
//       annual_carbon_summary_by_year: annual_carbon_summary_by_year,
//       annual_carbon_by_year_by_fuel: annual_carbon_by_year_by_fuel,
//       focused_years: focusedYears,
//       is_stacked: isStacked,
//       yearBlurCallback: handleYearsBlur,
//       yearFocusCallback: handleYearsFocus,
//     });
//   };

//   const handleYearsFocus = (e: number[]) => {
//     setFocusedYears(e);
//   };

//   const handleYearsBlur = (e: number[]) => {
//     setFocusedYears(e);
//   };

//   const handleToggleStacked = () => {
//     setIsStacked(!isStacked);
//   };

//   return (
//     <>
//       <div style={styles.header}>
//         <span>
//           <ChartHeaderLined>Carbon Threshold Summary</ChartHeaderLined>
//         </span>
//         <span>
//           <ButtonSecondary
//             color="secondary"
//             onClick={handleToggleStacked}
//             size="small"
//             variant={isStacked ? "contained" : "outlined"}
//           >
//             Stack by Fuel Type
//           </ButtonSecondary>
//         </span>
//       </div>
//       <div style={styles.main}>
//         <div style={styles.tableContainer}>
//           <CarbonSummaryTable
//             yearFocusCallback={handleYearsFocus}
//             yearBlurCallback={handleYearsBlur}
//             focused_years={focusedYears}
//           />
//         </div>
//         <div style={styles.chartContainer}>
//           <SVGWrapper createChartCallback={createCarbonLayout} />
//         </div>
//       </div>
//     </>
//   );
// };
const CarbonView = () => <div>void</div>;
export default CarbonView;
