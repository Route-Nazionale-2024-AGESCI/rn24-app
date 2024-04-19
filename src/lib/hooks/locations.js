import { locations } from "../sample_data";

// /api/v1/locations/
export function useLocations() {
  return locations;
}

// /api/v1/locations/{uuid}/

export function useLocation(id) {
  return locations.find((loc) => loc.uuid === id);
}
