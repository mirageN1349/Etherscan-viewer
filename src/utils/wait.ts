export const wait = (msc: number) => {
  return new Promise(res => setTimeout(res, msc));
};
