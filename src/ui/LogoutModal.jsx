import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { useAuth } from "../contexts/auth";

export default function LogoutModal({ open, onClose }) {
  const { logOut } = useAuth();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="logout-dialog-title">
      <DialogTitle id="logout-dialog-title">
        <Typography
          fontSize={"20px"}
          fontWeight={600}
          color={"agesciPurple.main"}
        >
          Vuoi davvero disconnetterti dall'App?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography fontSize="14px" fontWeight={400} color="#2B2D2B">
            Per poter usare nuovamente l'App dovrai riconnetterti: ti serviranno
            una connessione internet, il tuo codice socio e la tua password
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          <Typography
            fontSize="16px"
            fontWeight={400}
            color="agesciPurple.main"
          >
            Annulla
          </Typography>
        </Button>
        <Button
          onClick={() => {
            logOut();
          }}
          autoFocus
        >
          <Typography fontSize="16px" fontWeight={600} color="agesciRed.main">
            Esci
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
