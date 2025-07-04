function saveOptions(e) {
    e.preventDefault();
    let selectedLanguagesString = document.querySelector("#selectedLanguages").value;
    let selectedLanguages = selectedLanguagesString.replace(/\s/g, "").split(",").filter(code => code.length);

    let displayMode = document.querySelector('input[name="displayMode"]:checked').value;

    let customLabels = {};
    if (displayMode === "custom") {
        document.querySelectorAll(".custom-label-input").forEach(input => {
            const code = input.dataset.langCode;
            const value = input.value.trim();
            if (value) customLabels[code] = value;
        });
    }

    browser.storage.sync.set({
        selectedLanguages: selectedLanguages,
        displayMode: displayMode,
        customLabels: customLabels,
    });
}

function generateCustomLabelInputs(languageCodes, savedLabels = {}) {
    const container = document.querySelector("#customLabelInputs");
    container.textContent = "";
    const note = document.createElement("p");
    note.dataset.i18n = "customLabelNote";
    note.textContent = browser.i18n.getMessage("customLabelNote");
    container.appendChild(note);
    languageCodes.forEach(code => {
        const row = document.createElement("div");
        row.style.display = "grid";
        row.style.gridTemplateColumns = "3em 1fr";
        row.style.alignItems = "center";
        row.style.marginBottom = "6px";

        const label = document.createElement("label");
        label.textContent = `${code}: `;
        label.style.textAlign = "right";
        label.style.marginRight = "0.5em";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = code;
        input.value = savedLabels[code] || "";
        input.className = "custom-label-input";
        input.dataset.langCode = code;
        input.style.width = "10em";

        row.appendChild(label);
        row.appendChild(input);
        container.appendChild(row);
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        const selectedLanguages = result.selectedLanguages || [];
        const displayMode = result.displayMode || "native";
        const customLabels = result.customLabels || {};

        if (selectedLanguages.length) {
            let selectedLanguagesString = selectedLanguages.join(", ");
            document.querySelector("#selectedLanguages").value = selectedLanguagesString;
        }

        let modeInput = document.querySelector(`input[name="displayMode"][value="${displayMode}"]`);
        if (modeInput) modeInput.checked = true;

        if (displayMode === "custom") {
            document.querySelector("#customLabelSection").style.display = "block";
            generateCustomLabelInputs(selectedLanguages, customLabels);
        }
    }

    function onError(error) {
        console.error(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get(["selectedLanguages", "displayMode", "customLabels"]);
    getting.then(setCurrentChoice, onError);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = browser.i18n.getMessage(key);
    });
    document.querySelectorAll("[data-i18n-value]").forEach(el => {
        const key = el.dataset.i18nValue;
        el.value = browser.i18n.getMessage(key);
    });
}

function handleDisplayModeChange() {
    const displayMode = document.querySelector('input[name="displayMode"]:checked').value;
    const customSection = document.querySelector("#customLabelSection");
    if (displayMode === "custom") {
        customSection.style.display = "block";
        const selectedLanguagesString = document.querySelector("#selectedLanguages").value;
        const selectedLanguages = selectedLanguagesString.replace(/\s/g, "").split(",").filter(code => code.length);
        generateCustomLabelInputs(selectedLanguages);
    } else {
        customSection.style.display = "none";
    }
}

function handleLanguageInputChange() {
    const displayMode = document.querySelector('input[name="displayMode"]:checked').value;
    if (displayMode === "custom") {
        const selectedLanguagesString = document.querySelector("#selectedLanguages").value;
        const selectedLanguages = selectedLanguagesString.replace(/\s/g, "").split(",").filter(code => code.length);
        generateCustomLabelInputs(selectedLanguages);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    restoreOptions();
    document.querySelector("form").addEventListener("submit", saveOptions);
    document.querySelectorAll('input[name="displayMode"]').forEach(input =>
        input.addEventListener("change", handleDisplayModeChange)
    );
    document.querySelector("#selectedLanguages").addEventListener("input", handleLanguageInputChange);
});
