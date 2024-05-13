import axios from "../api";
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
  const response = await axios.get("pages/");

  return {
    pages: response.data?.data || [],
    version: response.data?.version || null,
  };
}

// /api/v1/pages/{uuid}/
// Da valutare: usare find ricorsiva piuttosto che call asincrona

export async function getPage(uuid) {
  const response = await axios.get(`pages/${uuid}/`);

  return response.data;
}
/*

*/
