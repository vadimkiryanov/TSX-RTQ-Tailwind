// Создание кастомного хука debounce
import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 500): string => {
  // Состояние
  const [debounced, setDebounced] = useState(value);

  // uef
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
      console.log('Произошел debounce');
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  // return
  return debounced;
};
