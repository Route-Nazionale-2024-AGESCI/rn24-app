import { getPages as APIgetPages } from "../dataManager/pages";

async function getPages() {
  let pages, version;
  if (
    localStorage.getItem("pages") !== null &&
    localStorage.getItem("pagesVersion") !== null
  ) {
    pages = JSON.parse(localStorage.getItem("pages"));
    version = JSON.parse(localStorage.getItem("pagesVersion"));
  } else {
    ({ pages, version } = await APIgetPages());
    pages.length > 0 && localStorage.setItem("pages", JSON.stringify(pages));
    version !== null &&
      localStorage.setItem("pagesVersion", JSON.stringify(version));
  }
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

async function getSicurezza() {
  const { pages } = await getPages();
  const sicurezzaPage = pages.find((p) => p.slug === "sicurezza");
  if (sicurezzaPage === undefined) return null;
  return sicurezzaPage;
}

export { getPages, getPage, getSicurezza };
