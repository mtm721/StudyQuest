/**
 * Reveals the input fields for the element so that values can be inserted.
 * @param element the element whose visibility field is being set to visible
 */
function openDataBox(element) { document.getElementById(element).style.visibility = "visible"; }

/**
 * Sends the new username value back to main.py as a JSON POST
 * @returns {Promise<void>} ("returns" when response is received from main.py)
 */
async function updateUsername() {
    let target_url = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("update_username");
    let new_username = document.getElementById("newUsername").value;
    let data = {"username": new_username};
    console.log(JSON.stringify(data));
    let request = new Request(target_url, {method: "POST", body: JSON.stringify(data)});
    // will need to update with "await" and "response"
    let response = await fetch(request);
    document.getElementById("newUsername").value = "";
    alert((response.status === 200) ? "Updated username" : "Username already exists");
    if (response.status === 200) {
        document.getElementById('username').innerHTML = `Username: ${new_username}`;
    }
    document.getElementById("newUsernameInput").style.visibility = "hidden";
}

/**
 * First checks to make sure that new password values match, and if so, sends a JSON POST
 * back to main.py with old password and new password, successfully updating if the old
 * password is found in the DB (400 code is returned by main.py if not)
 * @returns {Promise<void>} ("returns" when response is received from main.py)
 */
async function updatePassword() {
    let target_url = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("update_password");
    let oldPass = document.getElementById("oldPassword").value;
    let newPass = document.getElementById("newPassword").value;
    let confPass = document.getElementById("newPasswordConf").value;
    if (newPass !== confPass) {
        alert("New passwords do not match.")
        document.getElementById("oldPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("newPasswordConf").value = "";
    } else {
        let data = {"oldPass": oldPass, "newPass": newPass};
        console.log(JSON.stringify(data));
        let request = new Request(target_url, {method: "POST", body: JSON.stringify(data)});
        // will need to update with "await" and "response"
        let response = await fetch(request);
        document.getElementById("oldPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("newPasswordConf").value = "";
        alert((response.status === 200) ? "Updated password" : "Invalid old password");
        if (response.status === 200) {
            document.getElementById("newPasswordInput").style.visibility = "hidden";
        }
    }
}

/**
 * Sends the new email value back to main.py as a JSON POST
 * @returns {Promise<void>} ("returns" when response is received from main.py)
 */
async function updateEmail(){
    let target_url = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("update_email");
    let new_email = document.getElementById("newEmail").value;
    let data = {"email": new_email};
    console.log(JSON.stringify(data));
    let request = new Request(target_url, {method: "POST", body: JSON.stringify(data)});
    // will need to update with "await" and "response"
    fetch(request).then(alert("Updated email"));
    document.getElementById("newEmail").value = "";
    document.getElementById("email").innerHTML = `Email: ${new_email}`;
    document.getElementById("newEmailInput").style.visibility = "hidden";
}
