const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDFjYWU1ODg3YjhkOWUwNzRlOTdkMWE1YjVjODBmZiIsInN1YiI6IjY1M2VmM2M1NTkwN2RlMDExYmM1NzU2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TiRM-oXycBIp66UzfvU_cIPap3KFRd-05v9gs_jJeU8",
  },
};

export const BASE_URL = "https://api.themoviedb.org/3/";

function getURL(path) {
  return BASE_URL + path;
}

export async function getData(path) {
  return await fetch(getURL(path), API_OPTIONS)
    .then((res) => res.json())
    .catch((e) => {
      console.log(e.message);
      throw new Error(e.message);
    });
}
