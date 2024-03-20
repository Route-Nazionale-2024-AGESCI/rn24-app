import Fab from "@mui/material/Fab";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function FloatingActionButton() {
  return (
    <Fab
      color="agesciYellow"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "100px",
      }}
    >
      <PhotoCameraIcon sx={{ color: "#FFFFFF" }} />
    </Fab>
  );
}
