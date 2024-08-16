import React, { createContext, useContext, useState } from "react";

const LocationFilterContext = createContext();

export const LocationFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: "",
  });

  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <LocationFilterContext.Provider value={{ filters, updateFilter }}>
      {children}
    </LocationFilterContext.Provider>
  );
};

export const useFilters = () => {
  return useContext(LocationFilterContext);
};

export const applyFilter = (locations, filters) => {
  return locations.filter((location) => {
    const { category } = filters;
    if (category === "") {
      return true
    } else {
      // Filtra per categoria
      const categoryMatch = location.category && location.category.toLowerCase().includes(category.toLowerCase());
      
      // Soddisfa i filtri o è una location senza marker (solo path o plygon)
      return categoryMatch || !(location.coords?.coordinates);
    }
    
  });
};
