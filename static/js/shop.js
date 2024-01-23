/**
 * Handles the back-end logic for ShopScene.
 */

let player_points = parseInt(document.getElementById('points').getAttribute('data-points'));

/**
 * Determines if the item can buy an item.
 * If so, adds the item to the player's inventory,
 * then calls updateUIAfterPurchase.
 *
 * @param item
 * @param updateUI
 * @param button
 * @param points
 *
 * @see updateUIAfterPurchase
 */
function purchaseItem(item, updateUI, popup, button, points) {
    let itemName = item.name;
    let itemCost = item.cost;
    // could get rid of this check since it's handled by the button
    if (playerInventoryData.some(function(playerItem) {
        return playerItem.name === item.name;
    })) {
        // alert('You already own this item.');
        popup(item, 'alreadyowned');
    } else {
        if (player_points >= itemCost) {
            player_points -= itemCost;
            // buy_item() goes here
            // buy_item(itemName, itemCost).then(alert(`You've purchased ${itemName} for ${itemCost} points.`));
            buy_item(itemName, itemCost).then();
            playerInventoryData.push(item);
            updateUI(item, button, points); // calling updateUIAfterPurchase in ShopScene
        } else {
            // alert("You don't have enough points to purchase this item.")
            popup(item, 'notenoughpoints');
        }
    }
}

/**
 * Sends a JSON POST request back to main.py with the name of the item being purchased and its cost.
 * @param item_name the item being bought
 * @param item_cost the cost of the item being bought
 * @returns {Promise<void>} void ("returns" once response is received back)
 */
async function buy_item(item_name, item_cost) {
    let target_url = document.URL.slice(0, document.URL.lastIndexOf("/") + 1).concat("buy_item");
    let data = {"itemName": item_name, "itemCost": item_cost};
    let request = new Request(target_url, {method: "POST", body: JSON.stringify(data)});
    fetch(request);
}
