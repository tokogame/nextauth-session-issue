import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSession } from "next-auth/react";

import { reqGetMe } from "../../services/services";
import MemberDetailsCard from "../../components/Members/MemberDetailsCard";

const Container = styled.div`
  background: #e5e5e5;
`;
const Subcontainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
  margin: auto;
  padding: 30px 0px;
  height: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0px;
    row-gap: 5px;
  }
`;

function Profile(props) {
  const [memberData, setMemberData] = useState(null);
  const router = useRouter();
  const locale = router.locale;
  const { data: session, status } = useSession();

  useEffect(() => {
    // console.log("useEffect session: " + session);
    // console.log("useEffect status: " + status);

    //Initially: session is null, status is loading
    //After login: session, status is authenticated
    //After logout: session is null, status is unauthenticated
    if (session == null && status === "loading") {
      return;
    } else if (session == null && status === "unauthenticated") {
      router.push("/");
      return;
    } else if (session != null && status === "authenticated") {
      console.log("useEffect session.userId: " + session.userId);
      const fetchMemberData = async () => {
        const res = await reqGetMe(locale, session.userId, session.authToken);
        const member = res?.data?.data;
        if (member == null) {
          console.log(
            "profile.js fetchMemberData reqGetMe: Failed response from be"
          );
          return false;
        }
        setMemberData(member);
      };

      fetchMemberData().catch((e) => {
        // handle the error as needed
        console.error("profile.js fetchMemberData Error: ", e);
      });
    }
  }, [session, status]);

  return (
    <Container>
      <Subcontainer>
        {session == null ||
        status === "unauthenticated" ||
        memberData == null ? null : (
          <>
            <MemberDetailsCard
              profilePictureUrl={memberData.profilePictureUrl}
              emailAddress={memberData.emailAddress}
              fullName={memberData.fullName}
              phoneNumber={memberData.phoneNumber}
            />
          </>
        )}
      </Subcontainer>
    </Container>
  );
}

export default Profile;
