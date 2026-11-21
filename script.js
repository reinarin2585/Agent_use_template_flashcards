const entryForm = document.querySelector("#entry-form");
const symptomsCheckbox = document.querySelector("#symptoms");
const symptomDetails = document.querySelector("#symptom-details");
const symptomDetailsField = document.querySelector("#symptom-details-field");
const entriesTableBody = document.querySelector("#entries-table-body");
const storageKey = "dairyDiaryEntries";

let entries = loadEntries();

symptomsCheckbox.addEventListener("change", updateSymptomDetailsRequirement);
entryForm.addEventListener("submit", handleEntrySubmit);
renderEntries();

// Shows symptom details only when symptoms are selected and keeps the field required.
function updateSymptomDetailsRequirement() {
    symptomDetails.required = symptomsCheckbox.checked;
    symptomDetailsField.hidden = !symptomsCheckbox.checked;

    if (symptomsCheckbox.checked === false) {
        symptomDetails.value = "";
    }
}

// Resets the form after the browser confirms all required fields are valid.
function handleEntrySubmit(event) {
    event.preventDefault();
    const entry = {
        date: document.querySelector("#entry-date").value,
        meal: document.querySelector("#meal").value,
        containsLactose: document.querySelector("#contains-lactose").checked,
        symptoms: symptomsCheckbox.checked,
        symptomDetails: symptomDetails.value
    };

    entries.push(entry);
    saveEntries();
    renderEntries();
    entryForm.reset();
    updateSymptomDetailsRequirement();
}

// Loads saved entries from localStorage when the page opens.
function loadEntries() {
    const savedEntries = localStorage.getItem(storageKey);
    if (savedEntries === null) {
        return [];
    }
    return JSON.parse(savedEntries);
}

// Saves the current entries in localStorage.
function saveEntries() {
    localStorage.setItem(storageKey, JSON.stringify(entries));
}

// Shows all entries in a table from newest date to oldest date.
function renderEntries() {
    entriesTableBody.textContent = "";
    const sortedEntries = [...entries];
    sortedEntries.sort(function (firstEntry, secondEntry) {
        return secondEntry.date.localeCompare(firstEntry.date);
    });

    for (const entry of sortedEntries) {
        const row = document.createElement("tr");
        row.appendChild(createTableCell(entry.date));
        row.appendChild(createTableCell(entry.meal));
        row.appendChild(createTableCell(formatCheckboxValue(entry.containsLactose)));
        row.appendChild(createTableCell(formatCheckboxValue(entry.symptoms)));
        row.appendChild(createTableCell(entry.symptomDetails));
        entriesTableBody.appendChild(row);
    }
}

// Creates one table cell containing text.
function createTableCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

// Converts checkbox values to simple Yes or No text.
function formatCheckboxValue(value) {
    if (value) {
        return "Yes";
    }
    return "No";
}
