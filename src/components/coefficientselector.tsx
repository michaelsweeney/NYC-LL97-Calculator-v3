import React from "react";

import SingleSelect from "./singleselect";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { CarbonCoefficientTypes } from "types";
import { buildingInputActions } from "store/buildinginputslice";
import { InlineStylesType } from "types";

const FocusInput = () => {
  const dispatch = useAppDispatch();

  const { electric_coefficient_method } = useAppSelector(
    (state) => state.building_inputs
  );

  const styles: InlineStylesType = {
    text: {
      width: "150px",
      display: "inline-block",
    },
    select_container: {
      width: "175px",
      display: "inline-block",
    },
  };

  const handleChangeElectricCoefficientMethod = (e: string | number) => {
    dispatch(
      buildingInputActions.setElectricCoefficientMethod(
        e as CarbonCoefficientTypes
      )
    );
  };

  const option_values: CarbonCoefficientTypes[] = ["cambium", "ll97_current"];
  const option_titles: string[] = ["Cambium", "LL97 Current Rate"];

  return (
    <div>
      <div style={styles.text}>Electric Coefficients</div>
      <div style={styles.select_container}>
        <SingleSelect
          callback={handleChangeElectricCoefficientMethod}
          value={electric_coefficient_method}
          option_values={option_values}
          option_titles={option_titles}
        />
      </div>
    </div>
  );
};
export default FocusInput;
