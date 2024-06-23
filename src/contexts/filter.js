import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    name: "",
    kind: "",
    //aperturaIscrizioni: null,
    //isRegistered: null,
  });

  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  return useContext(FilterContext);
};

export const applyFilter = (events, filters, registrations) => {
  const now = new Date();

  return events.filter((event) => {
    const { name, kind /*aperturaIscrizioni, isRegistered*/ } = filters;
    const eventStart = new Date(event.starts_at);

    // Filtra per nome
    const nameMatch = event.name.toLowerCase().includes(name.toLowerCase());

    // Filtra per kind
    const kindMatch = kind ? event.kind === kind : true;

    // Filtra per aperturaIscrizioni
    // let registrationOpenMatch = true;
    // if (aperturaIscrizioni !== null) {
    //   if (
    //     event.registrations_open_at === null &&
    //     event.registrations_close_at === null
    //   ) {
    //     registrationOpenMatch = aperturaIscrizioni === true;
    //   } else if (event.registrations_open_at === null) {
    //     const registrationClose = new Date(event.registrations_close_at);
    //     registrationOpenMatch =
    //       aperturaIscrizioni === true
    //         ? now < registrationClose
    //         : now >= registrationClose;
    //   } else if (event.registrations_close_at === null) {
    //     const registrationOpen = new Date(event.registrations_open_at);
    //     registrationOpenMatch =
    //       aperturaIscrizioni === true
    //         ? now >= registrationOpen
    //         : now < registrationOpen;
    //   } else {
    //     const registrationOpen = new Date(event.registrations_open_at);
    //     const registrationClose = new Date(event.registrations_close_at);
    //     registrationOpenMatch =
    //       aperturaIscrizioni === true
    //         ? now >= registrationOpen && now < registrationClose
    //         : now < registrationOpen || now >= registrationClose;
    //   }

    //   // Non ci si può iscrivere ad un evento una volta che è iniziato
    //   if (event.registrations_close_at === null && now >= eventStart) {
    //     registrationOpenMatch = false;
    //   }
    // }

    // // Filtra per stato dell'iscrizione
    // const isRegisteredMatch =
    //   isRegistered !== null
    //     ? registrations.some((reg) => reg.event === event.uuid) === isRegistered
    //     : true;

    //return nameMatch && kindMatch && registrationOpenMatch && isRegisteredMatch;
    return nameMatch && kindMatch;
  });
};
