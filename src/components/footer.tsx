import * as React from "react";
import { InlineStylesType } from "types";

import { colors } from "styles/colors";
interface IAppProps {}

const styles: InlineStylesType = {
  root: { padding: "20px", boxSizing: "border-box" },
  acceleratorText: {
    fontFamily: "CircularStd-Black",
    color: colors.main.primary,
    fontSize: "16px",
    fontWeight: "700",
  },
  acceleratorLink: {
    color: "black",
    textDecoration: "none",
  },
  akfText: {
    textDecoration: "none",
    fontFamily: "CircularStd-Black",
    color: colors.main.primary,
    fontSize: "16px",
    fontWeight: "700",
  },
  left: {
    display: "inline-block",
    width: "600px",
    textAlign: "left",
    verticalAlign: "middle",
    paddingRight: "10px",
    boxSizing: "border-box",
  },
  right: {
    display: "inline-block",
    width: "calc(100% - 600px)",
    textAlign: "right",
    verticalAlign: "middle",
    paddingLeft: "10px",
    boxSizing: "border-box",
  },
};

const Footer: React.FunctionComponent<IAppProps> = (props) => {
  const retrofiturl =
    "https://www1.nyc.gov/site/nycaccelerator/index.page?utm_source=BEEx&utm_medium=LL97_Calc&utm_campaign=Evergreen";
  const akfurl = "http://www.akfgroup.com";

  return (
    <div style={styles.root}>
      <div style={styles.left}>
        <div style={styles.acceleratorText}>
          What Now? Visit{" "}
          <a
            style={styles.acceleratorLink}
            href={retrofiturl}
            target="_blank"
            rel="noopener noreferrer"
          >
            NYC Accelerator
          </a>{" "}
          for free, personalized advisory services to improve building energy
          efficiency and lower carbon emissions
        </div>
      </div>
      <div style={styles.right}>
        {" "}
        <a
          style={styles.akfText}
          href={akfurl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Calculator engine by AKF Group LLC
        </a>
      </div>
    </div>
  );
};

export default Footer;
