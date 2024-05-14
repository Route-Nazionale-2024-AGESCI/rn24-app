import Typography from "@mui/material/Typography";
import WhitePaper from "../ui/WhitePaper";
import { useLoaderData, Link as RouterLink } from "react-router-dom";
import HtmlWithRouterLinks from "../lib/htmlParser";
import { getSicurezza } from "../lib/cacheManager/pages";
export async function loader() {
  return await getSicurezza();
}

export default function Avvisi() {
  const paginaSicurezza = useLoaderData();
  const children = paginaSicurezza?.children ?? [];
  if (paginaSicurezza !== null && paginaSicurezza !== undefined)
    return (
      <WhitePaper sx={{ paddingX: "24px", paddingTop: "20px" }}>
        <div className="sicurezza-container">
          <HtmlWithRouterLinks htmlString={paginaSicurezza.body} />
        </div>
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
  return (
    <WhitePaper sx={{ paddingX: "24px", paddingTop: "20px" }}>
      <Typography variant="h3">Informazioni di sicurezza</Typography>
      <Typography variant="body1" mt={6}>
        Al momento non sono disponibili indicazioni per la sicurezza durante la
        Route Nazionale.
      </Typography>
    </WhitePaper>
  );
}
