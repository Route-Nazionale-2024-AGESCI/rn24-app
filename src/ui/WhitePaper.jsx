import Box from "@mui/material/Box";

export default function WhitePaper({ children, sx = {} }) {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "16px 16px 0 0",
        mt: "16px",
        marginBottom: "-80px",
        pt: "40px",
        pb: "80px",
        minHeight: `calc(100vh - 318px)`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
