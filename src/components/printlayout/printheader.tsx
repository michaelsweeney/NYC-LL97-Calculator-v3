import BeExLogoFull from "components/svgbeexlogofull";
import { useAppSelector } from "store/hooks";
import styled from "@emotion/styled";

import { colors } from "styles/colors";
import CalcLogo from "components/calclogo";

const Root = styled.div`
  border-bottom: 2px solid ${colors.secondary.main};
  height: 100%;
  padding: 0px;
  box-sizing: border-box;
`;

const H1 = styled.div`
  font-family: CircularStd-Bold;
  color: ${colors.primary.main};
  padding-top: 10px;
  font-size: 46px;
  width: 400px;
  line-height: 46px;
`;

const H2 = styled.div`
  font-family: CircularStd-Bold;
  color: ${colors.secondary.main};
  font-size: 16px;
`;

// middle position
const LL97Container = styled.div`
  position: absolute;
  right: 100px;
  bottom: 15px;
`;
// right position
const BeExLogoContainer = styled.span`
  position: absolute;
  right: -110px;
  bottom: 25px;
`;

const BeExText = styled.div`
  color: ${colors.secondary.main};
  font-size: 12px;
  font-family: CircularStd-Medium;
  padding: 0;
  line-height: 12px;
  letter-spacing: 0px;
`;

const BeExTextContainer = styled.div`
  position: relative;
  right: 0;
  bottom: 0;
`;

const PrintHeader = () => {
  const { ll84_building_name, ll84_year_label } = useAppSelector(
    (state) => state.ll84_query
  );

  return (
    <Root>
      <H1>NYC Carbon Emissions Report</H1>
      <LL97Container>
        <CalcLogo width={175} />
      </LL97Container>
      <BeExLogoContainer>
        <div style={{ width: 175 }}>
          <BeExLogoFull />
          <BeExTextContainer>
            <BeExText>building</BeExText>
            <BeExText>energy</BeExText>
            <BeExText>exchange</BeExText>
          </BeExTextContainer>
        </div>
      </BeExLogoContainer>
    </Root>
  );
};

export default PrintHeader;
