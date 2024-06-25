import { useLoaderData } from "react-router-dom";

export function loader({ request }) {
  const url = new URL(request.url);
  const isAlfiere = url.searchParams.get("alfiere") === "true";
  return { isAlfiere };
}
export default function IncontriPlanner() {
  const { isAlfiere } = useLoaderData();
  return <p>Incontri planner {isAlfiere ? "Alfiere" : ""}</p>;
}
