import { events, invitations, registrations } from "../sample_data";

/*
    --- EVENTS ---
    kind: 'SGUARDI', 'INCONTRI', 'TRACCE', 'CONFRONTI'
*/
// /api/v1/events/
export function useEventList() {
  return events;
}

// /api/v1/events/{uuid}/
export function useEvent(id) {
  return events.find((event) => event.uuid === id);
}

// /api/v1/events/invitations/
export function useEventInvitations() {
  return invitations;
}

// /api/v1/events/registrations/
export function useEventRegistrations() {
  return registrations;
}
