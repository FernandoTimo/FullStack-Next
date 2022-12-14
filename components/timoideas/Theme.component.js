import { useEffect } from "react";
import style from "./Theme.module.css";
import Ligth from "public/theme/Ligth.json";
import Dark from "public/theme/Dark.json";
export default function Theme() {
  // Establecer valor inicial del tema con el LocalStorage o con el valor del sistema
  useEffect(() => {
    !!localStorage.Theme
      ? setRoot(localStorage.Theme === "Dark" ? Dark : Ligth)
      : setSystem();
  }, []);
  const setRoot = (obj) => {
    Object.keys(obj).map((key) => {
      document.documentElement.style.setProperty(key, obj[key]);
    });
  };
  // Establecer tema oscuro
  const setDark = () => {
    localStorage.Theme = "Dark";
    setRoot(Dark);
  };
  // Establecer tema claro
  const setLigth = () => {
    localStorage.Theme = "Ligth";
    setRoot(Ligth);
  };
  // Establecer tema con los valores del sistema
  const setSystem = () => {
    let sysPref = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      e.matches ? setDark() : setLigth();
    };
    sysPref.removeEventListener("change", handler);
    sysPref.addEventListener("change", handler);
    handler(sysPref);
  };
  // Toggle de tema al presionar alt + | o sus teclas equivalentes
  useEffect(() => {
    const toggleTheme = (e) => {
      if (
        (e.keyCode === 220 && e.altKey) ||
        (e.keyCode === 192 && e.altKey) ||
        (e.keyCode === 220 && e.metaKey) ||
        (e.keyCode === 192 && e.metaKey)
      ) {
        localStorage.Theme === "Dark" ? setLigth() : setDark();
      }
    };
    window.addEventListener("keydown", toggleTheme);
    return () => {
      window.removeEventListener("keydown", toggleTheme);
    };
  }, []);

  return (
    <div className={style.Container}>
      <div className={style.Theme}>
        <span onClick={setLigth}>🌖</span>
        <span onClick={setDark}>🌒</span>
      </div>
    </div>
  );
}
