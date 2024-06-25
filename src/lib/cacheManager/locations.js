import { useState, useEffect } from "react";
import { getLocationList as APIgetLocationList } from "../dataManager/locations";

async function getLocationList() {
  let locations, version;
  if (
    localStorage.getItem("locations") !== null &&
    localStorage.getItem("locationsVersion") !== null
  ) {
    locations = JSON.parse(localStorage.getItem("locations"));
    version = JSON.parse(localStorage.getItem("locationsVersion"));
  } else {
    ({ locations, version } = await APIgetLocationList());
    locations.length > 0 &&
      localStorage.setItem("locations", JSON.stringify(locations));
    version !== null &&
      localStorage.setItem("locationsVersion", JSON.stringify(version));
  }
  return { locations, version };
}

async function refreshLocationList() {
  const { locations, version } = await APIgetLocationList();
  locations.length > 0 &&
    localStorage.setItem("locations", JSON.stringify(locations));
  version !== null &&
    localStorage.setItem("locationsVersion", JSON.stringify(version));
  return { locations, version };
}

async function getLocation(uuid) {
  const { locations } = await getLocationList();
  return locations.find((loc) => loc.uuid === uuid);
}

function useLocations() {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const loadLocations = async () => {
      const { locations } = await getLocationList();
      setLocations(locations);
    };
    loadLocations();
  }, []);
  return locations;
}

export { getLocationList, getLocation, refreshLocationList, useLocations };
