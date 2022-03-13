import axios from "axios";

const {
  REACT_APP_CLIENT_ID: client_id,
  REACT_APP_CLIENT_SECRET: client_secret,
} = process.env;

export async function getToken() {
  const url = "https://accounts.spotify.com/api/token";
  const {
    data: { access_token },
  } = await axios.post(url, "grant_type=client_credentials", {
    headers: {
      Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return access_token;
}
