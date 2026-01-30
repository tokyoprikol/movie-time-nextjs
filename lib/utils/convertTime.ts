export function convertMinToHours(min: number | undefined) {
  if (min) {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours}h ${minutes}m`;
  }
}
