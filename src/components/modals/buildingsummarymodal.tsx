import ModalWrapper from "./modalwrapper";

import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ll84_year_lookups } from "locallaw/lookups";
import { InlineStylesType } from "types";
import { formatNumber } from "components/charts/d3helpers";
const styles: InlineStylesType = {
  root: {},
  intro: {
    fontFamily: "CircularStd-Medium",
    marginBottom: "10px",
  },
  warning: {
    color: "red",
    marginBottom: "10px",
  },
  list: {
    fontFamily: "CircularStd-Book",
    marginBottom: "15px",
    marginTop: "15px",
    marginLeft: "15px",
  },
  end: {
    fontFamily: "CircularStd-Medium",
  },
};

const BuildingSummaryModal = () => {
  const { is_building_summary_modal_open } = useAppSelector(
    (state) => state.ui
  );

  const { ll84_selected_property } = useAppSelector(
    (state) => state.ll84_query
  );

  const formatIfAvailable = (e: string) => {
    if (e === "Not Available") {
      return "Not Available";
    } else {
      return formatNumber(+e);
    }
  };
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(uiActions.setIsBuildingSummaryModalOpen(false));
  };

  let ll84_year_map: { [key: string]: string } = {};
  ll84_year_lookups.forEach((d) => {
    ll84_year_map[d.key] = d.label;
  });

  const use_types = [
    ll84_selected_property["3rd_property_use_type"],
    ll84_selected_property["2nd_property_use_type"],
    ll84_selected_property["1st_property_use_type"],
  ];

  return (
    <ModalWrapper
      modalTitle="LL84 Loaded Building Summary"
      isOpen={is_building_summary_modal_open}
      exitCallback={handleCloseModal}
    >
      <div>
        <div style={styles.intro}>
          The following info has been loaded from the NYC LL84 Database. Note
          that inputs should be verified by the building owner / stakeholder for
          accuracy.
        </div>
        {ll84_selected_property.is_other_lookup_error ? (
          <div style={styles.warning}>
            Warning: This building's LL87 query includes a property type of
            "Other," which is not included as a category in the most current
            LL97 rules. The "Other" type has been set to "Office." Please review
            and redefine the category or select one of the more-specific "Other"
            categories (i.e., "Other - Education", etc.).
          </div>
        ) : (
          ""
        )}

        <div style={styles.list}>
          <div>
            LL84 Year Queried: {ll84_year_map[ll84_selected_property.ll84_year]}
          </div>
          <div>Property Name: {ll84_selected_property.property_name}</div>
          <div>Property ID: {ll84_selected_property.property_id}</div>
          <div>NYC BBL: {ll84_selected_property.nyc_bbl}</div>
          <div>NYC BIN: {ll84_selected_property.nyc_bin}</div>
          <div>Address: {ll84_selected_property.address_1}</div>
          <div>
            1st property use type:{" "}
            {ll84_selected_property["1st_property_use_type"]}
          </div>
          <div>
            1st property use SF:{" "}
            {formatIfAvailable(ll84_selected_property["1st_property_use_sf"])}
          </div>
          <div>
            2nd property use type:{" "}
            {ll84_selected_property["2nd_property_use_type"]}
          </div>
          <div>
            2nd property use SF:{" "}
            {formatIfAvailable(ll84_selected_property["2nd_property_use_sf"])}
          </div>
          <div>
            3rd property use type:{" "}
            {ll84_selected_property["3rd_property_use_type"]}
          </div>
          <div>
            3rd property use SF:{" "}
            {formatIfAvailable(ll84_selected_property["3rd_property_use_sf"])}
          </div>
          <div>
            Fuel Oil 2 Consumption (kBtu):{" "}
            {formatIfAvailable(
              ll84_selected_property.fuel_oil_2_consumption_kbtu
            )}
          </div>
          <div>
            Fuel Oil 4 Consumption (kBtu){" "}
            {formatIfAvailable(
              ll84_selected_property.fuel_oil_4_consumption_kbtu
            )}
          </div>
          <div>
            District Steam Consumption (kBtu):{" "}
            {formatIfAvailable(
              ll84_selected_property.district_steam_consumption_kbtu
            )}
          </div>
          <div>
            Natural Gas Consumption (kBtu):{" "}
            {formatIfAvailable(
              ll84_selected_property.natural_gas_consumption_kbtu
            )}
          </div>
          <div>
            Electricity Consumption (kBtu):{" "}
            {formatIfAvailable(
              ll84_selected_property.electricity_consumption_kbtu
            )}
          </div>
          <div>
            Electricity Generated Onsite (kBtu):{" "}
            {formatIfAvailable(
              ll84_selected_property.electricity_onsite_generated_kbtu
            )}
          </div>
        </div>

        <div style={styles.end}>
          Please verify the above lookups and make any changes necessary to
          areas and utility consumption in the "Building Inputs" section of the
          calculator.
        </div>
      </div>
    </ModalWrapper>
  );
};

export default BuildingSummaryModal;
