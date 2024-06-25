export default function getEventColor(kind) {
  switch (kind) {
    case "ALTRO":
      return {
        main: "agesciGreen.main",
        bg: "#EBF6F0",
      };
    case "SGUARDI":
    case "INCONTRI":
    case "CONFRONTI":
    case "TRACCE":
      return {
        main: "agesciPurple.main",
        bg: "#E2DCEA",
      };
    case "PASTI":
      return {
        main: "agesciYellow.main",
        bg: "#F5E7D3",
      };
    case "DOCCIA":
      return {
        main: "agesciBlue.main",
        bg: "#E6F7FC",
      };
    case "LOGISTICO":
      return {
        main: "agesciRed.main",
        bg: "#FDEEEE",
      };
    default:
      return {
        main: "#000000",
        bg: "#FFFFFF",
      };
  }
}
