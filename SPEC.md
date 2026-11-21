# Spec: Dairy Diary

## Goal (one or two sentences)
Website to track meals and evaluate if meal contains lactose and leads to symptoms.

## Users
People with suspected lactose intolerance.

## Features (numbered, so prompts can refer to them)
F1: Create an entry form containing Date, Food/Meal, checkbox "Contains lactose?", checkbox "Symptoms?" and Symptom details. Add an "Add Entry" button to submit the entry. Clear the form after successful submission. Symptom details are only required if "Symptoms?" is checked.

F2: Create a table containing all submitted entries, sorted by date from newest to oldest. Save entries in localStorage so they survive a page reload. Load saved entries when the website opens.

F3: Add a "Delete" button for each entry. Deleting an entry removes it from the table and localStorage.

F4: Count all entries where "Contains lactose?" is checked and label the result "Lactose-containing meals". Of these entries, count those where "Symptoms?" is checked as "Positive" and those where "Symptoms?" is unchecked as "Negative". Display the results in console.log.

F5: Compare the number of Positive and Negative entries in a pie chart. The total number of lactose-containing meals represents 100%.

F6: Automatically update the pie chart whenever an entry is added or deleted.

## Acceptance criteria (how I know a feature works)
F1: Required fields cannot be empty. Entries can be submitted using the "Add Entry" button. The form resets after submission.

F2: All entries appear in a table, sorted from newest to oldest, and remain available after reloading the page.

F3: Selected entries can be deleted and remain deleted after reloading the page.

F4: Correct counts for "Lactose-containing meals", "Positive" and "Negative" are shown in console.log.

F5: A pie chart displays the proportion of Positive and Negative entries, totaling 100%.

F6: The pie chart updates automatically after adding or deleting an entry.


## Out of scope (do NOT build)
- No login, no server, no database
- No frameworks or libraries (no React, no jQuery, Bootstrap)
- No sound, no animation beyond simple CSS transitions
- No mobile app

## Look & feel
- simple, readable, playful, widht ~600px, one accent color (light blue)
