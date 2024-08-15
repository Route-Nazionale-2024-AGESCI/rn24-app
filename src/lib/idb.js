export function saveData(key, value) {
  const request = indexedDB.open("rn24db", 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    if (!db.objectStoreNames.contains("myStore")) {
      db.createObjectStore("myStore", { keyPath: "key" });
    }
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["myStore"], "readwrite");
    const store = transaction.objectStore("myStore");

    store.put({ key, value });

    transaction.oncomplete = function () {
      console.log("Dati salvati con successo!");
    };

    transaction.onerror = function () {
      console.log("Errore durante il salvataggio dei dati.");
    };
  };

  request.onerror = function () {
    console.log("Errore durante l'apertura del database.");
  };
}

export function getData(key) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("rn24db", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("myStore")) {
        db.createObjectStore("myStore", { keyPath: "key" });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["myStore"], "readonly");
      const store = transaction.objectStore("myStore");
      const getRequest = store.get(key);

      getRequest.onsuccess = function () {
        if (getRequest.result) {
          resolve(getRequest.result.value);
        } else {
          resolve(null); // Chiave non trovata
        }
      };

      getRequest.onerror = function () {
        reject("Errore durante il recupero dei dati.");
      };
    };

    request.onerror = function () {
      reject("Errore durante l'apertura del database.");
    };
  });
}
