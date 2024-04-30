import { profile } from "../sample_data";

/*
  API endpoint: /api/v1/profile/
  Recupera il profilo personale dell'utente

  Esempio di profilo:
  {
  "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
  "agesci_id": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "user@example.com",
  "phone": null || "string",
  "scout_group": {
    "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
    "name": "string",
    "zone": "string",
    "region": "ABRUZZO",
    "subdistrict": {
      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
      "name": "string",
      "district": {
        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
        "name": "string"
      }
    },
    "happiness_path": "FELICI_DI_ACCOGLIERE"
  },
  "squads": [
    {
      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
      "name": "string"
    }
  ]
}

  Doc:
  https://rn24-dev.fly.dev/api/v1/schema/redoc/#tag/api/operation/api_v1_profile_retrieve

*/
export async function getUser() {
  return profile;
}
