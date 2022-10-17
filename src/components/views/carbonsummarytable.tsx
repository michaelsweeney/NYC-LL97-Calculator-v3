import { CarbonSummaryByYearObj, InlineStylesType } from "types";

import { colors } from "styles/colors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
} from "@mui/material";
import { formatNumber, formatCurrency } from "./d3helpers";

const styles: InlineStylesType = {
  root: {},
  fineCell: {
    color: colors.reds.medium,
  },
};

const CarbonSummaryTable = () => {
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

  const getColStyle = (k: any) => {
    let { key } = k;
    let style: InlineStylesType = {};

    let obj = data_array?.find((d) => d.year === key) as CarbonSummaryByYearObj;

    if (obj) {
      let { is_fine } = obj;

      if (is_fine) {
        style = { color: colors.reds.medium };
      }
    }

    return style;
  };

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {col_array.map((d, i) => (
              <TableCell sx={getColStyle(d)} key={i}>
                {d.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {row_array.map((r, ri) => {
            return (
              <TableRow key={ri}>
                <TableCell>{r.label}</TableCell>
                {col_array.map((c, ci) => {
                  let val;
                  let obj = data_array?.find((d) => d.year === c.key);
                  let cellstyle: InlineStylesType = {};
                  if (obj) {
                    cellstyle = obj.is_fine ? styles.fineCell : {};

                    let key = r.key as keyof typeof data_array[0];
                    val = obj[key] as number;
                    if (key === "carbon_total_absolute") {
                      val = formatNumber(val);
                    } else if (key === "threshold_absolute") {
                      val = formatNumber(val);
                    } else if (key === "fine") {
                      val = formatCurrency(val);
                    }
                  }
                  return (
                    <TableCell sx={cellstyle} key={ci}>
                      {val}
                    </TableCell>
                  );
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
