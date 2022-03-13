import { Slider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ProgressProps {
  value: number;
  duration: number;
  onChange: (value: number) => void;
}

export default function Progress({ value, duration, onChange }: ProgressProps) {
  const theme = useTheme();
  return (
    <Slider
      aria-label="time-indicator"
      size="small"
      value={value}
      min={0}
      step={1}
      max={duration}
      onChange={(_, value) => onChange(value as number)}
      sx={{
        color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
        height: 4,
        "& .MuiSlider-thumb": {
          width: 8,
          height: 8,
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          "&:before": {
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
          },
          "&:hover, &.Mui-focusVisible": {
            boxShadow: `0px 0px 0px 8px ${
              theme.palette.mode === "dark"
                ? "rgb(255 255 255 / 16%)"
                : "rgb(0 0 0 / 16%)"
            }`,
          },
          "&.Mui-active": {
            width: 20,
            height: 20,
          },
        },
        "& .MuiSlider-rail": {
          opacity: 0.28,
        },
      }}
    />
  );
}
