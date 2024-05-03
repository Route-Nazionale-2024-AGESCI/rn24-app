import WhitePaper from "../ui/WhitePaper";
import { getPage } from "../lib/dataManager/pages";
import { useLoaderData, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
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
    <WhitePaper sx={{ paddingX: "24px", paddingTop: "20px" }}>
      <div className="page-container">
        <HtmlWithRouterLinks htmlString={page.body} />
      </div>
      {/* <Divider sx={{ marginBottom: 3 }} /> */}
      <Box height={28} />
      {parent && (
        <>
          <Typography variant="body2">
            Torna a{" "}
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
          <Typography variant="body2">Visita anche:</Typography>
          <ul>
            {children.map((c) => (
              <li key={c.uuid}>
                <Typography variant="body2">
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
