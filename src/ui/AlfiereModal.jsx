import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AccessButton from "./AccessButton";

export default function AlfiereModal({ open, onClose, onYes, onNo }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alfiere-dialog-title"
      slotProps={{
        backdrop: { style: { backgroundColor: "rgba(109, 80, 149, 0.3)" } },
      }}
    >
      <DialogTitle id="alfiere-dialog-title" textAlign={"center"}>
        <Typography fontSize={"20px"} fontWeight={600}>
          Sei l'Artigiano di Futuro della tua Comunità Capi?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography fontSize={"16px"} fontWeight={400}>
          Gli Artigiani di Futuro sono due capi scelti dalla propria Comunità
          Capi per partecipare alle Botteghe di Futuro, luoghi di confronto dove
          portare il contributo del proprio percorso.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Stack
          direction={"column"}
          alignItems={"center"}
          spacing={"20px"}
          width="100%"
        >
          <AccessButton
            onClick={onYes}
            autoFocus
            sx={{
              my: "16px",
              py: "8px",
              width: "85%",
              maxWidth: "400px",
            }}
          >
            <Typography fontSize="16px" fontWeight={600}>
              Si
            </Typography>
          </AccessButton>
          <AccessButton
            sx={{
              my: "16px",
              py: "8px",
              border: "0",
              width: "85%",
              maxWidth: "400px",
            }}
            onClick={onNo}
          >
            <Typography fontSize="16px" fontWeight={600}>
              No
            </Typography>
          </AccessButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
