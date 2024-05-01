import { events, invitations, registrations } from "../sample_data";

/*
  API endpoint: /api/v1/events/
  Recuperare l'elenco completo degli eventi

  Struttura Event:
  {
    "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
    "created_at": string da convertire in Date, es: Date("2019-08-24T14:15:22Z"),
    "name": "string",
    "page": null || "41895ab6-abf1-4268-a146-61786fd667a5",
    "location": "15f20760-76a7-41ee-b509-705d3ffd8eb5",
    "is_registration_required": bool,
    "registration_limit": null || int,
    "registration_limit_from_same_scout_group": null || int,
    "starts_at": string da convertire in Date,
    "ends_at": string da convertire in Date,
    "registrations_open_at": null || string da convertire in Date,
    "registrations_close_at": null || string da convertire in Date,
    "kind": string (valori possibili: "SGUARDI", "INCONTRI", "TRACCE", "CONFRONTI", "ALTRO"), 
  }

*/

//   Doc:
//   https://rn24-dev.fly.dev/api/v1/schema/redoc/#tag/api/operation/api_v1_events_list
export function getEventList() {
  return events;
}

// /api/v1/events/{uuid}/
// Da valutare: usare find piuttosto che call asincrona
export function getEvent(uuid) {
  return events.find((event) => event.uuid === uuid);
}

export function getTraccia() {
  return events.find((event) => event.kind === "TRACCE");
}

//  API endpoint: /api/v1/events/invitations/
//  Doc:
//  https://rn24-dev.fly.dev/api/v1/schema/redoc/#tag/api/operation/api_v1_events_invitations_list
export async function getEventInvitations() {
  return invitations;
}

//  API endpoint: /api/v1/events/registrations/
//  Doc:
//  https://rn24-dev.fly.dev/api/v1/schema/redoc/#tag/api/operation/api_v1_events_registrations_list
export async function getEventRegistrations() {
  return registrations;
}

//  API endpoint: POST /api/v1/events/registrations/
//  Doc:
//  https://rn24-dev.fly.dev/api/v1/schema/redoc/#tag/api/operation/api_v1_events_registrations_create
export async function registerToEvent(eventUuid) {
  // Send POST then GET registrations
  return;
}

//  API endpoint: DELETE /api/v1/events/registrations/{uuid}
//  Doc:
//  https://rn24-dev.fly.dev/api/v1/schema/redoc/#tag/api/operation/api_v1_events_registrations_destroy
export async function deleteRegistrationToEvent(eventUuid) {
  // Send DELETE then GET registrations
  return;
}
