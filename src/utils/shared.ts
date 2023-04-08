export const isIOS =
  window.navigator.userAgent &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent);

export function getRem() {
  return parseFloat(getComputedStyle(document.body).fontSize);
}
