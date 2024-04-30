import { pages } from "../sample_data";

/* 
  API endpoint: /api/v1/pages/ 
  Recuperare l'elenco completo della Pagine di contenuto.

  Struttura Page:
  {
    uuid: string (es: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f"),
    created_at: string (da convertire in Date, es: Date("2019-08-24T14:15:22Z"),
    title: string (HTML),
    slug: string,
    body: string (HTML),
    children: Pages[...]
  }


*/
export async function getPages() {
  return pages;
}

// /api/v1/pages/{uuid}/
// Da valutare: usare find ricorsiva piuttosto che call asincrona

function findPage(uuid) {
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
      // console.log(result);
      return result;
    }
  }
  return null;
}

export function getPage(uuid) {
  // return pages.find((loc) => loc.uuid === uuid);
  return findPage(uuid);
}
