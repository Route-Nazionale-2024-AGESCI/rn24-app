import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";

import Typography from "@mui/material/Typography";

import { getEventList } from "../../lib/cacheManager/events";

import EventCard from "../../ui/EventCard";
import WhitePaper from "../../ui/WhitePaper";

export async function loader() {
  const { events } = await getEventList();
  return { events };
}

export default function SguardiPlanner() {
  const { events } = useLoaderData();
  const sguardi = useMemo(
    () => events.filter((e) => e.kind === "SGUARDI"),
    [events]
  );

  return (
    <>
      <Typography fontSize="25px" fontWeight={900} color="#2B2D2B" ml="16px">
        Sguardi
      </Typography>
      <WhitePaper sx={{ px: "24px" }}>
        {sguardi.map((e) => (
          <EventCard key={e.uuid} event={e} />
        ))}
      </WhitePaper>
    </>
  );
}
