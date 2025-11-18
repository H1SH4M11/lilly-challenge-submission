/**
 * Renders the list of medicines to the DOM.
 * @param {Array} medicines - The list of medicine objects.
 * @param {function} onDeleteClick - Callback function to execute when delete is clicked.
 */
export function displayMedicines(medicines, onDeleteClick) {
    const listContainer = document.getElementById("medicineList");
    listContainer.innerHTML = ""; // Clear current list

    if (medicines.length === 0) {
        // FIX: Added class="search-message" to center the text
        listContainer.innerHTML = '<p class="search-message">No medicines found.</p>'; 
        return;
    }

    medicines.forEach((medicine) => {
        const name = medicine.name || "Unknown Medicine";
        const price = medicine.price !== null 
            ? `$${medicine.price.toFixed(2)}` 
            : "Price not available";

        const card = document.createElement("div");
        card.className = "medicine-item";

        // --- Info Container (Name and Price) ---
        const infoDiv = document.createElement("div");
        
        const nameEl = document.createElement("strong");
        nameEl.textContent = name;
        nameEl.style.display = "block"; 

        const priceEl = document.createElement("span");
        priceEl.textContent = price;
        priceEl.style.marginLeft = "10px";

        infoDiv.appendChild(nameEl);
        infoDiv.appendChild(priceEl);
        // ----------------------------------------


        // --- Delete Button (The New Feature) ---
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        
        // Inline styles to match the aesthetic and make it red
        deleteBtn.style.backgroundColor = "#dc3545"; 
        deleteBtn.style.color = "white";
        deleteBtn.style.border = "none";
        deleteBtn.style.borderRadius = "5px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.padding = "5px 10px";
        deleteBtn.style.fontSize = "0.8rem";
        deleteBtn.style.marginLeft = "15px";
        deleteBtn.style.marginTop = "0"; 
        
        // Attach click handler, passing the medicine name
        deleteBtn.onclick = () => onDeleteClick(name); 
        // ----------------------------------------

        card.appendChild(infoDiv);
        card.appendChild(deleteBtn);
        listContainer.appendChild(card);
    });
}

/**
 * Updates the average price display text.
 */
export function displayAveragePrice(average) {
    const display = document.getElementById("averagePriceDisplay");
    display.textContent = `Price Average: $${average.toFixed(2)}`;
}

/**
 * Shows a temporary notification toast.
 */
export function showNotification(message, type = 'success') {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    
    // Reset classes
    notif.className = '';
    notif.classList.add(type === 'success' ? 'show-success' : 'show-error');

    // Auto-hide after 3 seconds
    setTimeout(() => {
        notif.classList.remove('show-success', 'show-error');
    }, 3000);
}