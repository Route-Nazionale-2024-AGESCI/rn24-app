import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import AccessButton from "../../ui/AccessButton";
import AlfiereModal from "../../ui/AlfiereModal";

export default function Banner({ type, event }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const title =
    type === "sguardi"
      ? "Sguardi"
      : type === "confronti"
      ? "Confronti"
      : "Incontri";

  let body =
    event !== undefined
      ? `Complimenti, hai già scelto l'evento di tipo ${title} a cui partecipare! Se vuoi modificarlo, clicca qui sotto.`
      : `Seleziona l'evento di tipo ${title} a cui partecipare!`;

  if (type === "incontri") {
    body += ` Se vuoi puoi anche visualizzare gli eventi di tipo Incontri che non necessitano di prenotazione: potrai visitare queste attività nel tempo che ti resta libero!`;
  }

  return (
    <>
      <Card
        elevation={0}
        sx={{
          px: "12px",
          py: "16px",
          borderRadius: "8px",
          border: "1px solid #E2DCEA",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography
          color="agesciPurple.main"
          fontSize="20px"
          fontWeight={900}
          sx={{ mb: "8px" }}
        >
          {title}
        </Typography>
        <Typography color="#2B2D2B" fontSize="16px">
          {body}
        </Typography>

        <AccessButton
          sx={{
            my: "16px",
            py: "8px",
            width: "100%",
            maxWidth: "400px",
          }}
          onClick={
            event !== undefined
              ? () => navigate(`/eventi/${event}`)
              : type === "incontri"
              ? () => setOpen(true)
              : type === "confronti"
              ? () => navigate("/progetta-route/confronti")
              : () => navigate("/progetta-route/sguardi")
          }
        >
          <Typography fontSize="16px" fontWeight={600}>
            {event !== undefined ? "Modifica Evento" : "Seleziona Evento"}
          </Typography>

        </AccessButton>
        {
            event !== undefined && (
              <AccessButton
                sx={{
                  my: "16px",
                  py: "8px",
                  width: "100%",
                  maxWidth: "400px",
                }}
                onClick={
                  type === "incontri"
                    ? () => setOpen(true)
                    : type === "confronti"
                    ? () => navigate("/progetta-route/confronti")
                    : () => navigate("/progetta-route/sguardi")
                }
              >
                <Typography fontSize="16px" fontWeight={600}>
                  Visualizza Lista Eventi
                </Typography>
              </AccessButton>
            )
          }
        {type === "incontri" && (
          <AccessButton
            sx={{
              py: "8px",
              mt: "16px",
              width: "100%",
              maxWidth: "400px",
              border: 0,
            }}
            onClick={() =>
              navigate("incontri?alfiere=false&registrationRequired=false")
            }
          >
            <Typography fontSize="16px" fontWeight={600}>
              Visualizza Incontri senza prenotazione
            </Typography>
          </AccessButton>
        )}
      </Card>
      {type === "incontri" && (
        <AlfiereModal
          open={open}
          onClose={() => setOpen(false)}
          onYes={() =>
            navigate("incontri?alfiere=true&registrationRequired=true")
          }
          onNo={() =>
            navigate("incontri?alfiere=false&registrationRequired=true")
          }
        />
      )}
    </>
  );
}
