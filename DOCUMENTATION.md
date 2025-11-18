Lilly Technical Challenge Documentation
Approach
I treated this challenge as a real-world software engineering task, prioritizing security, scalability, and user experience (UX). My approach was phased:
1.	Environment Stability: The first step was problem-solving the initial setup. I noticed the provided start.ps1 script failed due to dependency path issues (requirements.txt location). My solution was to manually set up the environment, ensuring I respected the "Out of Scope" rule of not modifying the build scripts.
2.	Architecture Refactor: I restructured the application by implementing ES6 Modules on the frontend, separating concerns into api.js, ui.js, and main.js.
3.	Security & Full CRUD: I hardened the application against XSS attacks and implemented full CRUD (Create, Read, Delete) functionality.
4.	UX & Polish: I added aesthetic upgrades and necessary bonus features (Search, Notifications) to finalize the user experience.
Objectives - Innovative Solutions
1. Security and Frontend Architecture
•	Modular Architecture: I refactored the JavaScript into three specialized modules (api.js, ui.js, main.js). This demonstrates a professional understanding of separation of concerns, making the codebase easier to read, debug, and test.
•	XSS Vulnerability Patch: I identified and patched a potential Cross-Site Scripting (XSS) vulnerability. The original method of displaying data was insecure, so I ensured all user-generated content is rendered using textContent instead of innerHTML.
2. Full-Stack Feature Implementation
•	Full CRUD & Delete: I went beyond the basic requirements by implementing a complete Delete workflow. This involved wiring the red 'Delete' button on the frontend to the backend's DELETE endpoint, demonstrating full-stack capability.
•	Real-Time Search (Bonus Feature): I implemented a client-side filter that allows users to instantly search the medicine list as they type. This is highly efficient because it avoids unnecessary server calls, improving performance and user experience.
•	Professional UX Validation: I replaced the jarring browser alert() popups with custom, non-blocking "Toast" notifications. I also manually bypassed the native HTML required validation to ensure that all validation errors are reported consistently using our custom red toast notification system.
3. Aesthetic Polish
•	Frosted Glass Effect: I utilized the modern CSS backdrop-filter: blur() property to give the notification bar and the footer a subtle, high-quality "frosted glass" aesthetic, enhancing the application's visual appeal.
•	Color Hierarchy: I established a clear visual hierarchy by defining the Add Medicine button as the primary action (blue) and the Calculate Average button as the secondary action (gray).
Problems Faced
1. Broken Start Scripts
•	Issue: The provided start.ps1 script failed because it looked for requirements.txt in the root directory, while the file was located in the backend/ directory.
•	Solution: I chose not to modify the "Out of Scope" scripts. Instead, I manually ran the environment setup commands, specifically pointing pip install to backend/requirements.txt. This resolved the instability while respecting the challenge constraints.
2. Form Validation Conflict
•	Issue: When intentionally leaving the name blank, the browser's native HTML validation was overriding our custom JavaScript toast notification.
•	Solution: I removed the required attribute from the HTML input fields, forcing the browser to rely entirely on our custom JavaScript validation logic. This ensured our consistent, user-friendly toast error message was displayed instead of the native browser pop-up.
Evaluation
I am very proud of the final result. I successfully transformed a simple skeleton into a secure, maintainable, and fully featured web application. My time was well spent on fixing architectural and security flaws before adding features.
If I had more time, my focus would be exclusively on:
1.	Unit Testing: Implementing pytest for the backend API and Jest for the frontend modules to ensure 100% stability.
2.	Edit Functionality: Completing the final CRUD piece by adding a UI for the existing /update API endpoint.
