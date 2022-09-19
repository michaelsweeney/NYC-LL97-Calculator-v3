import * as React from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { ViewTypes } from "types";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import CarbonView from "./views/carbonview";
import CostView from "./views/costview";
import FuelSummaryView from "./views/fuelsummaryview";
import TableView from "./views/tableview";

interface IAppProps {}
const styles: { [key: string]: React.CSSProperties } = {
  root: { height: "100%", width: "100%" },
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
  const CurrentComponent = view_selector.find((d) => d.key === active_view)
    ?.component as React.FunctionComponent;

  // useEffect(() => {

  //   const handleResize = () => {

  //   }

  //   return () => window.removeEventListener(handleResize)
  // })

  return (
    <div style={styles.root}>
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
        <CurrentComponent />
      </div>
    </div>
  );
};

export default ViewsContainer;
