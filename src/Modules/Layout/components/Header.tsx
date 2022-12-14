import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { themeColors } from "../../../Common/Constants/themeColors";
import { sideBarMenu, SideBarMenuItem } from "../../../Common/Constants/menu";
import { theme } from "../../../Common/Constants/theme";
import { Breadcrumb } from "antd";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 22px;
  background: ${themeColors.gray1};

  color: ${themeColors.gray7};
  @media (max-width: ${theme.mobile}) {
    padding: 10px 16px;
    gap: 12px;
  }
`;
export const HeaderTitleDiv = styled.div`
  display: flex;
  padding: 0px 22px 10px 22px;
  background: ${themeColors.gray1};
  color: ${themeColors.gray7};
  @media (max-width: ${theme.mobile}) {
    padding: 6px 16px;
  }
  @media (max-width: ${theme.minimobile}) {
    padding: 6px 16px;
    flex-direction: column;
  }
`;
export const HeaderTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: ${themeColors.gray9};
  margin: 0;
`;
const HomeLink = styled(Link)`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray7};
  text-decoration: none;
`;
const CurrentPageLabel = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${themeColors.gray8};
`;
const FirstLineDiv = styled.div`
  display: inline;

  svg {
    width: 24px;
    height: 16px;
  }
`;

export const Header = () => {
  const path = useLocation().pathname;
  const pageTitle = sideBarMenu.find((x: SideBarMenuItem) => x.link == path)
    ?.label;
  return (
    <HeaderContainer>
      <Breadcrumb>
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
      </Breadcrumb>
    </HeaderContainer>
  );
};
