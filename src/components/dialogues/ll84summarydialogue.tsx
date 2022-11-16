import DialogueContainer from "./dialoguecontainer";

import { SubHeaderLined } from "styles/typography";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ll84_year_lookups } from "locallaw/lookups";
import { formatNumber } from "components/charts/d3helpers";
import styled from "styled-components";
import { ButtonSecondary } from "styles/components";

const CloseButton = styled(ButtonSecondary)`
  margin-top: 20px;
  margin-left: 0px;
  border-radius: 0;
`;

const End = styled.div`
  font-family: CircularStd-Medium;
`;
const List = styled.div`
  font-family: CircularStd-Book;
  margin-bottom: 15px;
  margin-top: 15px;
  margin-left: 15px;
`;
const Warning = styled.div`
  color: red;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Intro = styled.div`
  font-family: CircularStd-Medium;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const BuildingSummaryDialogue = () => {
  const dispatch = useAppDispatch();

  const handleCloseDialogue = () => {
    dispatch(uiActions.setCurrentView("chart_view"));
  };

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

  let ll84_year_map: { [key: string]: string } = {};
  ll84_year_lookups.forEach((d) => {
    ll84_year_map[d.key] = d.label;
  });

  return (
    <DialogueContainer
      closeCallback={handleCloseDialogue}
      title="Loaded LL84 Building Summary"
    >
      <div>
        {ll84_selected_property.is_other_lookup_error ? (
          <Warning>
            Warning: This building's LL87 query includes a property type of
            "Other," which is not included as a category in the most current
            LL97 rules. The "Other" type has been set to "Office." Please review
            and redefine the category or select one of the more-specific "Other"
            categories (i.e., "Other - Education", etc.).
          </Warning>
        ) : (
          ""
        )}
        <Intro>
          The following info has been loaded from the NYC LL84 Database. Note
          that inputs should be verified by the building owner / stakeholder for
          accuracy.
        </Intro>

        <List>
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
        </List>

        <End>
          Please verify the above lookups and make any changes necessary to
          areas and utility consumption in the "Building Inputs" section of the
          calculator.
        </End>
      </div>

      <div>
        <CloseButton color="secondary" variant="outlined">
          Close
        </CloseButton>
      </div>
    </DialogueContainer>
  );
};

export default BuildingSummaryDialogue;
