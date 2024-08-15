import { useState, useEffect } from "react";
import { getLocationList as APIgetLocationList } from "../dataManager/locations";
import { getData, saveData } from "../idb";

async function getLocationList() {
  let locations, version;
  const localData = await getData("locations");
  if (localData !== null && localStorage.getItem("locationsVersion") !== null) {
    locations = localData;
    version = JSON.parse(localStorage.getItem("locationsVersion"));
  } else {
    ({ locations, version } = await APIgetLocationList());
    locations.length > 0 && saveData("locations", locations);
    version !== null &&
      localStorage.setItem("locationsVersion", JSON.stringify(version));
  }
  return { locations, version };
}

async function refreshLocationList() {
  const { locations, version } = await APIgetLocationList();
  locations.length > 0 && saveData("locations", locations);
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
