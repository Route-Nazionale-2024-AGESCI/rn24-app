import axios from "../api";
import useSWR from "swr";

//   Doc:
//   /api/v1/schema/redoc/#tag/api/operation/api_v1_events_list
export async function getEventList() {
  const response = await axios.get("events/");
  return {
    events: response.data?.data || [],
    version: response.data?.version || null,
  };
}

// /api/v1/events/{uuid}/
export async function getEvent(uuid) {
  const response = await axios.get(`events/${uuid}/`);

  return response.data;
}

export async function getEventCheckIn(url) {
  const response = await axios.get(url);

  return response.data;
}

export function useCheckIn(uuid) {
  return useSWR(uuid ? `events/${uuid}/check-in/` : null, getEventCheckIn);
}

export async function postEventCheckIn(uuid, check_in = true) {
  const response = await axios.post(`events/${uuid}/check-in/`, { check_in });

  return response.data;
}

export async function deleteEventCheckIn(uuid) {
  const response = await axios.delete(`events/${uuid}/check-in/`);

  return response.data;
}

export async function getTraccia() {
  const { events } = await getEventList();
  return events.find((event) => event.kind === "TRACCE");
}

//  API endpoint: /api/v1/events/invitations/
//  Doc:
//  /api/v1/schema/redoc/#tag/api/operation/api_v1_events_invitations_list
export async function getEventInvitations() {
  const response = await axios.get("events/invitations/");

  return response.data || [];
}

//  API endpoint: /api/v1/events/registrations/
//  Doc:
//  /api/v1/schema/redoc/#tag/api/operation/api_v1_events_registrations_list
export async function getEventRegistrations() {
  const response = await axios.get("events/registrations/");

  return response.data;
}

//  API endpoint: POST /api/v1/events/registrations/
//  Doc:
//  /api/v1/schema/redoc/#tag/api/operation/api_v1_events_registrations_create
export async function registerToEvent(eventUuid) {
  const response = await axios.post("events/registrations/", {
    event: eventUuid,
  });

  return response.data;
}

//  API endpoint: DELETE /api/v1/events/registrations/{uuid}
//  Doc:
//  /api/v1/schema/redoc/#tag/api/operation/api_v1_events_registrations_destroy
export async function deleteRegistrationToEvent(eventUuid) {
  const response = await axios.delete(`events/registrations/${eventUuid}/`);

  return response.data;
}

//  API endpoint: GET /api/v1/events/{uuid}/attendees/
export async function getEventAttendees(url) {
  // TODO: check what happens if user doens't have can scan qr permission
  const response = await axios.get(url);

  return response.data;
}
