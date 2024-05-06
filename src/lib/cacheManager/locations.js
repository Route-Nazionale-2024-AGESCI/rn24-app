import { getLocationList as APIgetLocationList } from "../dataManager/locations";

async function getLocationList() {
  let locations;
  if (localStorage.getItem("locations") !== null) {
    locations = JSON.parse(localStorage.getItem("locations"));
  } else {
    locations = await APIgetLocationList();
    locations.length > 0 &&
      localStorage.setItem("locations", JSON.stringify(locations));
  }
  return locations;
}

async function getLocation(uuid) {
  const locations = await getLocationList();
  return locations.find((loc) => loc.uuid === uuid);
}

export { getLocationList, getLocation };
