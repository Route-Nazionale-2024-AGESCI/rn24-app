import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";

import Typography from "@mui/material/Typography";

import {
  getEventList,
  useEventInvitations,
} from "../../lib/cacheManager/events";

import WhitePaper from "../../ui/WhitePaper";
import IncontroGeneralCard from "./IncontroGeneralCard";

export async function loader({ request }) {
  const url = new URL(request.url);
  const isAlfiere = url.searchParams.get("alfiere") === "true";
  const freeEvent = url.searchParams.get("registrationRequired") !== "true";
  const { events } = await getEventList();
  return { isAlfiere, events, freeEvent };
}
export default function IncontriPlanner() {
  const { isAlfiere, events, freeEvent } = useLoaderData();
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
          e.is_registration_required !== freeEvent &&
          (isAlfiere
            ? //? e.happiness_path === user.scout_group?.happiness_path
              //: true
              e.registration_limit_from_same_scout_group !== null
            : e.registration_limit_from_same_scout_group === null)
      ),
    [events, isAlfiere, freeEvent, invUuid]
  );

  const incontriWithoutCorrelationId = useMemo(
    () => incontri.filter((e) => !e.correlation_id),
    [incontri]
  );

  const idAccadimento = useMemo(() => {
    const id = incontri.reduce((ids, e) => {
      if (!ids.includes(e.correlation_id) && e.correlation_id) {
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
              e.happiness_path ?? null
              // ? e.happiness_path
              //     .toLowerCase()
              //     .replace(/_/g, " ")
              //     .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize first character
              // : null
            }
            title={e.name}
            idAccadimento={e.correlation_id}
            eventUuid={e.uuid}
            locationId={e.location}
          />
        )),
    [idAccadimento, incontri]
  );

  const cardsWithoutCorrelationId = useMemo(
    () =>
      incontriWithoutCorrelationId.map((e) => (
        <IncontroGeneralCard
          key={e.uuid}
          date={new Date(e.starts_at)
            .toLocaleDateString("it-IT", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })
            .replace(/\//g, "-")}
          happinessPath={e.happiness_path ?? null}
          title={e.name}
          idAccadimento=""
          eventUuid={e.uuid}
          locationId={e.location}
        />
      )),
    [incontriWithoutCorrelationId]
  );

  const allCards = cards.concat(cardsWithoutCorrelationId);

  return (
    <>
      <Typography fontSize="25px" fontWeight={900} color="#2B2D2B" ml="16px">
        Incontri
      </Typography>
      <WhitePaper sx={{ px: "24px" }}>{allCards}</WhitePaper>
    </>
  );
}
