import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { uiActions } from "store/uislice";
import { buildingInputActions } from "store/buildinginputslice";
import { LL84SelectionToLL97Inputs } from "locallaw/ll84_query_to_ll97_inputs";
import { LL97OutputsFromBuildingInputs } from "locallaw/ll97_output_calcs";
import { LL84QueryPropertyTypes } from "types";
import { buildingOutputActions } from "store/buildingoutputslice";
const TestComponent = () => {
  // testing component, can do anything in here
  // without rerendering unnecessary children.

  const building_inputs = useAppSelector((state) => state.building_inputs);
  const ll84_query_results = useAppSelector(
    (state) => state.ui.ll84_query_results
  );

  const ll97_inputs = useAppSelector((state) => state.building_inputs);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(uiActions.setLL84QueryInput("On"));
    // dispatch(uiActions.setLL84YearSelection("ll84_2021_cal_2020"));

    // let selected_ll84_data = ll84_query_results[0];

    let selected_ll84_data: LL84QueryPropertyTypes = {
      property_name: "One Liberty Plaza",
      property_id: "1261446",
      address_1: "165 Broadway",
      nyc_bbl: "1-00062-7501",
      nyc_bin: "1001068",
      "1st_property_use_type": "Office",
      "1st_property_use_sf": "2281918",
      "2nd_property_use_type": "Social/Meeting Hall",
      "2nd_property_use_sf": "41501",
      "3rd_property_use_type": "Data Center",
      "3rd_property_use_sf": "18000",
      fuel_oil_2_consumption_kbtu: "Not Available",
      fuel_oil_4_consumption_kbtu: "Not Available",
      district_steam_consumption_kbtu: "65234835.7",
      natural_gas_consumption_kbtu: "317548.4",
      electricity_consumption_kbtu: "92303403",
      electricity_onsite_generated_kbtu: "Not Available",
    };

    dispatch(uiActions.setSelectedLL84Property(selected_ll84_data));
    // dispatch(uiActions.setIsLoadModalOpen(false));

    let ll97_conversion = LL84SelectionToLL97Inputs(selected_ll84_data);
    // console.log(selected_ll84_data);

    if (ll97_conversion.bldg_type_one_type !== undefined) {
      dispatch(
        buildingInputActions.setBuildingInputsFromLL84Results(ll97_conversion)
      );

      let ll97_outputs = LL97OutputsFromBuildingInputs(ll97_inputs);

      dispatch(buildingOutputActions.setBuildingOutputs(ll97_outputs));
    }

    // dispatch loaded inputs to building inputs.
  }, [ll84_query_results]);

  return <div style={{ display: "none" }}></div>;
};

export default TestComponent;
