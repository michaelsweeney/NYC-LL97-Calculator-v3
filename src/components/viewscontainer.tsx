import * as React from "react";
import { ViewTypes, InlineStylesType } from "types";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import CarbonView from "./views/carbon/carbonview";
import CostView from "./views/cost/costview";

import { ButtonPrimary, ButtonSecondary } from "styles/components";

interface IAppProps {}
const styles: InlineStylesType = {
  root: {},
  top: {
    height: "40px",
    width: "100%",
    display: "inline-block",
  },
  bottom: {
    height: "calc(100% - 40px)",
    width: "100%",
    display: "inline-block",
  },
  button: {
    marginRight: "5px",
  },
};

type ViewSelectorType = {
  label: string;
  key: ViewTypes;
  component: React.FunctionComponent;
};

const view_selector: ViewSelectorType[] = [
  {
    label: "Carbon",
    key: "carbon",
    component: CarbonView,
  },
  {
    label: "Cost",
    key: "cost",
    component: CostView,
  },
];

const ViewsContainer: React.FunctionComponent<IAppProps> = () => {
  const dispatch = useAppDispatch();
  const handleSetActiveView = (t: ViewTypes) => {
    dispatch(uiActions.setActiveView(t));
  };

  const { active_view } = useAppSelector((state) => state.ui);

  const CurrentViewComponent = view_selector.find((d) => d.key === active_view)
    ?.component as React.FunctionComponent;

  return (
    <React.Fragment>
      <div style={styles.top}>
        {view_selector.map((d, i) => {
          return (
            <ButtonSecondary
              color="secondary"
              sx={styles.button}
              onClick={() => handleSetActiveView(d.key)}
              key={i}
              variant={d.key === active_view ? "contained" : "outlined"}
            >
              {d.label}
            </ButtonSecondary>
          );
        })}
      </div>
      <div style={styles.bottom}>
        <CurrentViewComponent />
      </div>
    </React.Fragment>
  );
};

export default ViewsContainer;
