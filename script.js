const wordForm = document.getElementById("word-form");
const englishInput = document.getElementById("english-word");
const germanInput = document.getElementById("german-word");
const wordList = document.getElementById("word-list");
const selectButton = document.getElementById("select-button");
const deleteButton = document.getElementById("delete-button");
const wordPairs = [];
const selectedWordPairs = [];
let selectionModeEnabled = false;

// Shows all word pairs in the list.
function showWordPairs() {
    wordList.innerHTML = "";

    for (const wordPair of wordPairs) {
        const listItem = document.createElement("li");

        if (selectionModeEnabled) {
            addSelectionCheckbox(listItem, wordPair);
        } else {
            listItem.textContent = wordPair.german + " - " + wordPair.english;
        }

        wordList.appendChild(listItem);
    }
}

// Adds a checkbox for selecting one word pair.
function addSelectionCheckbox(listItem, wordPair) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "selection-checkbox";
    checkbox.checked = selectedWordPairs.includes(wordPair);

    // Updates the selected pairs when the checkbox changes.
    checkbox.addEventListener("change", function () {
        updateSelectedWordPairs(wordPair, checkbox.checked);
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(wordPair.german + " - " + wordPair.english));
    listItem.appendChild(label);
}

// Adds or removes a word pair from the selection.
function updateSelectedWordPairs(wordPair, isSelected) {
    const selectedIndex = selectedWordPairs.indexOf(wordPair);

    if (isSelected && selectedIndex === -1) {
        selectedWordPairs.push(wordPair);
    } else if (!isSelected && selectedIndex !== -1) {
        selectedWordPairs.splice(selectedIndex, 1);
    }

    deleteButton.disabled = selectedWordPairs.length === 0;
}

// Shows or hides the checkboxes used to select word pairs.
function toggleSelectionMode() {
    selectionModeEnabled = !selectionModeEnabled;

    if (selectionModeEnabled) {
        selectButton.textContent = "Done selecting";
        selectButton.setAttribute("aria-pressed", "true");
        deleteButton.hidden = false;
    } else {
        selectButton.textContent = "Select pairs";
        selectButton.setAttribute("aria-pressed", "false");
        deleteButton.hidden = true;
        deleteButton.disabled = true;
        selectedWordPairs.length = 0;
    }

    showWordPairs();
}

// Deletes all word pairs that are currently selected.
function deleteSelectedWordPairs() {
    for (let index = wordPairs.length - 1; index >= 0; index--) {
        if (selectedWordPairs.includes(wordPairs[index])) {
            wordPairs.splice(index, 1);
        }
    }

    selectedWordPairs.length = 0;
    deleteButton.disabled = true;
    showWordPairs();
}

// Adds one word pair and clears the form.
function addWordPair(event) {
    event.preventDefault();

    const englishWord = englishInput.value.trim();
    const germanWord = germanInput.value.trim();

    if (englishWord === "" || germanWord === "") {
        return;
    }

    wordPairs.push({
        english: englishWord,
        german: germanWord
    });

    showWordPairs();
    wordForm.reset();
    englishInput.focus();
}

wordForm.addEventListener("submit", addWordPair);
selectButton.addEventListener("click", toggleSelectionMode);
deleteButton.addEventListener("click", deleteSelectedWordPairs);