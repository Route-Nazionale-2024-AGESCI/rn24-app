import axios from "../api";
/* 
  API endpoint: /api/v1/locations/ 
  Recuperare l'elenco completo delle location

  Struttura Location:
  [
  {
    uuid: string (es: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f"),
    created_at: string (da convertire in Date, es: Date("2019-08-24T14:15:22Z"),
    name: string,
    coords: {
      "type": "Point",
      "coordinates": [
        12.9721,
        77.5933
      ]
    },
    "polygon": null || {
      "type": "Polygon",
      "coordinates": [
        [
          [
            0,
            0
          ],
          [
            0,
            50
          ],
          [
            50,
            50
          ],
          ...
        ]
      ]
    }
  }
]
*/
export async function getLocationList() {
  const response = await axios.get('locations/');

  return response.data?.data || [];
}

// /api/v1/locations/{uuid}/
// Da valutare: usare find piuttosto che call asincrona

export async function getLocation(uuid) {
  const response = await axios.get(`locations/${uuid}/`);

  return response.data
}

//export function findLocation(uuid) {
//  return locations.find((loc) => loc.uuid === uuid);
//}
