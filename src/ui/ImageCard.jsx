import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ImageCard({ imgSrc, imgAlt, title, subtitle }) {
  return (
    <Card
      sx={{
        height: "120px",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <CardActionArea>
        {/*
            Put gradient from alpha 0 #404040 to alpha 100 #1e1e1e at 77%
        */}
        <CardMedia
          image={imgSrc}
          title={imgAlt}
          style={{
            background:
              "linear-gradient(180deg, rgba(64,64,64,0) 0%, rgba(30,30,30,1) 77%)",
          }}
          sx={{
            height: "120px",
          }}
        >
          <CardContent
            sx={{
              border: "1px solid red",
              pr: "16px",
              pb: "16px",
              pl: "16px",
              pt: "44px",
            }}
          >
            <Typography
              sx={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 600 }}
            >
              {title}
            </Typography>
            <Typography sx={{ color: "#FFFFFF", fontSize: "14px" }}>
              {subtitle}
            </Typography>
          </CardContent>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
}
