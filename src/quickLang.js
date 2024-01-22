// All language list items
const languageLinks = Array.from(document.querySelectorAll('.interlanguage-link'));

// Languages to matching flags.
// Note: based on country codes. These country codes may not reflect the proper language code.
// For example: Great Britain is GB, while the code used by Wikipedia is EN.
// This has to be fixed manually.
const codeToFlags = { "ad": '🇦🇩', "ae": '🇦🇪', "af": '🇦🇫', "ag": '🇦🇬', "ai": '🇦🇮', "al": '🇦🇱', "am": '🇦🇲', "ao": '🇦🇴', "aq": '🇦🇶', "ar": '🇦🇷', "as": '🇦🇸', "at": '🇦🇹', "au": '🇦🇺', "aw": '🇦🇼', "ax": '🇦🇽', "az": '🇦🇿', "ba": '🇧🇦', "bb": '🇧🇧', "bd": '🇧🇩', "be": '🇧🇪', "bf": '🇧🇫', "bg": '🇧🇬', "bh": '🇧🇭', "bi": '🇧🇮', "bj": '🇧🇯', "bl": '🇧🇱', "bm": '🇧🇲', "bn": '🇧🇳', "bo": '🇧🇴', "bq": '🇧🇶', "br": '🇧🇷', "bs": '🇧🇸', "bt": '🇧🇹', "bv": '🇧🇻', "bw": '🇧🇼', "by": '🇧🇾', "bz": '🇧🇿', "ca": '🇨🇦', "cc": '🇨🇨', "cd": '🇨🇩', "cf": '🇨🇫', "cg": '🇨🇬', "ch": '🇨🇭', "ci": '🇨🇮', "ck": '🇨🇰', "cl": '🇨🇱', "cm": '🇨🇲', "cn": '🇨🇳', "co": '🇨🇴', "cr": '🇨🇷', "cu": '🇨🇺', "cv": '🇨🇻', "cw": '🇨🇼', "cx": '🇨🇽', "cy": '🇨🇾', "cz": '🇨🇿', "de": '🇩🇪', "dj": '🇩🇯', "dk": '🇩🇰', "dm": '🇩🇲', "do": '🇩🇴', "dz": '🇩🇿', "ec": '🇪🇨', "ee": '🇪🇪', "eg": '🇪🇬', "eh": '🇪🇭', "er": '🇪🇷', "es": '🇪🇸', "et": '🇪🇹', "fi": '🇫🇮', "fj": '🇫🇯', "fk": '🇫🇰', "fm": '🇫🇲', "fo": '🇫🇴', "fr": '🇫🇷', "ga": '🇬🇦', "en": '🇬🇧', "gd": '🇬🇩', "ge": '🇬🇪', "gf": '🇬🇫', "gg": '🇬🇬', "gh": '🇬🇭', "gi": '🇬🇮', "gl": '🇬🇱', "gm": '🇬🇲', "gn": '🇬🇳', "gp": '🇬🇵', "gq": '🇬🇶', "gr": '🇬🇷', "gs": '🇬🇸', "gt": '🇬🇹', "gu": '🇬🇺', "gw": '🇬🇼', "gy": '🇬🇾', "hk": '🇭🇰', "hm": '🇭🇲', "hn": '🇭🇳', "hr": '🇭🇷', "ht": '🇭🇹', "hu": '🇭🇺', "id": '🇮🇩', "ie": '🇮🇪', "il": '🇮🇱', "im": '🇮🇲', "in": '🇮🇳', "io": '🇮🇴', "iq": '🇮🇶', "ir": '🇮🇷', "is": '🇮🇸', "it": '🇮🇹', "je": '🇯🇪', "jm": '🇯🇲', "jo": '🇯🇴', "jp": '🇯🇵', "ke": '🇰🇪', "kg": '🇰🇬', "kh": '🇰🇭', "ki": '🇰🇮', "km": '🇰🇲', "kn": '🇰🇳', "kp": '🇰🇵', "kr": '🇰🇷', "kw": '🇰🇼', "ky": '🇰🇾', "kz": '🇰🇿', "la": '🇱🇦', "lb": '🇱🇧', "lc": '🇱🇨', "li": '🇱🇮', "lk": '🇱🇰', "lr": '🇱🇷', "ls": '🇱🇸', "lt": '🇱🇹', "lu": '🇱🇺', "lv": '🇱🇻', "ly": '🇱🇾', "ma": '🇲🇦', "mc": '🇲🇨', "md": '🇲🇩', "me": '🇲🇪', "mf": '🇲🇫', "mg": '🇲🇬', "mh": '🇲🇭', "mk": '🇲🇰', "ml": '🇲🇱', "mm": '🇲🇲', "mn": '🇲🇳', "mo": '🇲🇴', "mp": '🇲🇵', "mq": '🇲🇶', "mr": '🇲🇷', "ms": '🇲🇸', "mt": '🇲🇹', "mu": '🇲🇺', "mv": '🇲🇻', "mw": '🇲🇼', "mx": '🇲🇽', "my": '🇲🇾', "mz": '🇲🇿', "na": '🇳🇦', "nc": '🇳🇨', "ne": '🇳🇪', "nf": '🇳🇫', "ng": '🇳🇬', "ni": '🇳🇮', "nl": '🇳🇱', "no": '🇳🇴', "np": '🇳🇵', "nr": '🇳🇷', "nu": '🇳🇺', "nz": '🇳🇿', "om": '🇴🇲', "pa": '🇵🇦', "pe": '🇵🇪', "pf": '🇵🇫', "pg": '🇵🇬', "ph": '🇵🇭', "pk": '🇵🇰', "pl": '🇵🇱', "pm": '🇵🇲', "pn": '🇵🇳', "pr": '🇵🇷', "ps": '🇵🇸', "pt": '🇵🇹', "pw": '🇵🇼', "py": '🇵🇾', "qa": '🇶🇦', "re": '🇷🇪', "ro": '🇷🇴', "rs": '🇷🇸', "ru": '🇷🇺', "rw": '🇷🇼', "sa": '🇸🇦', "sb": '🇸🇧', "sc": '🇸🇨', "sd": '🇸🇩', "se": '🇸🇪', "sg": '🇸🇬', "sh": '🇸🇭', "si": '🇸🇮', "sj": '🇸🇯', "sk": '🇸🇰', "sl": '🇸🇱', "sm": '🇸🇲', "sn": '🇸🇳', "so": '🇸🇴', "sr": '🇸🇷', "ss": '🇸🇸', "st": '🇸🇹', "sv": '🇸🇻', "sx": '🇸🇽', "sy": '🇸🇾', "sz": '🇸🇿', "tc": '🇹🇨', "td": '🇹🇩', "tf": '🇹🇫', "tg": '🇹🇬', "th": '🇹🇭', "tj": '🇹🇯', "tk": '🇹🇰', "tl": '🇹🇱', "tm": '🇹🇲', "tn": '🇹🇳', "to": '🇹🇴', "tr": '🇹🇷', "tt": '🇹🇹', "tv": '🇹🇻', "tw": '🇹🇼', "tz": '🇹🇿', "ua": '🇺🇦', "ug": '🇺🇬', "um": '🇺🇲', "us": '🇺🇸', "uy": '🇺🇾', "uz": '🇺🇿', "va": '🇻🇦', "vc": '🇻🇨', "ve": '🇻🇪', "vg": '🇻🇬', "vi": '🇻🇮', "vn": '🇻🇳', "vu": '🇻🇺', "wf": '🇼🇫', "ws": '🇼🇸', "ye": '🇾🇪', "yt": '🇾🇹', "za": '🇿🇦', "zm": '🇿🇲', "zw": '🇿🇼', }

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
