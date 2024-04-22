import { locations } from "../sample_data";

// /api/v1/locations/
export function getLocationList() {
  return locations;
}

// /api/v1/locations/{uuid}/

export function getLocation(id) {
  return locations.find((loc) => loc.uuid === id);
}
