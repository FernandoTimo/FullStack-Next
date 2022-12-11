export default function minToHours(min = 600) {
  // retornar horas y minutos en formato 00:00 siempre con dos digitos
  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  return `${hours.toString().padStart(2, "0") + ":"}${minutes
    .toString()
    .padStart(2, "0")}`;
}
