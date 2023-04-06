import Loadeer from "loadeer";

export function install() {
  const loadeer = new Loadeer();
  loadeer.observe();
}
