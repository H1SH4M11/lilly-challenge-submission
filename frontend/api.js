const BASE_URL = "http://localhost:8000";

/**
 * Fetches the list of medicines from the backend.
 */
export async function getMedicines() {
    const response = await fetch(`${BASE_URL}/medicines`);
    if (!response.ok) {
        throw new Error("Failed to fetch medicines.");
    }
    const data = await response.json();
    return data.medicines;
}

/**
 * Sends a new medicine to the backend using JSON.
 */
export async function createMedicine(name, price) {
    const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price }),
    });

    if (!response.ok) {
        throw new Error("Failed to create medicine.");
    }
    return await response.json();
}

/**
 * Deletes a medicine by name.
 * We pass the name as a URL query parameter, which the backend's DELETE endpoint expects.
 */
export async function deleteMedicine(name) {
    const response = await fetch(`${BASE_URL}/delete?name=${encodeURIComponent(name)}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete medicine.");
    }
    return await response.json();
}

/**
 * Requests the average price calculation.
 */
export async function getAveragePrice() {
    const response = await fetch(`${BASE_URL}/average-price`);
    if (!response.ok) {
        throw new Error("Failed to calculate average.");
    }
    return await response.json();
}