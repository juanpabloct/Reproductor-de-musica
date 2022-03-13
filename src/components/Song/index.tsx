import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleOutline from "@mui/icons-material/PauseCircleOutline";

import { Item } from "models";

import LinearProgressWithLabel from "components/Progress";
import { Grid } from "@mui/material";

interface MediaControlCardProps {
  song: Item;
  onClick: () => void;
  play: boolean;
  disabled?: boolean;
  onNext: () => void;
  onBack?: () => void;
  currentTime: number;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export default function MediaControlCard({
  song,
  onClick,
  play,
  disabled,
  onNext,
  onBack,
  currentTime,
  audioRef,
}: MediaControlCardProps) {
  const theme = useTheme();
  const { name } = song;

  return (
    <Card>
      <Grid container>
        <Grid item xs={5} container alignItems="center">
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
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
        </Grid>
        <Grid item xs>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
              height: "100%",
              alignContent: "center",
            }}
          >
            <IconButton aria-label="previous" onClick={() => onBack?.()}>
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton
              aria-label="play/pause"
              onClick={onClick}
              disabled={disabled}
            >
              {!play ? (
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <PauseCircleOutline sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton aria-label="next" onClick={onNext}>
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </Grid>
        <Grid>
          <CardMedia
            component="img"
            sx={{ maxHeight: 150, height: "100%", objectFit: "contain", px: 2 }}
            image={song.album.images[0].url}
            alt="Live from space album cover"
          />
        </Grid>
      </Grid>
      <Box sx={{ p: 2 }}>
        <LinearProgressWithLabel
          value={currentTime}
          duration={audioRef.current?.duration || 0}
          onChange={(value) => {
            if (audioRef.current) audioRef.current.currentTime = value;
          }}
        />
      </Box>
    </Card>
  );
}
