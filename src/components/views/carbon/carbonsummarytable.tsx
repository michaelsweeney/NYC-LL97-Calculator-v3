import { CarbonSummaryByYearObj, InlineStylesType } from "types";

import { colors } from "styles/colors";
import { useAppSelector } from "store/hooks";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
} from "@mui/material";
import { formatNumber, formatCurrency } from "../d3helpers";
import { yearToYearArray } from "locallaw/lookups";
type PropTypes = {
  yearFocusCallback: (yr: number[]) => void;
  yearBlurCallback: (yr: number[]) => void;
  focused_years: number[];
};

const styles: InlineStylesType = {
  root: { overflow: "hidden" },
  fineCell: {
    color: colors.reds.medium,
  },
  focusedCell: {
    backgroundColor: "gray",
  },
  td: {
    cursor: "pointer",
    fontSize: "14px",
    padding: "0px",
    paddingLeft: "5px",
    paddingRight: "5px",
    whiteSpace: "nowrap",
  },
  tdhead: {
    fontWeight: "700",
    whiteSpace: "nowrap",
  },
};
const getCellStyle = (obj: CarbonSummaryByYearObj, focused_years: number[]) => {
  let { is_fine, year } = obj;
  let cellStyle: InlineStylesType = {};

  let year_array = yearToYearArray(year);

  let is_focused = false;
  if (focused_years.includes(year) || year_array.includes(focused_years[0])) {
    is_focused = true;
  }

  if (is_fine && !is_focused) {
    cellStyle.color = colors.reds.medium;
  }
  if (is_fine && is_focused) {
    cellStyle.color = colors.reds.dark;
  }

  if (!is_fine && !is_focused) {
    cellStyle.color = colors.secondary.main;
  }

  if (!is_fine && is_focused) {
    cellStyle.color = colors.grays.dark;
  }

  return cellStyle;
};
const CarbonSummaryTable = (props: PropTypes) => {
  const { yearBlurCallback, yearFocusCallback, focused_years } = props;
  const { annual_carbon_summary_by_year } = useAppSelector(
    (state) => state.building_outputs
  );

  const data_array = annual_carbon_summary_by_year;

  const col_array = [
    {
      key: 2024,
      label: "2024-2029",
    },
    {
      key: 2030,
      label: "2030-2034",
    },
    {
      key: 2035,
      label: "2035-2039",
    },
    {
      key: 2040,
      label: "2040-2049",
    },
    {
      key: 2050,
      label: "2050-",
    },
  ];

  const row_array = [
    {
      key: "carbon_total_absolute",
      label: "Annual Carbon (tCO2e/yr)",
    },
    {
      key: "carbon_total_absolute",
      label: "Annual Carbon (tCO2e/yr)",
    },
    {
      key: "threshold_absolute",
      label: "Threshold (tCO2e/yr)",
    },
    { key: "fine", label: "Fine ($/yr)" },
  ];

  const handleMouseOverCell = (yr: number) => {
    yearFocusCallback(yearToYearArray(yr));
  };

  const handleMouseOutCell = (yr: number) => {
    yearBlurCallback([0]);
  };

  return (
    <TableContainer sx={styles.root}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...styles.td, ...styles.tdhead }}>
              Summary
            </TableCell>
            {col_array.map((d, i) => {
              let obj = data_array?.find((obj) => obj.year === d.key);

              if (obj) {
                return (
                  <TableCell
                    onMouseOver={() =>
                      //@ts-ignore
                      handleMouseOverCell(d.key as number)
                    }
                    onMouseOut={() =>
                      //@ts-ignore
                      handleMouseOutCell(d.key as number)
                    }
                    sx={{
                      ...getCellStyle(obj, focused_years),
                      ...styles.td,
                      ...styles.tdhead,
                    }}
                    key={i}
                  >
                    {d.label}
                  </TableCell>
                );
              } else {
                return <TableCell key={i}></TableCell>;
              }
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {row_array.map((r, ri) => {
            return (
              <TableRow key={ri}>
                <TableCell style={styles.td}>{r.label}</TableCell>
                {col_array.map((c, ci) => {
                  let val;
                  let obj = data_array?.find((d) => d.year === c.key);
                  if (obj) {
                    let key = r.key as keyof typeof data_array[0];
                    val = obj[key] as number;
                    if (key === "carbon_total_absolute") {
                      val = formatNumber(val);
                    } else if (key === "threshold_absolute") {
                      val = formatNumber(val);
                    } else if (key === "fine") {
                      val = formatCurrency(val);
                    }
                    return (
                      <TableCell
                        onMouseOver={() =>
                          //@ts-ignore
                          handleMouseOverCell(obj?.year as number)
                        }
                        onMouseOut={() =>
                          //@ts-ignore
                          handleMouseOutCell(obj?.year as number)
                        }
                        sx={{
                          ...getCellStyle(obj, focused_years),
                          ...styles.td,
                        }}
                        key={ci}
                      >
                        {val}
                      </TableCell>
                    );
                  } else {
                    return <TableCell key={ci}></TableCell>;
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CarbonSummaryTable;
