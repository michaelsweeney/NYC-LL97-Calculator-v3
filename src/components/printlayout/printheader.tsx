import BeExLogo from "components/svgbeexlogo";
import { useAppSelector } from "store/hooks";
import styled from "@emotion/styled";

import { colors } from "styles/colors";

const Root = styled.div`
  border-bottom: 4px solid ${colors.secondary.main};
  height: 100%;
  padding: 0px;
  box-sizing: border-box;
`;

const H1 = styled.div`
  font-family: CircularStd-Bold;
  color: ${colors.secondary.main};
  font-size: 24px;
`;
const H2 = styled.div`
  font-family: CircularStd-Bold;
  color: ${colors.secondary.main};
  font-size: 16px;
`;
const H3 = styled.div`
  font-family: CircularStd-Medium;
  color: ${colors.secondary.main};
  font-size: 14px;
`;
const LogoContainer = styled.div`
  position: absolute;
  right: -100px;
  bottom: -10px;
`;

const PrintHeader = () => {
  const { ll84_building_name, ll84_year_label } = useAppSelector(
    (state) => state.ll84_query
  );

  return (
    <Root>
      <H1>NYC LL97 Carbon Emissions Report</H1>
      <H2>{ll84_building_name}</H2>
      <H3>{ll84_year_label}</H3>
      <LogoContainer>
        <BeExLogo small={true} width={150} height={150} />
      </LogoContainer>
    </Root>
  );
};

export default PrintHeader;
