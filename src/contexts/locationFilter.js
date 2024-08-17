import React, { createContext, useContext, useState } from "react";

const LocationFilterContext = createContext();

export const LocationFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: "",
    ignoreDistrict: false
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

export const applyFilter = (locations, filters, userDistrict) => {
  return locations.filter((location) => {
    const { category, ignoreDistrict } = filters;

    // Filtra per sottocampo
    const districtMatch = ignoreDistrict || !userDistrict || !location.district || location.district === userDistrict
    
    // Filtra per categoria
    const categoryMatch = category === "" || location.category && location.category.toLowerCase().includes(category.toLowerCase());
    
    // Soddisfa i filtri o è una location senza marker (solo path o plygon)
    return ( districtMatch && categoryMatch ) || !(location.coords?.coordinates);
    
  });
};
