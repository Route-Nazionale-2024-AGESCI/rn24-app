import useSWR from "swr";
import axios from "../api";

// 5 mins
const refreshInterval = 300000;

export function useVersions() {
  const { data } = useSWR(
    "versions/",
    async () => {
      const response = await axios.get("versions/");
      return response.data;
    },
    {
      refreshInterval,
    }
  );
  let eventsVersion, pagesVersion, locationsVersion;
  if (data) {
    eventsVersion = data.find((entry) => entry.name === "events")?.version;
    pagesVersion = data.find((entry) => entry.name === "pages")?.version;
    locationsVersion = data.find(
      (entry) => entry.name === "locations"
    )?.version;
    return { eventsVersion, pagesVersion, locationsVersion };
  }
  return {};
}

export function getLocalVersions() {
  const localEventsVersion =
    JSON.parse(localStorage.getItem("eventsVersion")) ?? null;
  const localPagesVersion =
    JSON.parse(localStorage.getItem("pagesVersion")) ?? null;
  const localLocationsVersion =
    JSON.parse(localStorage.getItem("locationsVersion")) ?? null;
  return { localEventsVersion, localPagesVersion, localLocationsVersion };
}
