import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyToClipboardButton = ({ text, message}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(true);
    navigator.clipboard.writeText(text);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <IconButton
        sx={{
          my: "-10px",
          p: "10px",
          color: "#666A66",
          "& svg": {
            fontSize: "1.2rem",
          },
        }}
        onClick={handleClick}
        color="primary"
      >
        <ContentCopyIcon />
      </IconButton>
      <Snackbar
        message={ message || "Copiato negli appunti."}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default CopyToClipboardButton;
