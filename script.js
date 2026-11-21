const entryForm = document.querySelector("#entry-form");
const symptomsCheckbox = document.querySelector("#symptoms");
const symptomDetails = document.querySelector("#symptom-details");

symptomsCheckbox.addEventListener("change", updateSymptomDetailsRequirement);
entryForm.addEventListener("submit", handleEntrySubmit);

// Makes symptom details required only when symptoms are selected.
function updateSymptomDetailsRequirement() {
    symptomDetails.required = symptomsCheckbox.checked;
}

// Resets the form after the browser confirms all required fields are valid.
function handleEntrySubmit(event) {
    event.preventDefault();
    entryForm.reset();
    updateSymptomDetailsRequirement();
}
