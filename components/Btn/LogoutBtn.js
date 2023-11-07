import React from "react";
import styled from "styled-components";
import { signOut } from "next-auth/react";

import OptimizedImage from "../OptimizedImage";

const ImageContainer = styled.div`
  display: flex;
  padding-right: 10px;
  cursor: pointer;
`;

function LogoutBtn() {
  return (
    <ImageContainer>
      <OptimizedImage
        onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
        priority={true}
        src="/assets/logout.png"
        alt={"Logout"}
        height={25}
        width={50}
      />
    </ImageContainer>
  );
}

export default LogoutBtn;
