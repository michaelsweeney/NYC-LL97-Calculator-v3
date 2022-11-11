import { SubHeaderLined } from "styles/typography";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import DialogueContainer from "./dialoguecontainer";

import NoFineLanguage from "./nofinelanguage";
import NoInputLanguage from "./noinputlanguage";
import { NotesAndClarifications } from "components/printlayout/notesandclarifications";

const CalcInfoDialogue = () => {
  const dispatch = useAppDispatch();

  const handleCloseDialogue = () => {
    dispatch(uiActions.setCurrentView("chart_view"));
  };

  return (
    <DialogueContainer
      closeCallback={handleCloseDialogue}
      title="About This Calculator"
    >
      <div>
        <div>
          <p>
            This calculator estimates a building’s carbon penalty as a result of{" "}
            <a
              href="https://be-exchange.org/insight/the-climate-mobilization-act-int-1253/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NYC LL97
            </a>
            . Search for your building to load benchmarking data, or manually
            input information, to generate emissions thresholds and estimated
            penalties for each compliance period.
          </p>
          <p>
            This calculator is one tool in a{" "}
            <a
              href="https://be-exchange.org/climate-mobilization-act-series/"
              target="_blank"
              rel="noopener noreferrer"
            >
              suite of resources{" "}
            </a>
            developed by Building Energy Exchange to demystify the Climate
            Mobilization Act and connect our community to solutions. The
            calculator engine was developed by AKF Group LLC.
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
          To load building utility data, click “find your building,” or enter
          manually following the steps below.
        </div>
        <ul>
          <li>
            Select occupancy type(s) and input area(s). To add more than one
            occupancy type use the "Add Occupancy Type" button.
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
        </ul>
      </div>
      <div>
        <NotesAndClarifications />
      </div>
    </DialogueContainer>
  );
};

export default CalcInfoDialogue;
