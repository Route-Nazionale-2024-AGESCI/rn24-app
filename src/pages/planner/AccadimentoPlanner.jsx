import { useMemo } from "react";
import { useLoaderData, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import { getEventList } from "../../lib/cacheManager/events";

import WhitePaper from "../../ui/WhitePaper";
import TimeSlot from "./TimeSlot";

export async function loader() {
  const { events } = await getEventList();
  return { events };
}

export default function AccadimentoPlanner() {
  const { events } = useLoaderData();
  const { idAccadimento } = useParams();
  const incontri = useMemo(
    () => events.filter((e) => e.correlation_id === idAccadimento),
    [events]
  );
  return (
    <>
      <Typography fontSize="25px" fontWeight={900} color="#2B2D2B" ml="16px">
        {incontri[0]?.name}
      </Typography>
      <WhitePaper sx={{ px: "24px" }}>
        {incontri.map((e) => (
          <TimeSlot key={e.uuid} event={e} />
        ))}
      </WhitePaper>
    </>
  );
}
