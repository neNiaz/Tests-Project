export function startTimer(updateCallback) {
  const startTime = Date.now();
  const intervalId = setInterval(() => {
    const diff = Date.now() - startTime;
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / 60000);
    updateCallback(minutes, seconds);
  }, 1000);
  return { intervalId, startTime };
}

export function formatTime(minutes, seconds) {
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
