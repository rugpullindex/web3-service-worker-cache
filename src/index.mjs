// @format

class Web3Worker {
  async register() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./worker.mjs');
      } catch (err) {
        console.error(err);
      }
    } else {
      throw new Error('Service Worker not supported by browser');
    }
  }
}

export default Web3Worker;
