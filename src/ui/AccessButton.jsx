import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const AccessButton = styled(ButtonBase)(({ disabled }) => ({
  backgroundColor: "#ffffff",
  border: "2px solid black",
  padding: "12px 24px",
  borderRadius: "8px",
  marginTop: "40px",
  marginLeft: "auto",
  marginRight: "auto",
  //opacity: disabled ? 0.5 : 1,
  pointerEvents: disabled ? "none" : "auto",
}));

export default AccessButton;
