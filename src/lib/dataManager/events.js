import { events, invitations, registrations } from "../sample_data";

/*
    --- EVENTS ---
    kind: 'SGUARDI', 'INCONTRI', 'TRACCE', 'CONFRONTI'
*/
// /api/v1/events/
export function getEventList() {
  return events;
}

// /api/v1/events/{uuid}/
export function getEvent(id) {
  return events.find((event) => event.uuid === id);
}

// /api/v1/events/invitations/
export function getEventInvitations() {
  return invitations;
}

// /api/v1/events/registrations/
export function getEventRegistrations() {
  return registrations;
}
