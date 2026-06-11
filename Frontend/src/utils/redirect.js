export const redirect = (navigate, path, delay = 0) => {
  return setTimeout(() => {
    document.startViewTransition(() => {
      navigate(path);
    });
  }, delay);
};
