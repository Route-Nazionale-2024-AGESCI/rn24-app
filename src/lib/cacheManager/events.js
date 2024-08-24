import useSWR from "swr";
import {
  getEventList as APIgetEventList,
  getEventRegistrations as APIgetEventRegistrations,
  getEventInvitations as APIgetEventInvitations,
  getEventAttendees as APIgetEventAttendees,
} from "../dataManager/events";
import { useUser, getUser } from "./user";
import isValidUUID, { isValidId } from "../uuid";
import { getData, saveData } from "../idb";

async function getUnfilteredEventList() {
  let events, version;
  const localData = await getData("events");
  if (localData !== null && localStorage.getItem("eventsVersion") !== null) {
    events = localData;
    version = JSON.parse(localStorage.getItem("eventsVersion"));
  } else {
    ({ events, version } = await APIgetEventList());
    events.length > 0 && saveData("events", events);
    version !== null &&
      localStorage.setItem("eventsVersion", JSON.stringify(version));
  }
  return { events, version };
}

async function getEventList() {
  let { events, version } = await getUnfilteredEventList();
  const user = await getUser();
  const arrival = user?.scout_group?.arrival_date;
  const departure = user?.scout_group?.departure_date;
  const arrivalDate = arrival !== undefined ? new Date(arrival) : null;
  const departureDate = departure !== undefined ? new Date(departure) : null;
  if (arrivalDate !== null) {
    events = events.filter((event) => {
      const eventStart = new Date(event.starts_at);
      return eventStart >= arrivalDate;
    });
  }
  const timeSpan = 3 * 60 * 60 * 1000;
  if (departureDate !== null) {
    events = events.filter((event) => {
      const eventEnd = new Date(event.ends_at);
      return eventEnd <= new Date(departureDate.getTime() + timeSpan);
    });
  }
  return { events, version };
}

async function refreshEventList() {
  const { events, version } = await APIgetEventList();
  events.length > 0 && saveData("events", events);
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

function isQuotaExceededError(err) {
  return (
    err instanceof DOMException &&
    // everything except Firefox
    (err.code === 22 ||
      // Firefox
      err.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      err.name === "QuotaExceededError" ||
      // Firefox
      err.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
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
    try {
      localStorage.setItem(`attendees-${eventId}`, JSON.stringify(data));
    } catch (e) {
      if (isQuotaExceededError(e) || true) {
        console.error("Storage quota exceeded! Freeing up local storage...");
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("attendees-")) {
            localStorage.removeItem(key);
          }
        });
        localStorage.setItem(`attendees-${eventId}`, JSON.stringify(data));
      } else {
        console.error(e);
      }
    }
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
