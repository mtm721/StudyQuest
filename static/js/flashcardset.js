
async function sendFlashcardSetData() {
    let target_url = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("create_new_set");
    let set_name = document.getElementById("set_name").value;
    console.log(`set_name: ${set_name}`);
    let data = {"set_name": set_name};
    console.log(`data: ${JSON.stringify(data)}`);
    let request = new Request(target_url, {method: "POST", body: JSON.stringify(data)});
    console.log(`request: ${request}`);
    let response = await fetch(request);
    if (response.status === 400) {
        alert("Flashcard set already exists");
    }
    document.getElementById("term").value = "";
    document.getElementById("definition").value = "";
}
