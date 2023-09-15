export const isIOS =
  window.navigator.userAgent &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent);

export function getRem() {
  return Number.parseFloat(getComputedStyle(document.body).fontSize);
}
