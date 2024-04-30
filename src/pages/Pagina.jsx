import WhitePaper from "../ui/WhitePaper";
import { getPage } from "../lib/dataManager/pages";
import { useLoaderData } from "react-router-dom";
export async function loader({ params }) {
  const page = await getPage(params.pageId);
  return { page };
}

export default function Pagina() {
  const { page } = useLoaderData();
  return (
    <WhitePaper>
      <div dangerouslySetInnerHTML={{ __html: page.description }} />
    </WhitePaper>
  );
}
