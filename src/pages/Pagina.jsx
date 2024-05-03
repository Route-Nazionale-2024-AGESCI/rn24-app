import WhitePaper from "../ui/WhitePaper";
import { getPage } from "../lib/dataManager/pages";
import { useLoaderData, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
export async function loader({ params }) {
  const page = await getPage(params.pageId);
  const parent = await getPage(page.parent);

  return { page, parent };
}

export default function Pagina() {
  const { page, parent } = useLoaderData();
  const children = page.children;
  return (
    <WhitePaper>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
      {parent && (
        <Typography variant="body1">
          Torna a{" "}
          <RouterLink
            to={`/pagine/${parent.uuid}`}
            style={{ textDecoration: "none" }}
          >
            {parent.title}
          </RouterLink>
        </Typography>
      )}
      {children.length > 0 && (
        <>
          <Typography variant="body1">Visita anche:</Typography>
          <ul>
            {children.map((c) => (
              <li key={c.uuid}>
                <RouterLink to={`/pagine/${c.uuid}`}>{c.title}</RouterLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </WhitePaper>
  );
}
