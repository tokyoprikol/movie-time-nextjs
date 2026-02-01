export function calculateAge(date: string) {
  if (date) {
    const today = new Date();
    const birthDate = new Date(date);

    let ageDiff = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      ageDiff--;
    }

    return ageDiff;
  }
}
