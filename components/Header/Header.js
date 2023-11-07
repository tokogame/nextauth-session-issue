import React from "react";
import styled from "styled-components";

import LoginBtn from "../Btn/LoginBtn";

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  height: 60px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: center;
    height: 45px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
`;

const HeaderText = styled.div`
  display: block;
  text-align: center;
  h1 {
    font-family: Hemi-head;
    font-weight: bold;
    font-size: 17px;
    letter-spacing: 0.01em;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 100%;
  cursor: pointer;
`;

const MobileNavBarGroup = styled.div`
  display: none;
  @media (max-width: 768px) {
    align-items: center;
    display: flex;
    gap: 0px;
  }
`;

const DesktopNavBarGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 15px;
  @media (max-width: 786px) {
    display: none;
  }
`;

const DropDownContent = styled.div`
  width: 206px;
  height: 96px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  display: none;

  position: absolute;
  z-index: 2000;
  left: auto;
  right: 0;
  margin-right: -10px;
`;

function Header() {
  return (
    <Container>
      <MobileNavBarGroup></MobileNavBarGroup>
      <MobileNavBarGroup>
        <LoginBtn />
      </MobileNavBarGroup>

      <DesktopNavBarGroup>
        <HeaderText>
          <h1>Repro Session Issue NextAuth </h1>
        </HeaderText>
      </DesktopNavBarGroup>
      <DesktopNavBarGroup>
        <LoginBtn />
      </DesktopNavBarGroup>
    </Container>
  );
}

export default Header;
