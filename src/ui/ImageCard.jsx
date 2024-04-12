import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function ImageCard({ imgSrc, imgAlt, title, subtitle }) {
  return (
    <Card
      sx={{
        height: "120px",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <CardActionArea component={RouterLink} to="/tracce">
        <CardMedia
          component="image"
          image={imgSrc}
          title={imgAlt}
          sx={{
            height: "120px",
          }}
        >
          <CardContent
            sx={{
              background:
                "linear-gradient(180deg, rgba(64,64,64,0) 0%, rgba(30,30,30,1) 77%)",
              pr: "16px",
              pb: "16px",
              pl: "16px",
              pt: "44px",
            }}
          >
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
            <Typography sx={{ color: "#FFFFFF", fontSize: "12px" }}>
              {subtitle}
            </Typography>
          </CardContent>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
}
