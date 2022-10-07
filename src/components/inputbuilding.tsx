import * as React from "react";

import { TableCell, TableRow, Button } from "@mui/material";

import SingleSelect from "./singleselect";
import FocusInput from "./focusinput";

import { building_type_co2_coefficients } from "locallaw/lookups";

import { buildingInputActions } from "store/buildinginputslice";

import { useAppDispatch, useAppSelector } from "store/hooks";

interface IAppProps {}

const InputBuilding: React.FunctionComponent<IAppProps> = (props) => {
  const { building_types } = useAppSelector((state) => state.building_inputs);

  const dispatch = useAppDispatch();

  const handleBuildingAreaChange = (id: number, value: number) => {
    dispatch(buildingInputActions.setBuildingArea({ id, value }));
  };

  const handleBuildingTypeChange = (id: number, value: string) => {
    dispatch(buildingInputActions.setBuildingType({ id, value }));
  };

  const handleRemoveBuildingType = (id: number) => {
    dispatch(buildingInputActions.removeBuildingType({ id }));
  };

  const handleAddBuildingType = () => {
    dispatch(buildingInputActions.addBuildingType({}));
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell></TableCell>
        <TableCell variant="head">Building Input</TableCell>
        <TableCell variant="head">Area (SF)</TableCell>
        <TableCell></TableCell>
      </TableRow>

      {building_types.map((bldg_type, i) => {
        return (
          <TableRow key={i}>
            <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>
            <TableCell>
              <SingleSelect
                value={bldg_type.building_type}
                callback={(v) => {
                  handleBuildingTypeChange(bldg_type.building_id, v as string);
                }}
                option_values={building_type_co2_coefficients.map(
                  (e) => e.building_type
                )}
                option_titles={building_type_co2_coefficients.map(
                  (e) => e.building_type
                )}
              />
            </TableCell>
            <TableCell>
              <FocusInput
                value={bldg_type.building_area}
                callback={(v) => {
                  handleBuildingAreaChange(bldg_type.building_id, v as number);
                }}
                input_type="number"
              />
            </TableCell>
            <TableCell>
              {building_types.length === 1 ? (
                <span></span>
              ) : (
                <Button
                  disableRipple={true}
                  sx={{
                    "&:hover": {
                      color: "secondary.dark",
                      backgroundColor: "white",
                    },
                  }}
                  size="small"
                  onClick={() =>
                    handleRemoveBuildingType(bldg_type.building_id)
                  }
                >
                  x
                </Button>
              )}
            </TableCell>
          </TableRow>
        );
      })}
      <TableRow>
        <TableCell sx={{ textAlign: "center" }}></TableCell>
        <TableCell variant="head" colSpan={3}>
          <Button
            disableRipple={true}
            size="small"
            onClick={() => handleAddBuildingType()}
            variant="contained"
            sx={{
              boxShadow: 0,
              "&:hover": {
                boxShadow: 0,
              },
            }}
          >
            +
          </Button>
          <span style={{ marginLeft: 10 }}>Add Building Type</span>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default InputBuilding;
