import { getMedicines, createMedicine, deleteMedicine, getAveragePrice } from './api.js';
import { displayMedicines, displayAveragePrice, showNotification } from './ui.js';

// Master list to hold data for client-side filtering
let allMedicines = [];

// Event Listeners
document.addEventListener("DOMContentLoaded", initApp);
document.getElementById("addMedicineForm").addEventListener("submit", handleFormSubmit);
document.getElementById("averagePriceButton").addEventListener("click", handleAveragePrice);
document.getElementById("searchBar").addEventListener("input", handleSearch);

/**
 * Initialize the app by fetching data.
 */
async function initApp() {
    try {
        allMedicines = await getMedicines();
        // Pass the handleDelete function to the display module so buttons work
        displayMedicines(allMedicines, handleDelete); 
    } catch (error) {
        console.error("Init failed:", error);
        showNotification("Failed to load medicines. Please check server.", "error");
    }
}

/**
 * Handle deleting a medicine (The new logic).
 */
async function handleDelete(name) {
    // We use confirm() here for a simple, quick confirmation prompt.
    if(!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
        const result = await deleteMedicine(name);
        if (result.message) {
            showNotification(result.message, "success");
            await initApp(); // Reload the list and re-render the search
        } else {
            // Handle specific error from the backend if not caught by response.ok
            throw new Error(result.error || "Unknown error occurred during deletion.");
        }
    } catch (error) {
        console.error("Delete failed:", error);
        showNotification("Failed to delete medicine.", "error");
    }
}


/**
 * Handle real-time search filtering.
 */
function handleSearch(event) {
    const term = event.target.value.toLowerCase();
    
    const filtered = allMedicines.filter(med => {
        const name = (med.name || "").toLowerCase();
        return name.includes(term);
    });

    // Pass the handleDelete function to the display module so filtered buttons work
    displayMedicines(filtered, handleDelete);
}

/**
 * Handle form submission to create a medicine.
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    // Get inputs for validation
    const medName = document.getElementById("medName");
    const medPrice = document.getElementById("medPrice");

    const name = medName.value.trim();
    const price = parseFloat(medPrice.value);

    // --- CRITICAL FIX START: Manual Validation Check ---
    // If the input is empty OR the value is less than 0.01 (min="0.01"), show custom toast.
    if (!name || isNaN(price) || price < 0.01) {
        // Find which field is invalid for better messaging
        if (!name) {
            showNotification("Error: Please enter a Medicine Name.", "error");
            medName.focus(); // Brings focus to the empty field
        } else if (isNaN(price) || price < 0.01) {
             showNotification("Error: Price must be a positive number.", "error");
             medPrice.focus(); // Brings focus to the invalid field
        }
        return; // Stops the function from proceeding
    }
    // --- CRITICAL FIX END ---


    try {
        const result = await createMedicine(name, price);
        
        if (result.message) {
            showNotification(result.message, "success");
            form.reset();
            await initApp(); // Refresh list to include new item
        } else {
            throw new Error("Unknown error");
        }
    } catch (error) {
        console.error("Create failed:", error);
        showNotification("Failed to add medicine. Check server.", "error");
    }
}

/**
 * Handle average price calculation.
 */
async function handleAveragePrice() {
    try {
        const result = await getAveragePrice();
        if (result.average_price !== undefined) {
            displayAveragePrice(result.average_price);
        } else {
            showNotification("Could not calculate average.", "error");
        }
    } catch (error) {
        console.error("Average failed:", error);
        showNotification("Failed to get average price.", "error");
    }
}