import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import WhitePaper from "../../ui/WhitePaper";
import Banner from "./Banner";

import { getEventList } from "../../lib/cacheManager/events";

export async function loader() {
  const { events } = await getEventList();
  return { events };
}

export default function RoutePlanner() {
  const { events } = useLoaderData();
  const incontri = useMemo(
    () => events.filter((e) => e.kind === "INCONTRI"),
    [events]
  );
  const confronti = useMemo(
    () => events.filter((e) => e.kind === "CONFRONTI"),
    [events]
  );
  const sguardi = useMemo(
    () => events.filter((e) => e.kind === "SGUARDI"),
    [events]
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
          <Banner type="incontri" events={incontri} />
          <Banner type="confronti" events={confronti} />
          <Banner type="sguardi" events={sguardi} />
        </Stack>
      </WhitePaper>
    </>
  );
}
