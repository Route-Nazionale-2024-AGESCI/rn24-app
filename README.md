# RN24

App mobile per la Route Nazionale Capi 2024.

## Tecnologie

L'App è sviluppata tramite framework [React](https://react.dev) come Single Page Web App.

Il routing lato client è gestito dal motore [React Router](https://reactrouter.com/en/main)

La libreria grafica adottata è [Material UI](https://mui.com/material-ui/), che permette di sviluppare e personalizzare facilmente componenti che si rifanno alle linee guida del [Material Design](https://m2.material.io) (attualmente alla versione 2)

Tramite l'uso di Service Worker l'App può essere installata sui dispositivi Android e iOS come Progressive Web App.

## Ambiente di sviluppo

### NodeJS

Per testare l'App in ambiente di sviluppo occorre avere installato **NodeJS** e **npm** (o _yarn_).
Per l'installazione di NodeJS e npm è possibile utilizzare lo strumento [_nvm_](https://github.com/nvm-sh/nvm).

Per utilizzare yarn, una volta installato npm, è sufficiente lanciare il comando

`npm install -g yarn`

che procederà all'installazione del package yarn a livello globale.

### Esecuzione locale

Per eseguire il server localmente in modalità di sviluppo:

1. clonare il repository ed aprire un terminale nella cartella root del progetto
2. installare le dipendenze

   `npm install`

   oppure

   `yarn install`

3. avviare il server di sviluppo

   `npm run start`

   oppure

   `yarn start`

## Ambiente di produzione

### Building

Per compilare e ottimizzare il codice pronto per l'ambiente di produzione, dopo aver installato le dipendenze, lanciare il comando

`npm run build`

oppure

`yarn build`

## Installazione mobile

Visitando la Web App su internet, i browser offrono la possibilità di installarla localmente, se la identificano come Progressive Web App.

Perché questo accada è necessario che siano attivi i Service Worker, cosa che accade in automatico in due casi:

1. il server e il client sono sulla stessa macchina ed il dominio dell'URL è quindi _localhost_
2. la connessione avviene tramite protocollo HTTPS

Di conseguenza, se si esegue localmente l'ambiente di sviluppo e si visita l'URL tramite un dispositivo mobile, l'App non verrà rilevata come installabile, perché il server di sviluppo utilizza il protocollo HTTP.

Puoi collegare la app ad un backend online, oppure puoi eseguire il backend nella tua macchina seguendo le istruzioni che trovi in https://github.com/Route-Nazionale-2024-AGESCI/rn24-backend

### Note

#### Qr Code

In ambiente di sviluppo React monta ogni componente 2 volte, per ragioni di debugging. Questo
sembra generare problemi con la libreria react-qr-reader che fornisce il componente per la scansione dei QR Code: in ambiente di sviluppo la WebCam non viene mai rilasciata e, nel caso venga rilevato un errore, anche premendo il button "Riprova" l'errore viene visualizzato nuovamente dopo pochi decimi di secondo.
Per testare appieno le funzionalità legate alla scansione dei QR Code in locale, eseguire una build e lanciare un server locale, disabilitando l'ambiente di sviluppo.
Esempio:

`yarn build`

`serve -s build`

(Per installare il package serve eseguire `npm i -g serve`)
