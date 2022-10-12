import ModalWrapper from "./modalwrapper";

import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { SubHeaderLined } from "styles/typography";

const InfoModal = () => {
  const { is_info_modal_open } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(uiActions.setIsInfoModalOpen(false));
  };

  return (
    <ModalWrapper
      modalTitle="NYC LL97 Carbon Emissions Calculator"
      isOpen={is_info_modal_open}
      exitCallback={handleCloseModal}
    >
      <div>
        <SubHeaderLined>About</SubHeaderLined>
        <div>
          <p>
            This calculator estimates a building's carbon penalty as a result of{" "}
            <a
              href="https://be-exchange.org/insight/the-climate-mobilization-act-int-1253/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NYC LL97
            </a>
            . Input annual utility information and building characteristics to
            generate emissions thresholds and resulting estimated penalties for
            three major penalty periods (2024-2029, 2030-2034, and 2035 and
            later).
          </p>
          <p>
            This calculator is one tool in a
            <a
              href="https://be-exchange.org/climate-mobilization-act-series/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              suite of resources{" "}
            </a>
            developed by the Building Energy Exchange in partnership with the
            NYC Accelerator to help demystify the Climate Mobilization Act and
            connect our community to solutions. The calculator engine was
            developed by AKF Group LLC.
          </p>
          <p>
            This application is optimized for Google Chrome. If experiencing
            issues with a different browser, please try again using Chrome.
          </p>
        </div>
      </div>

      <div>
        <SubHeaderLined> Instructions</SubHeaderLined>

        <div>
          Users can either load building data or enter manually, following the
          steps below.
        </div>

        <ul>
          <li>
            Select occupancy type(s) and input area(s). Occupancy types
            correspond to occupancy classes found in the NYC Building Code. To
            add more than one occupancy type use the "Add Occupancy Type"
            button.
          </li>
          <li>
            Enter your annual consumption per fuel source for the entire
            building.
          </li>
          <li>
            Enter your annual utility rate for each fuel source (total annual
            utility cost divided by total annual consumption) or click "USE
            DEFAULT RATES" to pre-populate the form with NYC average rates for
            typical commercial buildings.
          </li>
          <li>
            If the above data are unavailable, click the “LOAD” button and
            search for your building to populate the calculator with publicly
            available data found in NYC’s LL84 Benchmarking Database.
          </li>
        </ul>
      </div>
      <div>
        <SubHeaderLined>Notes and Clarifications</SubHeaderLined>
        <ul>
          <li>
            This calculator is based on interpretation of NYC Local Law 97 –
            2019 and provides only an approximation of the impact of the carbon
            emissions limits. As actual results will vary the tool should not be
            relied on as specific legal or risk mitigation guidance.
          </li>
          <li>
            Emission limits for the years 2035 thru 2050 are not yet determined
            for each individual occupancy group. The tool estimates a penalty
            for those years based on the average value for all covered buildings
            identified in the law.
          </li>
          <li>
            City agency rulemaking and enforcement practices may significantly
            impact the application of LL97 to individual buildings.
          </li>

          <li>
            LL97 provides a number of possible adjustments to the annual
            building emissions limit, including appeal based on special
            circumstances and critical building uses. These are not accounted
            for in the calculator.
          </li>
        </ul>
      </div>
    </ModalWrapper>
  );
};

export default InfoModal;
