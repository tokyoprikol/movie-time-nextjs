export function getPoster(size: string = "w500", path: string) {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
