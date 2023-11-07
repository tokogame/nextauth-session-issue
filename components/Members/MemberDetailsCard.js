import React, { useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import OptimizedImage from "../OptimizedImage";
import LogoutBtn from "../Btn/LogoutBtn";

const Container = styled.div`
  height: 100%;
  width: 35%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background: #ffffff;
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
  }
`;
const CardContent = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;
const HeaderContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;
const Title = styled.div`
  h1 {
    font-family: Hemi-head;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.04em;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subtitle = styled.div`
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.04em;
  color: #000000;
`;

const HighlightText = styled.div`
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.04em;
  color: #000000;
`;

function MemberDetailCard({
  profilePictureUrl,
  fullName,
  emailAddress,
  phoneNumber,
}) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    if (!isMobile) {
    }
  }, []);

  return (
    <Container>
      <CardContent>
        <HeaderContainer>
          <OptimizedImage
            priority={false}
            src={profilePictureUrl}
            alt="Profile Picture"
            height="60"
            width="60"
          />
          <TitleContainer>
            <Title>
              <h1 id="title">{fullName}</h1>
            </Title>
            <Subtitle>📧 {emailAddress}</Subtitle>
            {phoneNumber != null ? (
              <HighlightText>📱 {phoneNumber}</HighlightText>
            ) : null}
          </TitleContainer>
        </HeaderContainer>
        <LogoutBtn />
      </CardContent>
    </Container>
  );
}

export default MemberDetailCard;
