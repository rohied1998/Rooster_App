function GetFromStorage(itemToGet) {
    const storageObject = localStorage.getItem(itemToGet);
    if (!storageObject) {
        return null;
    }

    // Parse het json object uit de storage
    return JSON.parse(storageObject);
}

function PutInStorage(itemToStore, value) {

    // Maak een string van het JS object
    const stringified = JSON.stringify(value);

    // Sla op
    localStorage.setItem(itemToStore, stringified);

    return true;
}