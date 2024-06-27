import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import WhitePaper from "../../ui/WhitePaper";
import Banner from "./Banner";

import {
  getEventList,
  useEventRegistrations,
} from "../../lib/cacheManager/events";

export async function loader() {
  const { events } = await getEventList();
  return { events };
}

export default function RoutePlanner() {
  const { events } = useLoaderData();
  const { registrations } = useEventRegistrations();
  const registrationsUuid = useMemo(
    () => registrations.filter((r) => r.is_personal).map((r) => r.event),
    [registrations]
  );

  const incontro = useMemo(
    () =>
      registrationsUuid.find((uuid) =>
        events.filter((e) => e.kind === "INCONTRI").some((e) => e.uuid === uuid)
      ),
    [events, registrationsUuid]
  );
  const confronto = useMemo(
    () =>
      registrationsUuid.find((uuid) =>
        events
          .filter((e) => e.kind === "CONFRONTI")
          .some((e) => e.uuid === uuid)
      ),
    [events, registrationsUuid]
  );
  const sguardo = useMemo(
    () =>
      registrationsUuid.find((uuid) =>
        events.filter((e) => e.kind === "SGUARDI").some((e) => e.uuid === uuid)
      ),
    [events, registrationsUuid]
  );
  return (
    <>
      <Typography fontSize="25px" fontWeight={900} color="#2B2D2B" ml="16px">
        La Tua Route
      </Typography>
      <WhitePaper
        sx={{
          pt: "40px",
          px: "24px",
        }}
      >
        <Stack direction={"column"} alignItems={"center"} spacing={"20px"}>
          <Banner type="incontri" event={incontro} />
          <Banner type="confronti" event={confronto} />
          <Banner type="sguardi" event={sguardo} />
        </Stack>
      </WhitePaper>
    </>
  );
}
