import { getPages as APIgetPages } from "../dataManager/pages";
import { useEffect, useState } from "react";
import { getData, saveData } from "../idb";

async function getPages() {
  let pages, version;
  const localData = await getData("pages");
  if (localData !== null && localStorage.getItem("pagesVersion") !== null) {
    pages = localData;
    version = JSON.parse(localStorage.getItem("pagesVersion"));
  } else {
    ({ pages, version } = await APIgetPages());
    pages.length > 0 && saveData("pages", pages);
    version !== null &&
      localStorage.setItem("pagesVersion", JSON.stringify(version));
  }
  return { pages, version };
}

async function refreshPages() {
  const { pages, version } = await APIgetPages();
  pages.length > 0 && saveData("pages", pages);
  version !== null &&
    localStorage.setItem("pagesVersion", JSON.stringify(version));
  return { pages, version };
}

async function getPage(uuid) {
  const { pages } = await getPages();
  function searchPage(node, uuid) {
    if (!node) {
      return null;
    }
    if (node.uuid === uuid) {
      return node;
    }
    for (let child of node.children) {
      let result = searchPage(child, uuid);
      if (result) {
        return result;
      }
    }
    return null;
  }
  for (let page of pages) {
    let result = searchPage(page, uuid);
    if (result) {
      return result;
    }
  }
  return null;
}

async function searchBySlug(slug) {
  const { pages } = await getPages();
  function searchPage(node, slug) {
    if (!node) {
      return null;
    }
    if (node.slug.toLowerCase() === slug) {
      return node;
    }
    for (let child of node.children) {
      let result = searchPage(child, slug);
      if (result) {
        return result;
      }
    }
    return null;
  }
  for (let page of pages) {
    let result = searchPage(page, slug.toLowerCase());
    if (result) {
      return result;
    }
  }
  return null;
}

function usePages() {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    const loadPages = async () => {
      const { pages: p } = await getPages();
      setPages(p);
    };
    loadPages();
  }, []);
  return pages;
}

async function getSicurezza() {
  const sicurezzaPage = await searchBySlug("sicurezza");
  if (sicurezzaPage === null) return null;
  return sicurezzaPage;
}

async function getLibretto() {
  const librettoPage = await searchBySlug("libretto");
  if (librettoPage === null) return null;
  return librettoPage;
}

export {
  getPages,
  getPage,
  getSicurezza,
  getLibretto,
  refreshPages,
  searchBySlug,
  usePages,
};
