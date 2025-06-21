// All language list items
const languageLinks = Array.from(document.querySelectorAll('.interlanguage-link'));

// Languages to matching flags.
// Note: based on country codes. These country codes may not reflect the proper language code.
// For example: Great Britain is GB, while the code used by Wikipedia is EN.
// This has to be fixed manually.
const codeToFlags = {
    en: '🇬🇧',     // English
    zh: '🇨🇳',     // Chinese
    ja: '🇯🇵',     // Japanese
    ru: '🇷🇺',     // Russian
    es: '🇪🇸',     // Spanish
    fr: '🇫🇷',     // French
    de: '🇩🇪',     // German
    it: '🇮🇹',     // Italian
    ko: '🇰🇷',     // Korean
    ar: '🇸🇦',     // Arabic
    pt: '🇵🇹',     // Portuguese
    hi: '🇮🇳',     // Hindi
};

// Searches the language dropdown for the list item containing the select language
function getLanguageUrl(dataCode) {
    let link = languageLinks.find(languageLink => {
        return languageLink.firstChild.attributes["lang"].value.toLowerCase() == dataCode.toLowerCase();
    });

    if (link) {
        return link.firstChild;
    }
}

// Logs an error when we could not retrieve the stored selected languages.
function onError(error) {
  console.error(`Error: ${error}`);
}

function showFlagsCommon(languageButton, selectedLanguages, margin) {
    for (const selectedLanguage of selectedLanguages) {
        let urlElement = getLanguageUrl(selectedLanguage);

        if (urlElement) {
            // If no flag is found for the selected language, use a white one
            let flagEmoji = codeToFlags[selectedLanguage.toLowerCase()] || "🏳️";

            let languageSelectionFlag = document.createElement('a');

            languageSelectionFlag.innerText = flagEmoji;
            languageSelectionFlag.href = urlElement.href;
            languageSelectionFlag.style.cssText = `margin: ${margin};`
            languageSelectionFlag.title = `WikiQuickLang: ${ urlElement.innerText }`;
            languageSelectionFlag.className = "wiki-quick-lang-flag";

            languageButton.parentNode.appendChild(languageSelectionFlag);
        }
    }
}

function showFlagsDesktop(selectedLanguages) {
    // The button which opens the default language dropdown
    const languageButton = document.querySelector("#p-lang-btn");

    const margin = "4px";
    showFlagsCommon(languageButton, selectedLanguages, margin);
}

function showFlagsMobile(selectedLanguages) {
    // The button which opens the default language dropdown
    const languageButton = document.querySelector("#language-selector").firstChild;

    const margin = "8px";
    showFlagsCommon(languageButton, selectedLanguages, margin);
}

// Show the flags of the selected languages
function showFlags(stored) {
    if (!stored.selectedLanguages || stored.selectedLanguages.length == 0) {
        return;
    }

    let selectedLanguages = stored.selectedLanguages.sort();

    for (const existingFlag of document.querySelectorAll(".wiki-quick-lang-flag")) {
        existingFlag.remove();
    }

    // Check if we are on the mobile version of Wikipedia
    if (window.location.toString().includes(".m.")) {
        showFlagsMobile(selectedLanguages)
    } else {
        showFlagsDesktop(selectedLanguages)
    }
}

// Retrieve the stored settings
const getting = browser.storage.sync.get("selectedLanguages");
getting.then(showFlags, onError);
