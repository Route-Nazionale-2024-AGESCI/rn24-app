import useSWR from "swr";
import {
  getEventList as APIgetEventList,
  getEventRegistrations as APIgetEventRegistrations,
  getEventInvitations as APIgetEventInvitations,
  getEventAttendees as APIgetEventAttendees,
} from "../dataManager/events";
import { useUser } from "./user";
import isValidUUID, { isValidId } from "../uuid";

async function getEventList() {
  let events, version;
  if (
    localStorage.getItem("events") !== null &&
    localStorage.getItem("eventsVersion") !== null
  ) {
    events = JSON.parse(localStorage.getItem("events"));
    version = JSON.parse(localStorage.getItem("eventsVersion"));
  } else {
    ({ events, version } = await APIgetEventList());
    events.length > 0 && localStorage.setItem("events", JSON.stringify(events));
    version !== null &&
      localStorage.setItem("eventsVersion", JSON.stringify(version));
  }
  return { events, version };
}

async function refreshEventList() {
  const { events, version } = await APIgetEventList();
  events.length > 0 && localStorage.setItem("events", JSON.stringify(events));
  version !== null &&
    localStorage.setItem("eventsVersion", JSON.stringify(version));
  return { events, version };
}

async function getEvent(uuid) {
  const { events } = await getEventList();
  if (isValidUUID(uuid))
    return events.find((event) => event.uuid === uuid) ?? null;
  else if (isValidId(uuid))
    return events.find((event) => event.id === Number(uuid)) ?? null;
  return null;
}

async function getTraccia() {
  const { events } = await getEventList();
  return events.find((event) => event.kind === "TRACCE");
}

async function getEventInvitations() {
  let invitations;
  if (navigator.onLine) {
    invitations = await APIgetEventInvitations();
    invitations.length > 0 &&
      localStorage.setItem("invitations", JSON.stringify(invitations));
  } else {
    invitations = JSON.parse(localStorage.getItem("invitations"));
  }
  return invitations ?? [];
}

async function getEventRegistrations() {
  let registrations;
  if (navigator.onLine) {
    registrations = await APIgetEventRegistrations();
    registrations.length > 0 &&
      localStorage.setItem("registrations", JSON.stringify(registrations));
  } else {
    registrations = JSON.parse(localStorage.getItem("registrations"));
  }
  return registrations ?? [];
}

function useEventRegistrations() {
  const { data, error, mutate } = useSWR(
    "events/registrations/",
    APIgetEventRegistrations
  );
  // TODO: manage errors
  error !== undefined && console.error(error);

  if (data) {
    localStorage.setItem("registrations", JSON.stringify(data));
    return { registrations: data, mutate };
  }
  return {
    registrations: JSON.parse(localStorage.getItem("registrations")) ?? [],
    mutate,
  };
}

function useEventInvitations() {
  const { data, error, mutate } = useSWR(
    "events/invitations",
    APIgetEventInvitations
  );
  // TODO: manage errors
  error !== undefined && console.error(error);

  if (data) {
    localStorage.setItem("invitations", JSON.stringify(data));
    return { invitations: data, mutate };
  }
  return {
    invitations: JSON.parse(localStorage.getItem("invitations")) ?? [],
    mutate,
  };
}

function useEventAttendees(eventId) {
  const { user } = useUser();
  const shouldFetch = user && user?.permissions?.can_scan_qr;
  const fetchUrl = shouldFetch ? `events/${eventId}/attendees/` : null;
  const { data, error, mutate } = useSWR(fetchUrl, APIgetEventAttendees, {
    refreshInterval: 30000,
  });
  // TODO: manage errors
  error !== undefined && console.error(error);
  if (data) {
    localStorage.setItem(`attendees-${eventId}`, JSON.stringify(data));
    return { attendees: data, mutate };
  }
  return {
    attendees: JSON.parse(localStorage.getItem(`attendees-${eventId}`)) ?? [],
    mutate,
  };
}

export {
  getEventList,
  getEvent,
  getTraccia,
  getEventInvitations,
  getEventRegistrations,
  useEventInvitations,
  useEventRegistrations,
  useEventAttendees,
  refreshEventList,
};
