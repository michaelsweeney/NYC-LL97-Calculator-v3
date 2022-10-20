import PrintContent from "./printcontent";
import PrintHeader from "./printheader";
import PrintFooter from "./printfooter";

import { InlineStylesType } from "types";

const styles: InlineStylesType = {
  header: {
    height: "100px",
    width: "100%",
    position: "fixed",
    top: 0,
  },
  headerSpace: { height: "100px" },
  footer: {
    height: "50px",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  footerSpace: { height: "50px" },
  content: {
    width: "100%",
    height: "100%",
  },
};

const PrintLayout = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>
              <div style={styles.headerSpace}></div>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div style={styles.content}>
                <PrintContent />
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>
              <div style={styles.footerSpace}></div>
            </td>
          </tr>
        </tfoot>
      </table>

      <div style={styles.header}>
        <PrintHeader />
      </div>
      <div style={styles.footer}>
        <PrintFooter />
      </div>
    </div>
  );
};

export default PrintLayout;
