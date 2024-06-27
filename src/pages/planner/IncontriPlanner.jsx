import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";

import Typography from "@mui/material/Typography";

import {
  getEventList,
  useEventInvitations,
} from "../../lib/cacheManager/events";
import { useUser } from "../../lib/cacheManager/user";

import WhitePaper from "../../ui/WhitePaper";
import IncontroGeneralCard from "./IncontroGeneralCard";

export async function loader({ request }) {
  const url = new URL(request.url);
  const isAlfiere = url.searchParams.get("alfiere") === "true";
  const { events } = await getEventList();
  return { isAlfiere, events };
}
export default function IncontriPlanner() {
  const { isAlfiere, events } = useLoaderData();
  const { user } = useUser();
  const { invitations } = useEventInvitations();
  const invUuid = useMemo(
    () => invitations.map((inv) => inv.uuid),
    [invitations]
  );

  const incontri = useMemo(
    () =>
      events.filter(
        (e) =>
          e.kind === "INCONTRI" &&
          invUuid.includes(e.uuid) &&
          (isAlfiere
            ? e.happiness_path === user.scout_group.happiness_path
            : true)
      ),
    [events, isAlfiere, user.scout_group.happiness_path, invUuid]
  );

  const idAccadimento = useMemo(() => {
    const id = incontri.reduce((ids, e) => {
      if (e.correlation_id && !ids.includes(e.correlation_id)) {
        ids.push(e.correlation_id);
      }
      return ids;
    }, []);
    return id;
  }, [incontri]);

  const cards = useMemo(
    () =>
      idAccadimento
        .map((id) => incontri.find((e) => e.correlation_id === id))
        .map((e) => (
          <IncontroGeneralCard
            key={e.correlation_id}
            date={new Date(e.starts_at)
              .toLocaleDateString("it-IT", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
              .replace(/\//g, "-")}
            happinessPath={
              e.happiness_path
                ? e.happiness_path
                    .toLowerCase()
                    .replace(/_/g, " ")
                    .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize first character
                : null
            }
            title={e.name}
            idAccadimento={e.correlation_id}
          />
        )),
    [idAccadimento, incontri]
  );

  return (
    <>
      <Typography fontSize="25px" fontWeight={900} color="#2B2D2B" ml="16px">
        Incontri
      </Typography>
      <WhitePaper sx={{ px: "24px" }}>{cards}</WhitePaper>
    </>
  );
}
