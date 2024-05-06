import {
  getEventList as APIgetEventList,
  getEventRegistrations as APIgetEventRegistrations,
  getEventInvitations as APIgetEventInvitations,
} from "../dataManager/events";

async function getEventList() {
  let events;
  if (localStorage.getItem("events") !== null) {
    events = JSON.parse(localStorage.getItem("events"));
  } else {
    events = await APIgetEventList();
    events.length > 0 && localStorage.setItem("events", JSON.stringify(events));
  }
  return events;
}

async function getEvent(uuid) {
  const events = await getEventList();
  return events.find((event) => event.uuid === uuid);
}

async function getTraccia() {
  const events = await getEventList();
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

export {
  getEventList,
  getEvent,
  getTraccia,
  getEventInvitations,
  getEventRegistrations,
};
