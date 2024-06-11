import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

const NewScanStyledButton = styled(ButtonBase)(() => ({
  backgroundColor: "transparent",
  border: "2px solid white",
  padding: "12px 24px",
  borderRadius: "8px",
  marginTop: "40px",
  marginLeft: "auto",
  marginRight: "auto",
  color: "white",
  maxWidth: "400px",
  width: "86%",
}));

const NewScanButton = () => {
  const navigate = useNavigate();
  return (
    <NewScanStyledButton onClick={() => navigate("..", { relative: "path" })}>
      <Typography fontSize="16px" fontWeight={600}>
        Effettua Nuova scansione
      </Typography>
    </NewScanStyledButton>
  );
};

export default function MainContainer({ children, scanButton = true }) {
  return (
    <Box
      sx={{
        flexGrow: "1",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
        }}
      >
        {children}
      </Box>
      {scanButton && (
        <Box>
          <NewScanButton />
        </Box>
      )}
      <Box sx={{ height: "100px" }} />
    </Box>
  );
}
