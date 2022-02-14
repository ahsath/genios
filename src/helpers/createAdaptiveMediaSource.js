export const createAdaptiveMediaSource = ({ thumbnail, ...rest }) => {
  const formats = Object.values(rest);
  const src = formats[0].url;
  const srcset = formats.map(({ url, width }) => `${url} ${width}w`).join();

  return {
    src,
    srcset,
  };
};
