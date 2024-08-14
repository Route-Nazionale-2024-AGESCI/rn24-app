import React, { createContext, useContext, useState, useEffect } from "react";
import { getPage } from "../lib/cacheManager/pages";

const PersonalPagesContext = createContext();

export const PersonalPagesProvider = ({ children }) => {
  const [personalPages, setPersonalPages] = useState([]);
  const [personalPagesUuid, setPersonalPagesUuid] = useState(
    JSON.parse(localStorage.getItem("personalPagesUuid") ?? "[]")
  );

  useEffect(() => {
    Promise.all(personalPagesUuid.map((uuid) => getPage(uuid))).then((pages) =>
      setPersonalPages(pages)
    );
  }, [personalPagesUuid]);

  const addPersonalPageUuid = (uuid) => {
    setPersonalPagesUuid((prev) => {
      if (prev.includes(uuid)) return prev;
      localStorage.setItem(
        "personalPagesUuid",
        JSON.stringify([...prev, uuid])
      );
      return [...prev, uuid];
    });
  };

  const removePersonalPageUuid = (uuid) => {
    setPersonalPagesUuid((prev) => {
      if (!prev.includes(uuid)) return prev;
      localStorage.setItem(
        "personalPagesUuid",
        JSON.stringify(prev.filter((p) => p !== uuid))
      );
      return prev.filter((p) => p !== uuid);
    });
  };

  return (
    <PersonalPagesContext.Provider
      value={{ personalPages, addPersonalPageUuid, removePersonalPageUuid }}
    >
      {children}
    </PersonalPagesContext.Provider>
  );
};

export const usePersonalPages = () => {
  return useContext(PersonalPagesContext);
};
