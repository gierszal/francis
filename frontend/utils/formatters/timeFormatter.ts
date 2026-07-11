export const timeFormatter = (totalSeconds: number | undefined) => {
  if (!totalSeconds) return;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return [minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
};
