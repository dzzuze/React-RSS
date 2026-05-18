import { useState } from 'react';

interface UseLocalStorageProps {
  storageKey: string;
  initialValue: string;
}

export default function useLocalStorage({
  storageKey,
  initialValue,
}: UseLocalStorageProps): [string, (newValue: string) => void] {
  const [value, setValue] = useState(initialStorage);

  function initialStorage() {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? saved : initialValue;
  }

  function setNewValue(newValue: string) {
    localStorage.setItem(storageKey, newValue);
    setValue(newValue);
  }

  return [value, setNewValue];
}
