import { useEffect, useState } from "react";

export function useLocalStorageState<State>(initialState: State, key: string) {
  const [state, setState] = useState(() => {
    // Load from LS
    const stringState = localStorage.getItem(key);
    if (!stringState) return initialState;
    return JSON.parse(stringState) as State;
  });

  // Save to LS
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}
