import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { LL97OutputsFromBuildingInputs } from "locallaw/ll97_output_calcs";
import { buildingOutputActions } from "store/buildingoutputslice";
const InputListener = () => {
  const dispatch = useAppDispatch();
  const { building_inputs } = useAppSelector((state) => state);

  useEffect(() => {
    let ll97_outputs = LL97OutputsFromBuildingInputs(building_inputs);
    console.log("updating");
    console.log(ll97_outputs);
    dispatch(buildingOutputActions.setBuildingOutputs(ll97_outputs));
  }, [building_inputs, dispatch]);

  return <div style={{ display: "none" }}></div>;
};

export default InputListener;
