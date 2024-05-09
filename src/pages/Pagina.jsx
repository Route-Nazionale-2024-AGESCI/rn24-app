import WhitePaper from "../ui/WhitePaper";
import { getPage } from "../lib/cacheManager/pages";
import { useLoaderData, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
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
    <>
      <Typography
        fontSize={"25px"}
        fontWeight={900}
        ml={"16px"}
        color={"#2B2D2B"}
      >
        {page.title}
      </Typography>
      <WhitePaper sx={{ paddingX: "24px", paddingTop: "20px" }}>
        <div className="page-container">
          <HtmlWithRouterLinks htmlString={page.body} />
        </div>
        {(parent || children.length > 0) && <Divider />}
        {parent && (
          <>
            <Box height={28} />
            <Typography variant="body2">
              Torna a{" "}
              <RouterLink
                to={`/pagine/${parent.uuid}`}
                style={{
                  textDecoration: "none",
                  color: "#6d5095",
                  fontWeight: 600,
                }}
              >
                {parent.title}
              </RouterLink>
            </Typography>
          </>
        )}
        {children.length > 0 && (
          <>
            <Box height={28} />
            <Typography variant="body2">Visita anche:</Typography>
            <ul>
              {children.map((c) => (
                <li key={c.uuid}>
                  <Typography variant="body2" fontWeight={600}>
                    <RouterLink
                      to={`/pagine/${c.uuid}`}
                      style={{
                        textDecoration: "none",
                        color: "#6d5095",
                      }}
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
    </>
  );
}
