import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { LL84QueryPropertyTypes } from "types";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
} from "@mui/material";

const LoadModalResults = () => {
  const { ll84_query_results } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const table_column_map: string[][] = [
    ["Property Name", "property_name"],
    ["Address", "address_1"],
    ["NYC BBL", "nyc_bbl"],
    ["NYC BIN", "nyc_bin"],
    ["1st Property Type", "1st_property_use_type"],
    ["2nd Property Type", "2nd_property_use_type"],
    ["3rd Property Type", "3rd_property_use_type"],
  ];

  const handleLoadBuilding = (sel: LL84QueryPropertyTypes) => {
    dispatch(uiActions.setSelectedLL84Property(sel));
    dispatch(uiActions.setIsLoadModalOpen(false));
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {table_column_map.map((e, i) => {
              return <TableCell key={i}>{e[0]}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {ll84_query_results.map((result, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <Button
                    onClick={() => handleLoadBuilding(result)}
                    variant="outlined"
                  >
                    Load
                  </Button>
                </TableCell>
                {table_column_map.map((e, si) => (
                  <TableCell key={si}>
                    {result[e[1] as keyof typeof result]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoadModalResults;
