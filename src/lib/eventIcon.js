import RestaurantIcon from "@mui/icons-material/Restaurant"; // pasti
import OpenWithIcon from "@mui/icons-material/OpenWith"; // logistico
import ShowerIcon from "@mui/icons-material/Shower"; // doccia
import SettingsIcon from "@mui/icons-material/Settings"; //altro
import CircleRoundedIcon from "@mui/icons-material/CircleRounded"; // confronti
import SquareRoundedIcon from "@mui/icons-material/SquareRounded"; // sguardi
import HexagonRoundedIcon from "@mui/icons-material/HexagonRounded"; // incontri
import ChangeHistoryRoundedIcon from "@mui/icons-material/ChangeHistoryRounded"; // tracce
export default function EventIcon({ kind, fontSize = "12px" }) {
  switch (kind) {
    case "SGUARDI":
      return <SquareRoundedIcon sx={{ fontSize }} />;
    case "INCONTRI":
      return <HexagonRoundedIcon sx={{ fontSize }} />;
    case "CONFRONTI":
      return <CircleRoundedIcon sx={{ fontSize }} />;
    case "TRACCE":
      return <ChangeHistoryRoundedIcon sx={{ fontSize }} />;
    case "PASTI":
      return <RestaurantIcon sx={{ fontSize }} />;
    case "DOCCIA":
      return <ShowerIcon sx={{ fontSize }} />;
    case "LOGISTICO":
      return <OpenWithIcon sx={{ fontSize }} />;
    case "ALTRO":
    default:
      return <SettingsIcon sx={{ fontSize }} />;
  }
}
