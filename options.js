function saveOptions(e) {
    e.preventDefault();
    let selectedLanguagesString = document.querySelector("#selectedLanguages").value;
    let selectedLanguages = selectedLanguagesString.replace(/\s/g, "").split(",");

    browser.storage.sync.set({
        selectedLanguages: selectedLanguages,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        if (result.selectedLanguages) {
            let selectedLanguagesString = result.selectedLanguages.join(", ");
            document.querySelector("#selectedLanguages").value = selectedLanguagesString;
        }
    }

    function onError(error) {
        console.error(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("selectedLanguages");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
