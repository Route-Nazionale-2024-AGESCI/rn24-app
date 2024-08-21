import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import { QrReader } from "react-qr-reader";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";

import { decodeQr, getCameraConstraints, QRCodeScanError } from "../lib/qr";
import MainContainer from "../ui/BadgeControl/MainContainer";

const NewScanStyledButton = styled(ButtonBase)(() => ({
  backgroundColor: "transparent",
  border: "2px solid black",
  padding: "12px 24px",
  borderRadius: "8px",
  marginTop: "40px",
  marginLeft: "auto",
  marginRight: "auto",
  color: "black",
  maxWidth: "400px",
  width: "86%",
}));

const ErrorAlert = ({ errorMsg, onClose }) => (
  <Fade in={errorMsg !== null}>
    <Alert
      severity="error"
      onClose={onClose}
      sx={{
        width: "80%",
        maxWidth: "400px",
        position: "fixed",
        bottom: "100px",
        left: "50%",
        translate: `calc(-50%)`, // - 16px)`,
        zIndex: "2000",
      }}
    >
      {errorMsg}
    </Alert>
  </Fade>
);

const UserInfo = ({ title, children, autoFormat = true }) => (
  <Stack direction="column" mt="12px">
    <Typography fontSize="14px" fontWeight={600}>
      {title}:
    </Typography>
    {autoFormat ? (
      <Typography
        variant="subtitle2"
        fontSize="12px"
        fontWeight={400}
        sx={{ color: "#666A66" }}
      >
        {children}
      </Typography>
    ) : (
      children
    )}
  </Stack>
);

export async function loader() {
  return null;
}
export default function SecurityScan() {
  const navigate = useNavigate();
  const [constraints, setConstraints] = useState();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCameraConstraints(setConstraints);
  }, []);

  useEffect(() => {
    if (error !== null) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleScan = (scanData) => {
    if (scanData) {
      try {
        const decodedQr = decodeQr(scanData.text);
        if (decodedQr.type === "badge") {
          setUser(decodedQr.userInfo);
        } else {
          setError("Il QR code scansionato non è un badge personale.");
        }
      } catch (error) {
        if (error instanceof QRCodeScanError) {
          setError(error.message);
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      {constraints && user === null && (
        <>
          <QrReader
            scanDelay={300}
            constraints={constraints}
            onResult={handleScan}
            videoStyle={{
              width: "180%",
              height: "180%",
              top: "-40%",
              left: "-40%",
            }}
            containerStyle={{
              borderRadius: "8px",
              border: "8px solid white",
              backgroundColor: "#000000",
              width: "300px",
              height: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Typography
            fontSize="16px"
            fontWeight={600}
            mt="24px"
            sx={{ textAlign: "center" }}
          >
            Inquadra il QR CODE del partecipante
          </Typography>
        </>
      )}
      {user !== null && (
        <MainContainer scanButton={false}>
          <Box
            sx={{
              color: "#2d2c2d",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CheckCircleOutlineIcon
              sx={{
                fontSize: "64px",
                mb: "24px",
                color: "agesciGreen.main",
              }}
            />
            <Typography
              fontSize="16px"
              fontWeight={600}
              mb="24px"
              sx={{ color: "agesciGreen.main", textAlign: "center" }}
            >
              Utente Registrato
            </Typography>
            <Accordion sx={{ maxWidth: "400px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Stack direction="row" alignItems="center">
                  <Box
                    sx={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#EBF6F0",
                      borderRadius: "200px",
                      mr: "16px",
                    }}
                  >
                    <PersonIcon
                      sx={{ fontSize: "16px", color: "agesciGreen.main" }}
                    />
                  </Box>
                  <Typography fontSize="16px" fontWeight={600}>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ textAlign: "left" }}>
                <UserInfo title="Gruppo">{user?.scoutGroup}</UserInfo>
                <UserInfo title="Regione">{user?.region}</UserInfo>

                <UserInfo title="Sottocampo, Contrada e Fila">
                  {user?.line}
                </UserInfo>
                <UserInfo title="Email" fullWidth>
                  {user?.email}
                </UserInfo>
                <UserInfo title="Numero" fullWidth>
                  {user?.phone}
                </UserInfo>
                {user?.squad && user?.squad.length > 0 && (
                  <UserInfo title="Pattuglie" fullWidth>
                    {user?.squad.map((s) => (
                      <Fragment key={s}>
                        {s}
                        <br />
                      </Fragment>
                    ))}
                  </UserInfo>
                )}
              </AccordionDetails>
            </Accordion>
            <NewScanStyledButton onClick={() => setUser(null)}>
              <Typography fontSize="16px" fontWeight={600}>
                Effettua Nuova scansione
              </Typography>
            </NewScanStyledButton>
          </Box>
        </MainContainer>
      )}
      <ErrorAlert errorMsg={error} onClose={() => setError(null)} />
    </>
  );
}
