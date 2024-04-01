import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

const StyledTextField = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "label + p": {
    color: "#3333dd",
  },
  "& .MuiInputBase-input": {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    border: "1px solid",
    borderColor: theme.palette.agesciPurple.main,
    padding: "12px 16px",
    fontSize: "14px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.agesciPurple.main, 0.25)} 0 0 0 0.1rem`,
    },
  },
}));

export default function TextField(props) {
  return <StyledTextField fullWidth {...props} />;
}
