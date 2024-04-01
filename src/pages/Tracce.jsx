import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import WhitePaper from "../ui/WhitePaper";
import CardButton from "../ui/CardButton";

export default function Tracce() {
  return (
    <>
      <Typography
        fontSize="25px"
        fontWeight={900}
        sx={{ ml: "24px", height: "40px" }}
      >
        Tracce
      </Typography>
      <WhitePaper>
        <Box
          sx={{
            //mt: "40px",
            mx: "24px",
          }}
        >
          <Typography fontSize="14px" fontWeight={800} sx={{ mb: "12px" }}>
            Dettagli del Servizio
          </Typography>
          <Typography fontSize="14px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            consequuntur impedit repellendus atque! Rem maiores velit mollitia
            illo repellendus, ipsam exercitationem a molestias voluptas ea
            asperiores eveniet esse! Nisi, eveniet!
          </Typography>
          <Box sx={{ height: "32px" }} />
          <Typography fontSize="14px" fontWeight={800} sx={{ mb: "12px" }}>
            Responsabile
          </Typography>
          <CardButton
            bgColor="agesciPurple"
            icon={<PersonAddAlt1Icon sx={{ ml: "4px" }} />}
            text={
              <Box>
                <Typography fontSize="14px" fontWeight={600}>
                  Giordano Maria Tristafrulli
                </Typography>
                <Typography fontSize="12px">+39 339 568 1234</Typography>
              </Box>
            }
          />
          <Box sx={{ height: "32px" }} />
          <Typography fontSize="14px" fontWeight={800} sx={{ mb: "12px" }}>
            Info Logistiche
          </Typography>
          <Paper sx={{ p: "12px" }} elevation={1}>
            <Stack direction="row" spacing="8px" alignItems="center">
              <PlaceIcon sx={{ fontSize: 14, color: "agesciPurple.main" }} />
              <Typography
                variant="subtitle2"
                fontSize="14px"
                fontWeight={600}
                textAlign="left"
                mb="4px"
                sx={{ color: "agesciPurple.main" }}
              >
                Indirizzo del servizio
              </Typography>
            </Stack>
            <Stack direction="row" spacing="8px" alignItems="center">
              <AccessTimeIcon sx={{ fontSize: 14, color: "#959695" }} />
              <Typography
                variant="subtitle2"
                fontSize="14px"
                fontWeight={400}
                textAlign="left"
                mb="4px"
                sx={{ color: "#959695" }}
              >
                10:00 - 12:00
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </WhitePaper>
    </>
  );
}
