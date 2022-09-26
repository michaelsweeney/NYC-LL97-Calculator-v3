import * as React from "react";
import { Button } from "@mui/material";
import { ViewTypes, InlineStylesType } from "types";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import CarbonView from "./views/carbonview";
import CostView from "./views/costview";
import FuelSummaryView from "./views/fuelsummaryview";
import TableView from "./views/tableview";
import V2TestComponent from "./v2testcomponent";

interface IAppProps {}
const styles: InlineStylesType = {
  root: {},
  top: {
    height: "50px",
    width: "100%",
    display: "inline-block",
  },
  bottom: {
    height: "calc(100% - 50px)",
    width: "100%",
    display: "inline-block",
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
  {
    label: "Fuel Breakdown",
    key: "fuel_summary",
    component: FuelSummaryView,
  },
  {
    label: "Table",
    key: "table",
    component: TableView,
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
            <Button
              onClick={() => handleSetActiveView(d.key)}
              key={i}
              variant={d.key === active_view ? "contained" : "outlined"}
            >
              {d.label}
            </Button>
          );
        })}
      </div>
      <div style={styles.bottom}>
        {/* {<V2TestComponent />} */}
        <CurrentViewComponent />
      </div>
    </React.Fragment>
  );
};

export default ViewsContainer;
