import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Item } from "models";
import PauseCircleOutline from "@mui/icons-material/PauseCircleOutline";

interface MediaControlCardProps {
  song: Item;
  onClick: () => void;
  paused: boolean;
}

export default function MediaControlCard({
  song,
  onClick,
  paused,
}: MediaControlCardProps) {
  const theme = useTheme();
  const { name } = song;
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {song.artists[0].name}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={onClick}>
            {!paused && <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
            {paused && <PauseCircleOutline sx={{ height: 38, width: 38 }} />}
            {(song.preview_url && <audio src={song.preview_url} />) ||
              "No disponible"}
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={song.album.images[0].url}
        alt="Live from space album cover"
      />
    </Card>
  );
}
