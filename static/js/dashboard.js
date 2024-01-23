/**
 * Fires when the value in the study mode dropdown selector is changed. Sets
 * the href value of the wizard icon to /study with the selected dropdwon value
 * as a GET request argument, in turn making the icon clickable.
 */

function getSet() {
    let selected_set = document.getElementById("flashcard_set").value;
    getStudySetForMode(selected_set);
    getTestingSetForMode(selected_set);
    if (selected_set === "select") {
        alert("Please choose a flashcard set to study with.");
    }
}

function getStudySetForMode(selected_set) {
    if (selected_set === "select") {
        document.getElementById("study").removeAttribute("href");
    } else {
        document.getElementById("study").href = "/study?flashcard_set=".concat(selected_set);
    }
}

/**
 * Fires when the value in the testing mode dropdown selector is changed. Sets
 * the href value of the dragon icon to /testing_mode with the selected dropdwon value
 * as a GET request argument, in turn making the icon clickable.
 */
function getTestingSetForMode(selected_set) {
    if (selected_set ==="select") {
        document.getElementById("testing_mode").removeAttribute("href");
    } else {
        document.getElementById("testing_mode").href = "/testing_mode?flashcard_set=".concat(selected_set)
    }
}