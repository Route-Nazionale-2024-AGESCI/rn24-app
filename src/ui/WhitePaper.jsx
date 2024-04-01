import Box from "@mui/material/Box";

export default function WhitePaper({ children }) {
  return (
    <Box
      sx={{
        background: "white",
        // textAlign: "center",
        borderRadius: "16px 16px 0 0",
        mt: "16px",
        mb: "-20px",
        pt: "40px",
        height: `calc(100vh - 228px)`,
      }}
    >
      {children}
    </Box>
  );
}
