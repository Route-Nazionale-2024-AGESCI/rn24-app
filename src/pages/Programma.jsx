import Typography from "@mui/material/Typography";

import WhitePaper from "../ui/WhitePaper";

import { useEventList } from "../lib/hooks/events";
import { useLocations } from "../lib/hooks/locations";

export default function Programma() {
  return (
    <>
      <Typography
        variant="h1"
        fontSize="25px"
        fontWeight={900}
        sx={{ margin: "16px" }}
      >
        Programma
      </Typography>
      <WhitePaper></WhitePaper>
    </>
  );
}
