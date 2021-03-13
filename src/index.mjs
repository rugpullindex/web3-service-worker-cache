// @format
import pkg from "../package.json";
import { basename } from "./utils.mjs";

class Web3Worker {
  async register() {
    if ("serviceWorker" in navigator) {
      const sw = basename(pkg.main);

      try {
        await navigator.serviceWorker.register(`./${sw}`);
      } catch (err) {
        console.error(err);
      }
    } else {
      throw new Error("Service Worker not supported by browser");
    }
  }
}

export default Web3Worker;
