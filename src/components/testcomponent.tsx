import { useEffect } from "react";

import { useAppDispatch } from "store/hooks";

import { buildingInputActions } from "store/buildinginputslice";
import { LL84SelectionToLL97Inputs } from "locallaw/ll84_query_to_ll97_inputs";
import { LL84QueryPropertyTypes } from "types";
import { ll84QueryActions } from "store/ll84queryslice";
const TestComponent = () => {
  // testing component, can do anything in here
  // without rerendering unnecessary children.

  const dispatch = useAppDispatch();

  useEffect(() => {
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
      district_steam_consumption_kbtu: (70702 * 1194).toString(),
      natural_gas_consumption_kbtu: (18093 * 100).toString(),
      electricity_consumption_kbtu: (30678343 * 3.412).toString(),
      electricity_onsite_generated_kbtu: "Not Available",
    };

    dispatch(ll84QueryActions.setSelectedLL84Property(selected_ll84_data));
    let ll97_conversion = LL84SelectionToLL97Inputs(selected_ll84_data);

    if (ll97_conversion.bldg_type_one_type !== undefined) {
      dispatch(
        buildingInputActions.setBuildingInputsFromLL84Results(ll97_conversion)
      );
    }

    // dispatch loaded inputs to building inputs.
  }, [dispatch]);

  return <div style={{ display: "none" }}></div>;
};

export default TestComponent;
