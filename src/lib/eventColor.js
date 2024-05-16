export default function getEventColor(kind) {
  switch (kind) {
    case "TRACCE":
      return {
        main: "agesciGreen.main",
        bg: "#EBF6F0",
      };
    case "SGUARDI":
      return {
        main: "agesciYellow.main",
        bg: "#F5E7D3",
      };
    case "INCONTRI":
      return {
        main: "agesciRed.main",
        bg: "#FDEEEE",
      };
    case "CONFRONTI":
      return {
        main: "agesciPurple.main",
        bg: "#E2DCEA",
      };
    case "ALTRO":
      return {
        main: "agesciBlue.main",
        bg: "#caf0f8",
      };
    default:
      return {
        main: "#000000",
        bg: "#FFFFFF",
      };
  }
}
