import Box from "@mui/material/Box";

export default function WhitePaper({ children, sx = {} }) {
  return (
    <Box
      sx={{
        background: "white",
        // textAlign: "center",
        borderRadius: "16px 16px 0 0",
        mt: "16px",
        mb: "-20px",
        pt: "40px",
        pb: "80px",
        minHeight: `calc(100vh - 348px)`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
