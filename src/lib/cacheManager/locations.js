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

export { getLocationList, getLocation, refreshLocationList };
