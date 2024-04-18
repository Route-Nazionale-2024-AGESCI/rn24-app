import React, { useState } from "react";
import Box from "@mui/material/Box";
import { QrReader } from "react-qr-reader";

export default function ScansionaQr() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const addContactToAddressBook = (info) => {
    console.log(info);
  };

  const handleScan = (data, error) => {
    if (data) {
      try {
        setData(data.text);
        //console.dir(data.text);
        const contactInfo = JSON.parse(data.text);
        if (
          contactInfo.nome &&
          contactInfo.cognome &&
          contactInfo.telefono &&
          contactInfo.email
        ) {
          addContactToAddressBook(contactInfo);
        } else {
          throw new Error(
            "Il QR Code scansionato non contiene le informazioni di contatto corrette."
          );
        }
      } catch (err) {
        // Gestisci gli errori di parsing del JSON
        setError(err.message);
      }
    }
    if (error) {
      setError(error.message);
    }
  };

  const handleError = (err) => {
    // Gestisci gli errori di lettura del QR Code
    setError(err.message);
  };

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //   }}
    // >*}
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "8px",
        borderRadius: "8px",
        width: "300px",
        height: "300px",
      }}
    >
      {!data && !error && (
        <QrReader
          delay={300}
          // onError={handleError}
          onResult={handleScan}
          //style={{ width: "300px", height: "300px" }}
        />
      )}
      {data && (
        <div>
          <p>{data}</p>
        </div>
      )}
      {error && (
        <div>
          <p>Errore: {error}</p>
        </div>
      )}
      {(error || data) && (
        <button
          onClick={() => {
            setError(null);
            setData(null);
          }}
        >
          Riprova
        </button>
      )}
    </Box>
    // </div>
  );
}
