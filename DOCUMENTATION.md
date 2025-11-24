Lilly Technical Challenge Documentation

Approach

I treated this challenge as a real-world product evolution. I started with a standard modular approach (V1) to meet the core requirements. Once satisfied, I refactored the frontend into a "V2 Dashboard" to demonstrate how I would build a modern, high-performance internal tool for Eli Lilly.

Key Features (V2 Upgrade)

Single-View Architecture: Consolidated the frontend into a cohesive dashboard for zero-configuration deployment and faster load times.

Dual-Mode Data Engine:

Live Mode: Connects to the Python backend for persistent production data.

Demo Mode: Uses browser localStorage to create a persistent sandbox environment. This allows the app to be demonstrated fully even if the backend server is offline.

Visual Analytics: Integrated Chart.js to visualize price distributions, providing immediate insights for Admins.

Optimistic UI Updates: The interface updates instantly when adding/deleting items, providing a "native app" feel.

Enhanced UX:

Replaced native browser alerts with custom Toast Notifications.

Added a Delete Confirmation Modal to prevent accidental data loss.

Implemented a Responsive Layout using Tailwind CSS with Eli Lilly corporate branding.

Architectural Decisions

Why Single File? I chose a Single-File Architecture (SFA) for the V2 frontend to mimic the component-based structure of modern frameworks (like React/Vue) while remaining dependency-free. This ensures the "Demo Mode" runs flawlessly in any browser context without CORS issues related to ES6 module loading.

Why LocalStorage? To fix the "refresh data loss" issue in Demo Mode, I implemented a persistent local storage layer. This ensures that data entered during a demo session survives page reloads, mimicking a real database interaction.

Security & Compliance

Input Sanitization: All form inputs are validated to prevent invalid data submission.

Defensive Networking: The app automatically detects if it is running locally (file://) or on a server and adjusts its API connection strategy accordingly.

Audit Logging: A session-based Activity Log tracks all Create/Delete actions for traceability.