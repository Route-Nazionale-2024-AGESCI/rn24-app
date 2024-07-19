// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import AccessButton from "./AccessButton";

import { useAuth } from "../contexts/auth";

export default function LogoutModal({ open, onClose }) {
  const { logOut } = useAuth();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      slotProps={{
        backdrop: { style: { backgroundColor: "rgba(109, 80, 149, 0.3)" } },
      }}
    >
      <DialogTitle id="logout-dialog-title" textAlign={"center"}>
        <Typography fontSize={"20px"} fontWeight={600}>
          Vuoi davvero disconnetterti dall'App?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ fontSize: "16px", color: "#000000", textAlign: "center" }}
        >
          Per poter usare nuovamente l'App dovrai riconnetterti: ti serviranno
          una connessione internet, il tuo codice socio e la tua password
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button autoFocus onClick={onClose}>
          <Typography
            fontSize="16px"
            fontWeight={400}
            color="agesciPurple.main"
          >
            Annulla
          </Typography>
        </Button> */}
        <AccessButton
          sx={{
            marginY: "16px",
            color: "agesciRed.main",
            borderColor: "agesciRed.main",
            width: "85%",
            maxWidth: "400px",
          }}
          onClick={() => {
            localStorage.removeItem("thanksShown");
            logOut();
          }}
          autoFocus
        >
          <Typography fontSize="16px" fontWeight={600} color="agesciRed.main">
            Esci
          </Typography>
        </AccessButton>
      </DialogActions>
    </Dialog>
  );
}
