import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {
  AddContactButton,
  BookletButton,
  QrCodeButton,
  RoutePlannerButton,
} from "../ui/CardButton";
import EventSummaryCard from "../ui/EventSummaryCard";
import AccessButton from "../ui/AccessButton";
import WhitePaper from "../ui/WhitePaper";

import {
  getEventList,
  useEventRegistrations,
} from "../lib/cacheManager/events";
import { useEventInvitations } from "../lib/cacheManager/events";
import { getLocationList } from "../lib/cacheManager/locations";

import { useUser } from "../lib/cacheManager/user";

import { getLocalStorageFirstName } from "../lib/shareContactInfo";

import HtmlWithRouterLinks from "../lib/htmlParser";
import { searchBySlug } from "../lib/cacheManager/pages";

export async function loader() {
  const { events } = await getEventList();
  const { locations } = await getLocationList();
  const news = await searchBySlug("news");
  return { events, locations, news };
}

const ThanksModal = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="thanks-dialog-title"
      slotProps={{
        backdrop: { style: { backgroundColor: "rgba(109, 80, 149, 0.3)" } },
      }}
    >
      <DialogTitle id="thanks-dialog-title" textAlign={"center"}>
        <Typography fontSize={"20px"} fontWeight={600}>
          La connettività durante l'evento Arena24 è offerta da AGSM AIM
        </Typography>
      </DialogTitle>
      <Box height="36px" />
      <DialogContent>
        <a href="https://www.agsmaim.it/" target="_blank" rel="noreferrer">
          <img
            alt="Logo AGSM AIM"
            src="/AGSMAIM.png"
            style={{
              width: "90%",
              maxWidth: "300px",
              height: "auto",
              marginRight: "auto",
              marginLeft: "auto",
              display: "block",
            }}
          />
        </a>
        <Box height="36px" />
        <DialogContentText
          sx={{
            textAlign: "center",
            fontSize: "16px",
            fontWeight: 400,
            color: "#000000",
          }}
        >
          {/* <Typography fontSize="16px" fontWeight={600} color="#000000">
            La connettività durante l'evento Arena Rn24 è offerta da AGSM AIM
          </Typography>
          <Box height="16px" /> */}
          {/* <Typography fontSize="16px" fontWeight={400} color="#000000"> */}
          Grazie al prezioso supporto di{" "}
          <a
            href="https://www.agsmaim.it/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#6D5095",
              fontWeight: 600,
            }}
          >
            AGSM AIM
          </a>{" "}
          la connettività è gratuita
          {/* </Typography> */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <AccessButton
          sx={{
            marginY: "16px",
            color: "agesciPurple.main",
            borderColor: "agesciPurple.main",
            width: "85%",
            maxWidth: "400px",
          }}
          onClick={onClose}
          autoFocus
        >
          <Typography
            fontSize="16px"
            fontWeight={600}
            color="agesciPurple.main"
          >
            Grazie!
          </Typography>
        </AccessButton>
      </DialogActions>
    </Dialog>
  );
};

export default function Home() {
  const { user } = useUser();
  const { events, locations, news } = useLoaderData();
  const { registrations } = useEventRegistrations();
  const [thanksShown, setThanksShown] = useState(
    localStorage.getItem("thanksShown") === "true"
  );
  const handleThanksClose = () => {
    setThanksShown(true);
    localStorage.setItem("thanksShown", "true");
  };
  useEventInvitations(); // caching locally
  const name = getLocalStorageFirstName() ?? user.first_name ?? "";
  // Nelle eventCards l'utente vede l'elenco degli eventi a cui parteciperà, presenti in registrations
  const buildEventCards = (events) => {
    const regUuid = registrations.map((reg) => reg.event);
    return events
      .filter((ev) => regUuid.includes(ev.uuid))
      .filter((ev) => {
        const endDt = new Date(ev.ends_at);
        const now = new Date();
        return endDt >= now;
      })
      .map((ev, index) => (
        <EventSummaryCard
          event={ev}
          location={locations.find((l) => l.uuid === ev.location)}
          key={index}
        />
      ));
  };
  return (
    <Box sx={{ mx: "24px" }}>
      <Typography variant="h6" fontSize="20px" fontWeight={900}>
        Ciao, {name}
      </Typography>
      <Typography variant="body1" fontSize="14px" fontWeight={400}>
        Bentornato nell'App RN24
      </Typography>
      <Box height="48px" />
      <AddContactButton />
      <Box height="32px" />
      <Typography variant="h5" fontSize="14px" fontWeight={800} mb="8px">
        Prossimi eventi
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflow: "auto",
          gap: "8px",
        }}
      >
        {buildEventCards(events)}
      </Box>
      <Box height="32px" />
      <Typography variant="h5" fontSize="14px" fontWeight={800} mb="8px">
        Materiali
      </Typography>
      <Stack direction="row" spacing="16px">
        <BookletButton />
        <QrCodeButton />
      </Stack>
      <Box height="32px" />
      <Typography variant="h5" fontSize="14px" fontWeight={800} mb="8px">
        La tua Route
      </Typography>
      <RoutePlannerButton />
      {news !== null && (
        <>
          <Box height="32px" />
          <Typography variant="h5" fontSize="14px" fontWeight={800} mb="8px">
            News
          </Typography>
          <Box
            sx={{
              background: "white",
              borderRadius: "16px 16px 0 0",
              mt: "16px",
              marginBottom: "-80px",
              pt: "24px",
              pb: "80px",
              px: "24px",
              // minHeight: `calc(100vh - 318px)`,
            }}
          >
            <div className="description-container">
              <HtmlWithRouterLinks htmlString={news.body} />
            </div>
          </Box>
        </>
      )}
      <Box sx={{ height: "40px" }} />
      {!thanksShown && (
        <ThanksModal open={!thanksShown} onClose={handleThanksClose} />
      )}
    </Box>
  );
}
