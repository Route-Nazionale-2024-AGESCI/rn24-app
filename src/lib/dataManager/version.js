import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRevalidator } from "react-router-dom";
import axios from "../api";

import { refreshEventList } from "../cacheManager/events";
import { refreshLocationList } from "../cacheManager/locations";
import { refreshPages } from "../cacheManager/pages";

// 30 secs
const refreshInterval = 30000;

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

const isBefore = (date1, date2) => {
  if (new Date(date1) < new Date(date2)) return true;
  return false;
};

export function useRefreshData() {
  const revalidator = useRevalidator();
  const { eventsVersion, pagesVersion, locationsVersion } = useVersions();
  const { localEventsVersion, localPagesVersion, localLocationsVersion } =
    getLocalVersions();
  const [eventsUpdated, setEventsUpdated] = useState(
    eventsVersion !== undefined &&
      localEventsVersion !== null &&
      !isBefore(localEventsVersion, eventsVersion)
  );
  const [pagesUpdated, setPagesUpdated] = useState(
    pagesVersion !== undefined &&
      localPagesVersion !== null &&
      !isBefore(localPagesVersion, pagesVersion)
  );
  const [locationsUpdated, setLocationsUpdated] = useState(
    locationsVersion !== undefined &&
      localLocationsVersion !== null &&
      !isBefore(localLocationsVersion, locationsVersion)
  );
  useEffect(() => {
    if (!eventsUpdated) {
      refreshEventList().then(() => {
        setEventsUpdated(true);
        revalidator.revalidate();
        console.log("events updated");
      });
    }
  }, [eventsUpdated, revalidator]);
  useEffect(() => {
    if (!pagesUpdated) {
      refreshPages().then(() => {
        setPagesUpdated(true);
        revalidator.revalidate();
        console.log("pages updated");
      });
    }
  }, [pagesUpdated, revalidator]);
  useEffect(() => {
    if (!locationsUpdated) {
      refreshLocationList().then(() => {
        setLocationsUpdated(true);
        revalidator.revalidate();
        console.log("locations updated");
      });
    }
  }, [locationsUpdated, revalidator]);
  useEffect(() => {
    if (
      eventsVersion === undefined ||
      localEventsVersion === null ||
      isBefore(localEventsVersion, eventsVersion)
    ) {
      setEventsUpdated(false);
      console.log("events need update");
    }
  }, [eventsVersion, localEventsVersion]);
  useEffect(() => {
    if (
      pagesVersion === undefined ||
      localPagesVersion === null ||
      isBefore(localPagesVersion, pagesVersion)
    ) {
      setPagesUpdated(false);
      console.log("pages need update");
    }
  }, [pagesVersion, localPagesVersion]);
  useEffect(() => {
    if (
      locationsVersion === undefined ||
      localLocationsVersion === null ||
      isBefore(localLocationsVersion, locationsVersion)
    ) {
      setLocationsUpdated(false);
      console.log("locations need update");
    }
  }, [locationsVersion, localLocationsVersion]);
}
