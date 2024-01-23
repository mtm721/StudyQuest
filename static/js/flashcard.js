/**
 * Gathers input information from fields in flashcard.html, assembles a JSON,
 * and POSTs it to main.py for insertion into the DB.
 * @returns {Promise<void>} ("returns" when response is received from main.py)
 */
async function sendFlashcardData() {
    let target_url = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("create_flashcard");
    let term = document.getElementById("term").value;
    let definition = document.getElementById("definition").value;
    if (term === "" || definition === "") {
        alert("Please enter a value for Term or Definition");
        return;
    }
    let set_name = document.getElementById("card_set").value;
    let data = {"term": term, "definition": definition, "set_name": set_name};
    let request = new Request(target_url, {method: "POST", body: JSON.stringify(data)});
    fetch(request).then(alert(`Added ${term} to ${set_name}`));
    document.getElementById("term").value = "";
    document.getElementById("definition").value = "";
}
