import { MembersAxios, Axios } from "../axios/axios";

export const reqGoogleTokenSignIn = async (locale, idToken) => {
  let config = {
    headers: Object.assign({}),
  };
  let body = {
    idToken: idToken,
  };
  return Axios.post("/google-token-sign-in", body, config);
};

export const reqGetMe = async (locale, userId, authToken) => {
  let config = {
    headers: Object.assign({}, generateAuthHeaders(userId, authToken)),
  };
  return MembersAxios.get(`/me`, config);
};

// ---------- COMMON HELPER ----------

function generateAuthHeaders(userId, authToken) {
  return {
    "X-Authorization": `${authToken}`,
    "X-User-Id": `${userId}`,
  };
}
