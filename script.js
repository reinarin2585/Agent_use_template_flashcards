const entryForm = document.querySelector("#entry-form");
const symptomsCheckbox = document.querySelector("#symptoms");
const symptomDetails = document.querySelector("#symptom-details");
const symptomDetailsField = document.querySelector("#symptom-details-field");
const entriesTableBody = document.querySelector("#entries-table-body");
const pieChart = document.querySelector("#pie-chart");
const positivePercentage = document.querySelector("#positive-percentage");
const negativePercentage = document.querySelector("#negative-percentage");
const pieChartSubtitle = document.querySelector("#pie-chart-subtitle");
const storageKey = "dairyDiaryEntries";

let entries = loadEntries();

symptomsCheckbox.addEventListener("change", updateSymptomDetailsRequirement);
entryForm.addEventListener("submit", handleEntrySubmit);
renderEntries();
logLactoseCounts();

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
    logLactoseCounts();
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
        const detailsCell = createTableCell(entry.symptomDetails);
        detailsCell.className = "details-column";
        detailsCell.appendChild(createDeleteButton(entry));
        row.appendChild(detailsCell);
        entriesTableBody.appendChild(row);
    }
}

// Creates a button that deletes the selected entry.
function createDeleteButton(entry) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.setAttribute("aria-label", "Delete entry");
    deleteButton.title = "Delete entry";

    const trashIcon = createTrashIcon();
    deleteButton.appendChild(trashIcon);

    deleteButton.addEventListener("click", function () {
        deleteEntry(entry);
    });

    return deleteButton;
}

// Draws the trash icon used by each delete button.
function createTrashIcon() {
    const trashIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    trashIcon.setAttribute("viewBox", "0 0 24 24");
    trashIcon.setAttribute("aria-hidden", "true");
    const trashShape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    trashShape.setAttribute("d", "M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3");
    trashIcon.appendChild(trashShape);
    return trashIcon;
}

// Removes the selected entry, saves the entries and redraws the table.
function deleteEntry(entryToDelete) {
    const entryIndex = entries.indexOf(entryToDelete);
    entries.splice(entryIndex, 1);
    saveEntries();
    renderEntries();
    logLactoseCounts();
}

// Counts lactose-containing meals and logs the positive and negative totals.
function logLactoseCounts() {
    let lactoseMealCount = 0;
    let positiveCount = 0;
    let negativeCount = 0;

    for (const entry of entries) {
        if (entry.containsLactose) {
            lactoseMealCount++;
            if (entry.symptoms) {
                positiveCount++;
            } else {
                negativeCount++;
            }
        }
    }

    console.log("Lactose-containing meals:", lactoseMealCount);
    console.log("Positive:", positiveCount);
    console.log("Negative:", negativeCount);
    updatePieChart(lactoseMealCount, positiveCount, negativeCount);
}

// Draws the positive and negative proportions of lactose-containing meals.
function updatePieChart(lactoseMealCount, positiveCount, negativeCount) {
    pieChartSubtitle.textContent =
        "Based on " + lactoseMealCount + " lactose-containing meals";

    if (lactoseMealCount === 0) {
        pieChart.style.background = "#dce9ed";
        pieChart.setAttribute("aria-label", "No lactose-containing meals");
        positivePercentage.textContent = "0%";
        negativePercentage.textContent = "0%";
        return;
    }

    const positivePart = (positiveCount / lactoseMealCount) * 100;
    const roundedPositive = Math.round(positivePart);
    const roundedNegative = 100 - roundedPositive;

    pieChart.style.background =
        "conic-gradient(#ffd0a6 0% " + positivePart + "%, #b7e4f5 " +
        positivePart + "% 100%)";
    pieChart.setAttribute(
        "aria-label",
        "Symptoms " + roundedPositive + " percent, No symptoms " +
        roundedNegative + " percent"
    );
    positivePercentage.textContent = roundedPositive + "%";
    negativePercentage.textContent = roundedNegative + "%";
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
