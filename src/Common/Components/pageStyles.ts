import styled from "styled-components";
import { theme } from "../Constants/theme";
import { themeColors } from "../../themeColors";

export const PageBGSeparator = styled.div`
  background: ${themeColors.BG};
  padding: 24px;
  height: 100%;
  @media (max-width: ${theme.mobile}) {
    padding: 0;
    height: fit-content;
  }
`;
export const PageContainer = styled.div`
  background: ${themeColors.gray1};
  height: 100%;
`;
export const TabContainer = styled.div`
  height: 100%;
  .ant-tabs-nav {
    margin: 0;
    margin-left: 23px;
  }
  .ant-tabs-content-holder {
    height: 100%;
  }
  .ant-tabs-content {
    height: 100%;
  }
  .ant-tabs-content-holder {
    height: 100%;
  }
  .ant-tabs-tabpane {
    height: 100%;
  }
`;