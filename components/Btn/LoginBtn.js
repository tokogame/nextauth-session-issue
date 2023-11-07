import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

import OptimizedImage from "../OptimizedImage";

const ImageContainer = styled.div`
  display: flex;
  padding-right: 10px;
  cursor: pointer;
`;

function LoginBtn({ provider }) {
  const { data: session, status } = useSession();
  const [loggedIn, setLoggedIn] = useState(null);

  let loginButton = (
    <ImageContainer>
      <OptimizedImage
        onClick={() => signIn("google", { callbackUrl: "/members/profile" })}
        priority={true}
        src="/assets/google-login.png"
        alt={"Login with Google"}
        height={32}
        width={82}
      />
    </ImageContainer>
  );

  let profileButton = (
    <ImageContainer>
      <Link prefetch={false} href={"/members/profile"} legacyBehavior>
        <OptimizedImage
          priority={true}
          src={session?.profilePictureUrl}
          alt={session?.emailAddress + " profile image"}
          height={25}
          width={25}
        />
      </Link>
    </ImageContainer>
  );

  useEffect(() => {
    console.log("useEffect session: " + session);
    console.log("useEffect status: " + status);

    //Initially: session is null, status is loading
    //After login: session, status is authenticated
    //After logout: session is null, status is unauthenticated
    if (session == null && status === "loading") {
      return;
    } else if (session == null && status === "unauthenticated") {
      setLoggedIn(false);
      return;
    } else if (session != null && status === "authenticated") {
      setLoggedIn(true);
      return;
    }
  }, [session, status]);

  return loggedIn == null ? null : loggedIn ? profileButton : loginButton;
}

export default LoginBtn;
