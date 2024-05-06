import { getPages as APIgetPages } from "../dataManager/pages";

async function getPages() {
  let pages;
  if (localStorage.getItem("pages") !== null) {
    pages = JSON.parse(localStorage.getItem("pages"));
  } else {
    pages = await APIgetPages();
    pages.length > 0 && localStorage.setItem("pages", JSON.stringify(pages));
  }
  return pages;
}

async function getPage(uuid) {
  const pages = await getPages();
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

async function getSicurezza() {
  const pages = await getPages();
  const sicurezzaPage = pages.find((p) => p.slug === "sicurezza");
  if (sicurezzaPage === undefined) return null;
  return sicurezzaPage;
}

export { getPages, getPage, getSicurezza };
