import * as React from "react";

import FocusNumberInput from "./focusnumberinput";
import { buildingInputActions } from "store/buildinginputslice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { InlineStylesType } from "types";
interface IAppProps {}

const styles: InlineStylesType = {
  text: {
    width: "100px",
    verticalAlign: "middle",
    position: "relative",
    top: "5px",
    marginLeft: "25px",
    fontFamily: "CircularStd-Book",
    fontSize: "14px",
    fontWeight: "400",
    display: "inline-block",
  },
  input_container: {
    marginLeft: "15px",
    width: "125px",
    display: "inline-block",
  },
};

const InputOnsiteGeneration: React.FunctionComponent<IAppProps> = () => {
  const dispatch = useAppDispatch();
  const building_inputs = useAppSelector((state) => state.building_inputs);

  const handleElectricOnsitePVConsumptionChange = (v: number) => {
    dispatch(buildingInputActions.setElectricOnsitePVConsumptionChange(v));
  };
  return (
    <div>
      <div style={styles.text}>Solar PV (kWh)</div>
      <div style={styles.input_container}>
        <FocusNumberInput
          value={
            building_inputs.electric_onsite_generation.photovoltaic.consumption
          }
          callback={(v) => {
            handleElectricOnsitePVConsumptionChange(v as number);
          }}
        ></FocusNumberInput>
      </div>
    </div>
  );
};

export default InputOnsiteGeneration;
