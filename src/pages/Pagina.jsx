import WhitePaper from "../ui/WhitePaper";
import { getPage } from "../lib/dataManager/pages";
import { useLoaderData, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import HtmlWithRouterLinks from "../lib/htmlParser";
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
      <HtmlWithRouterLinks htmlString={page.body} />
      {parent && (
        <>
          <Typography variant="body1">Torna a</Typography>
          <Typography sx={{ color: "agesciPurple.main" }}>
            <RouterLink
              to={`/pagine/${parent.uuid}`}
              style={{ textDecoration: "none" }}
            >
              {parent.title}
            </RouterLink>
          </Typography>
        </>
      )}
      {children.length > 0 && (
        <>
          <Typography variant="body1">Visita anche:</Typography>
          <ul>
            {children.map((c) => (
              <li key={c.uuid}>
                <Typography sx={{ color: "agesciPurple.main" }}>
                  <RouterLink
                    to={`/pagine/${c.uuid}`}
                    style={{ textDecoration: "none" }}
                  >
                    {c.title}
                  </RouterLink>
                </Typography>
              </li>
            ))}
          </ul>
        </>
      )}
    </WhitePaper>
  );
}
