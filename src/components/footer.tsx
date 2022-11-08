import * as React from "react";
import { InlineStylesType } from "types";

import { FooterTextAKF } from "styles/typography";
interface IAppProps {}

const styles: InlineStylesType = {
  root: { boxSizing: "border-box" },

  left: {
    display: "inline-block",
    width: "600px",
    textAlign: "left",
    verticalAlign: "top",
    paddingRight: "10px",
    boxSizing: "border-box",
    paddingLeft: "20px",
    paddingTop: "15px",
  },
  right: {
    display: "inline-block",
    width: "calc(100% - 600px)",
    textAlign: "right",
    verticalAlign: "top",
    paddingLeft: "15px",
    boxSizing: "border-box",
    paddingRight: "20px",
    paddingTop: "15px",
  },
};

const Footer: React.FunctionComponent<IAppProps> = (props) => {
  const akfurl = "http://www.akfgroup.com";

  return (
    <div style={styles.root}>
      <div style={styles.left}>
        {/* <FooterTextAccelerator>
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
        </FooterTextAccelerator> */}
      </div>
      <div style={styles.right}>
        <FooterTextAKF>
          Calculator engine by{" "}
          <a href={akfurl} target="_blank" rel="noopener noreferrer">
            AKF Group LLC
          </a>
        </FooterTextAKF>
      </div>
    </div>
  );
};

export default Footer;
