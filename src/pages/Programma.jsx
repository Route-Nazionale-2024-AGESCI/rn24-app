import { useState } from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

import WhitePaper from "../ui/WhitePaper";

import { useEventList } from "../lib/hooks/events";
import { useLocations } from "../lib/hooks/locations";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: "6px", //theme.spacing(0.5),
    padding: "8px 20px",
    border: 0,
    //border: "1px solid green",
    // color: "agesciPurple",
    // bgColor: "#555555",
    //lineHeight: "16px",
    borderRadius: "8px",
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      //marginLeft: -1,
      //borderLeft: "1px solid transparent",
    },
}));

export default function Programma() {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const minDate = "2024-08-22";
  const maxDate = "2024-08-25";

  const [selectedDay, setSelectedDay] = useState(() => {
    const currentDate = getCurrentDate();
    return currentDate >= minDate && currentDate <= maxDate
      ? currentDate
      : minDate;
  });
  const events = useEventList();
  const locations = useLocations();

  const handleChangeDay = (event, newDay) => {
    if (newDay !== null) {
      setSelectedDay(newDay);
    }
  };

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
      <WhitePaper>
        {/* <Stack gap="12px" sx={{ marginX: "24px" }}></Stack> */}
        <StyledToggleButtonGroup
          size="small"
          value={selectedDay}
          exclusive
          onChange={handleChangeDay}
          aria-label="Giorno"
        >
          <ToggleButton
            value="2024-08-22"
            aria-label="22 agosto"
            color="agesciPurple"
          >
            <Stack direction={"column"}>
              <Typography>22</Typography>
              <Typography>AGO</Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton
            value="2024-08-23"
            aria-label="23 agosto"
            sx={{ bgcolor: "agesciPurple.main", color: "#ffffff" }}
          >
            <Stack direction={"column"}>
              <Typography>23</Typography>
              <Typography>AGO</Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton value="2024-08-24" aria-label="24 agosto">
            <Stack direction={"column"}>
              <Typography>24</Typography>
              <Typography>AGO</Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton value="2024-08-25" aria-label="25 agosto">
            <Stack direction={"column"}>
              <Typography>25</Typography>
              <Typography>AGO</Typography>
            </Stack>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </WhitePaper>
    </>
  );
}
