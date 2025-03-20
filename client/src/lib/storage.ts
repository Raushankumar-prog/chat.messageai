export const getLocalStorage = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return ;
  localStorage.setItem(key, value);
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};