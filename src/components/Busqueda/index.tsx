import { useCallback, useEffect, useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleOutline from "@mui/icons-material/PauseCircleOutline";
import Box from "@mui/material/Box";

import { getToken } from "services/getToken";
import { opertionSearch } from "services/operations";

import "./index.css";

import {
  IconButton,
  InputBase,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";

import { Tracks } from "models";
import { Control } from "./ControlBar";
import { Search as SearchIcon } from "@mui/icons-material";

export default function Busqueda() {
  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState<Tracks>();
  const [loading, setLoading] = useState(false);
  const [play, setPlay] = useState(false);
  const [busco, setBusco] = useState("Busca la cancion que quieras");
  const [trackIndex, setTrackIndex] = useState<number>(-1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setLoading(true);
    getToken()
      .then((token) => {
        localStorage.setItem("token", token);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const lastIndex = useRef<number>();
  useEffect(
    () => () => {
      lastIndex.current = trackIndex;
    },
    [trackIndex]
  );
  const track = tracks?.items?.[trackIndex];
  const tracksLength = tracks?.items.length || 0;
  const onNext = useCallback(() => {
    const nextIndex = trackIndex + 1;
    setTrackIndex(nextIndex > tracksLength ? 0 : nextIndex);
  }, [trackIndex, tracksLength]);
  const onBack = useCallback(() => {
    const backIndex = trackIndex - 1;
    setTrackIndex(backIndex < 0 ? tracksLength - 1 : backIndex);
  }, [trackIndex, tracksLength]);
  const onPlay = useCallback(() => {
    setPlay(true);
    audioRef.current?.play();
  }, []);
  const onPause = useCallback(() => {
    setPlay(false);
    audioRef.current?.pause();
  }, []);
  useEffect(() => {}, [search]);
  useEffect(() => {
    if (track && audioRef.current) {
      if (track.preview_url) {
        audioRef.current.currentTime = 0;
        onPlay();
      } else {
        const last = lastIndex.current;
        if (typeof last !== "number") return;
        const timeout = window.setTimeout(() => {
          if (last > trackIndex) onBack();
          else onNext();
        }, 5000);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [onBack, onNext, onPlay, track, trackIndex]);
  return (
    <>
      <div className="buscador">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          onSubmit={(e: any) => {
            e.preventDefault();
            setLoading(true);
            opertionSearch(search, {
              limit: 20,
            })
              .then((res) => {
                setTracks(res.tracks);
                if (res.tracks.items.length > 0) {
                  setBusco("Valores Correctos");
                } else {
                  setBusco("No se encontraron valores");
                }
              })
              .finally(() => {
                setLoading(false);
                setSearch("");
              });
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Busca una cancion o cantante"
            inputProps={{ "aria-label": "search google maps" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      {loading && <div>Cargando...</div>}
      {tracks?.items.length && busco ? (
        <MenuList>
          {tracks.items.map((track, i) => {
            const selected = trackIndex === i;
            return (
              <MenuItem
                key={track.id}
                selected={selected}
                onClick={() => {
                  setTrackIndex(i);
                  if (selected) {
                    if (play) {
                      onPause();
                    } else {
                      onPlay();
                    }
                  }
                }}
              >
                <ListItemIcon>
                  {selected && play ? (
                    <PauseCircleOutline sx={{ height: 38, width: 38 }} />
                  ) : (
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
                </ListItemIcon>
                <ListItemText>{track.name}</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  {track.artists[0].name}
                </Typography>
              </MenuItem>
            );
          })}
          <Box sx={{ heigth: "400px" }} />
          <Control
            play={play}
            track={track}
            audioRef={audioRef}
            onNext={() => onNext()}
            onBack={() => onBack()}
            onPause={onPause}
            onPlay={onPlay}
          />
        </MenuList>
      ) : (
        <div className="respuesta">{busco}</div>
      )}
    </>
  );
}
