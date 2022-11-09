import ChartView from "components/charts/chartview";
import { SubHeaderLined } from "styles/typography";

import { NotesAndClarifications } from "./notesandclarifications";
import { InlineStylesType } from "types";

import UtilityInputsTable from "./utilityinputstable";
import BuildingAreasTable from "./buildingareastable";
import LL97SummaryTable from "./ll97summarytable";

import styled from "styled-components";

const Paragraph = styled.div`
  margin: 20px;
`;
const RootContainer = styled.div`
  margin-top: 0px;
  margin-bottom: 0px;
`;

const Block = styled.div`
  page-break-inside: avoid;
  margin-bottom: 25px;
`;

const ChartContainer = styled.div`
  width: 750px;
  height: 750px;
`;

const chartContainerPadding = {
  t: 25,
  l: 75,
  r: 75,
  b: 50,
};

const PageBreakAfter = styled.div`
  page-break-before: always;
  visibility: hidden;
  @media print {
    break-after: always;
    visibility: hidden;
  }
`;

const PrintContent = () => {
  return (
    <RootContainer>
      <Block>
        <SubHeaderLined>Introduction</SubHeaderLined>
        <Paragraph>
          This report provides a summary of this property’s standing related to
          NYC Local Law 97. Building inputs should be checked for accuracy, and
          the calculator assumes that the entered utility inputs will remain the
          same for every year from 2024 to 2050. The following tables summarize
          input information, output summaries, and additional graphics are
          provided on the second page. Visit be-exchange.org/calculator for more
          information, and refer to the “Notes and Clarifications” section of
          this report for additional context.
        </Paragraph>
      </Block>

      <Block>
        <LL97SummaryTable />
      </Block>
      {/* <PageBreakAfter>i</PageBreakAfter> */}
      <Block>
        <SubHeaderLined>Carbon Threshold Summary</SubHeaderLined>
        <ChartContainer>
          <ChartView
            view_type="carbon"
            unit_type="absolute"
            stack_type="summary"
            container_padding={chartContainerPadding}
            show_title={false}
          />
        </ChartContainer>
      </Block>
      {/* <PageBreakAfter>i</PageBreakAfter> */}

      <Block>
        <SubHeaderLined>Utility and Penalty Cost Summary</SubHeaderLined>
        <ChartContainer>
          <ChartView
            view_type="cost"
            unit_type="absolute"
            stack_type="summary"
            container_padding={chartContainerPadding}
            show_title={false}
          />
        </ChartContainer>
      </Block>

      <PageBreakAfter>i</PageBreakAfter>

      <Block>
        <UtilityInputsTable />
      </Block>

      <Block>
        <BuildingAreasTable />
      </Block>
      <Block>
        <NotesAndClarifications />
      </Block>
    </RootContainer>
  );
};

export default PrintContent;
