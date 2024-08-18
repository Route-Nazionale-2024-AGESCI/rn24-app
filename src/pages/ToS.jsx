import WhitePaper from "../ui/WhitePaper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// TODO: richiedere contenuto alla pattuglia competente
export default function ToS({ onClose, onAccept }) {
  return (
    <>
      <Typography
        fontSize={"25px"}
        fontWeight={900}
        ml={"16px"}
        color={"#2B2D2B"}
        alignSelf={"start"}
        sx={{
          width: "80%",
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        Termini e Condizioni dell'utilizzo dell'App RN24
      </Typography>
      <WhitePaper
        sx={{
          paddingX: "24px",
          paddingTop: "20px",
          paddingBottom: "20px",
          width: "80%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: `calc(100vh - 300px)`,
          overflowY: "auto",
        }}
      >
        <Box>
          <section id="titolare">
            <Typography variant="h4">
              Titolare dell'App e dei relativi Servizi
            </Typography>
            <Typography variant="body1">
              Il Titolare del trattamento è AGESCI - Associazione Guide e Scouts
              Cattolici Italiani, con sede legale in Roma, Piazza Pasquale
              Paoli, 18.
            </Typography>
          </section>
          <section id="accesso-servizi">
            <Typography variant="h4">Accesso ai Servizi</Typography>
            <Typography variant="body1">
              L’applicazione è pensata e riservata ai partecipanti, al personale
              di servizio e agli ospiti dell’evento Arena24. Pertanto, non è
              possibile registrarsi e usufruire dei servizi dell’applicazione
              senza un profilo A.G.E.S.C.I. È responsabilità dei partecipanti
              mantenere riservate le proprie credenziali di accesso, utilizzarle
              esclusivamente personalmente e non cederle a terzi e segnalare
              qualsiasi uso improprio.
            </Typography>
          </section>
          <section id="servizi">
            <Typography variant="h4">Identificazione dei Servizi</Typography>
            <Typography variant="body1">
              I Servizi accessibili dall'App, a titolo esemplificativo e non
              esaustivo, sono i seguenti:
              <ul>
                <li>
                  Prenotare, cancellare o modificare l’iscrizione ad eventi a
                  partecipazione personale
                </li>
                <li>Visualizzare il programma dell’evento</li>
                <li>Aprire il libretto digitale dell’evento</li>
                <li>
                  Mostrare la mappa dell’evento con tutte le posizioni delle
                  varie attività
                </li>
                <li>
                  Accedere a contenuti aggiuntivi tramite la lettura di codici
                  QR situati all’interno dell’Evento
                </li>
                <li>
                  Consultare pagine specifiche contenenti informazioni
                  aggiuntive, indicazioni di sicurezza o nozioni sui propri
                  turni di servizio
                </li>
                <li>
                  Controllare per finalità di sicurezza l’accesso a determinate
                  aree
                </li>
                <li>
                  Condividere attraverso la lettura di codici QR informazioni di
                  contatto e altre informazioni che i singoli partecipanti
                  decideranno di voler condividere
                </li>
                <li>
                  Accedere a materiale multimediale messo a disposizione dai
                  relatori degli eventi
                </li>
              </ul>
            </Typography>
          </section>
          <section id="siti-terzi">
            <Typography variant="h4">Collegamento a siti di terzi</Typography>
            <Typography variant="body1">
              L’Applicazione potrebbe contenere collegamenti a siti/applicazioni
              di terzi. Il Titolare non esercita alcun controllo su di essi e,
              pertanto, non è in alcun modo responsabile per i contenuti di
              questi siti/applicazioni. Alcuni di questi collegamenti potrebbero
              rinviare a siti/applicazioni di terzi che forniscono servizi
              attraverso l’Applicazione. In questi casi, ai singoli servizi si
              applicheranno le condizioni generali per l’uso del
              sito/applicazione e per la fruizione del servizio predisposte dai
              terzi, rispetto alle quali il Titolare non assume alcuna
              responsabilità.
            </Typography>
          </section>
          <section id="privacy">
            <Typography variant="h4">Privacy</Typography>
            <Typography variant="body1">
              La tutela e il trattamento dei dati personali avverranno in
              conformità all’Informativa Privacy, che può essereconsultata alla
              pagina{" "}
              <a
                href="https://www.agesci.it/privacy/"
                target="_blank"
                rel="noreferrer"
              >
                https://www.agesci.it/privacy/
              </a>
            </Typography>
          </section>
          <section id="foro-competente">
            <Typography variant="h4">
              Legge applicabile e foro competente
            </Typography>
            <Typography variant="body1">
              Le Condizioni sono soggette alla legge italiana. Per ogni
              controversia relativa alla applicazione, esecuzione e
              interpretazione delle presenti Condizioni è competente il foro del
              luogo in cui si trova la sede legale del Titolare.
            </Typography>
          </section>
        </Box>
        <Stack direction="row" justifyContent="end" gap="20px">
          <Button
            color="agesciPurple"
            variant="outlined"
            disableElevation
            onClick={onClose}
            sx={{
              width: "100px",
              alignSelf: "end",
              textTransform: "none",
            }}
          >
            Chiudi
          </Button>
          <Button
            color="agesciPurple"
            variant="contained"
            disableElevation
            onClick={onAccept}
            sx={{
              width: "100px",
              alignSelf: "end",
              textTransform: "none",
            }}
          >
            Accetto
          </Button>
        </Stack>
      </WhitePaper>
    </>
  );
}
