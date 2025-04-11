export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const setItem = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
