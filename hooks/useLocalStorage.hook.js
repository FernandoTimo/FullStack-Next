import { useEffect, useState } from "react";
/**
 * ⚡ Hoook useLocalStorage ⚡ Maneja el localStorage del navegador
 * @param {String} key Key del localStorage 🔥 requiered = true
 * @param {(String|Number|Array)} [value] Valor con el que se actualizará el item
 * @returns {String}
 */

export default function useLocalStorage(key, initialValue = "") {
  if (!key || typeof key != "string" || !!!key.trim()) {
    throw new Error(
      '⚡ useLocalStorage => Proporciona una key de tipo string como parámetro, ejemplo: useLocalStorage("key", "value") ⚡'
    );
  }
  const [storedValue, setStoredValue] = useState();
  useEffect(() => {
    try {
      if (!localStorage[key]) {
        localStorage[key] = JSON.stringify(initialValue);
        setStoredValue(initialValue);
      } else {
        setStoredValue(JSON.parse(localStorage[key]));
      }
    } catch (error) {
      setStoredValue(initialValue);
    }
  }, []);

  const setValue = (value) => {
    try {
      if (value instanceof Function) {
        setStoredValue((prev) => {
          const newValue = value(prev);
          localStorage[key] = JSON.stringify(newValue);
          return newValue;
        });
      } else {
        setStoredValue(value);
        localStorage[key] = value;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
