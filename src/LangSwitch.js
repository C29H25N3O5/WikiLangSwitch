// All language list items
const languageLinks = Array.from(document.querySelectorAll('.interlanguage-link'));

// Searches the language dropdown for the list item containing the select language
function getLanguageUrl(dataCode) {
    let link = languageLinks.find(languageLink => {
        if (!languageLink.firstChild) return false;
        return languageLink.firstChild?.getAttribute("lang")?.toLowerCase() === dataCode.toLowerCase();
    });

    if (link) {
        return link.firstChild;
    }
}

// Logs an error when we could not retrieve the stored selected languages.
function onError(error) {
  console.error(`Error: ${error}`);
}

function showLabelsCommon(languageButton, selectedLanguages, margin, displayMode, customLabels = {}) {
    for (const selectedLanguage of selectedLanguages) {
        let urlElement = getLanguageUrl(selectedLanguage);

        if (urlElement) {
            let label;
            if (displayMode === "code") {
                label = selectedLanguage.toUpperCase();
            } else if (displayMode === "custom") {
                label = customLabels[selectedLanguage.toLowerCase()] || selectedLanguage.toUpperCase();
            } else {
                label = urlElement.innerText.trim();
            }

            let languageSelectionLabel = document.createElement('a');

            languageSelectionLabel.innerText = label;
            languageSelectionLabel.href = urlElement.href;
            languageSelectionLabel.style.cssText = `margin: ${margin};`
            let languageName = urlElement.innerText.trim();
            let rawTitle = urlElement.title.trim();
            let lastDashIndex = rawTitle.lastIndexOf("–");
            let articleTitle = lastDashIndex !== -1
              ? rawTitle.slice(0, lastDashIndex).trim()
              : rawTitle;
            let tooltip = `${languageName}: ${articleTitle}`;

            languageSelectionLabel.title = tooltip;
            languageSelectionLabel.className = "wiki-lang-switch-label";

            languageButton.parentNode.appendChild(languageSelectionLabel);
        }
    }
}

function showLabelsDesktop(selectedLanguages, displayMode, customLabels) {
    // The button which opens the default language dropdown
    const languageButton = document.querySelector("#p-lang-btn");

    const margin = "4px";
    showLabelsCommon(languageButton, selectedLanguages, margin, displayMode, customLabels);
}

function showLabelsMobile(selectedLanguages, displayMode, customLabels) {
    // The button which opens the default language dropdown
    const languageButton = document.querySelector("#language-selector").firstChild;

    const margin = "8px";
    showLabelsCommon(languageButton, selectedLanguages, margin, displayMode, customLabels);
}

// Show the labels of the selected languages
function showLabels(stored) {
    if (!stored.selectedLanguages || stored.selectedLanguages.length == 0) {
        return;
    }

    let selectedLanguages = stored.selectedLanguages.sort();
    let displayMode = stored.displayMode || "native";
    let customLabels = stored.customLabels || {};

    for (const existingLabel of document.querySelectorAll(".wiki-lang-switch-label")) {
        existingLabel.remove();
    }

    // Check if we are on the mobile version of Wikipedia
    if (window.location.toString().includes(".m.")) {
        showLabelsMobile(selectedLanguages, displayMode, customLabels);
    } else {
        showLabelsDesktop(selectedLanguages, displayMode, customLabels);
    }
}

// Retrieve the stored settings
const getting = browser.storage.sync.get(["selectedLanguages", "displayMode", "customLabels"]);
getting.then(showLabels, onError);
