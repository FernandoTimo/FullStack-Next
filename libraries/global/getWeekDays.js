/**
 * ⚡ Function getWeekDays ⚡ devuelve un arreglo con los días de la semana eb distintos formatos
 * @param {String} format Formato de la fecha: "long" | "short" | "narrow" | "numeric" | "2-digit"
 * @returns
 */
export default function getWeekDays(format = "long") {
  const Dias_Semana = [
    { short: "l", medium: "lun", long: "lunes" },
    { short: "m", medium: "mar", long: "martes" },
    { short: "m", medium: "mie", long: "miércoles" },
    { short: "j", medium: "jue", long: "jueves" },
    { short: "v", medium: "vie", long: "viernes" },
    { short: "s", medium: "sab", long: "sábado" },
    { short: "d", medium: "dom", long: "domingo" },
  ];
  return Dias_Semana.map((dia) => dia[format]);
}
