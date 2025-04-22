document.addEventListener('DOMContentLoaded', function () {
    const entryForm = document.getElementById('entry-form');
    const entryTextArea = document.getElementById('entry');
    const memoryList = document.getElementById('memory-list');

    document.getElementById('thoughts-btn').addEventListener('click', () => {
        entryForm.style.display = 'block';
        memoryList.style.display = 'none';
    });

    document.getElementById('memories-btn').addEventListener('click', () => {
        entryForm.style.display = 'none';
        memoryList.style.display = 'block';
        loadEntries();  // Load saved journal entries
    });

    document.getElementById('save-btn').addEventListener('click', async () => {
        const entry = entryTextArea.value.trim();
        if (entry !== "") {
            const response = await fetch('/add_entry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entry })
            });

            if (response.ok) {
                alert("Memory saved!");
                entryTextArea.value = "";  // Clear the text area after saving
            } else {
                alert("Failed to save memory.");
            }
        }
    });

    // Function to load entries and display them correctly
    async function loadEntries() {
        const response = await fetch('/get_entries');  // Get entries from the backend
        const entries = await response.json();

        memoryList.innerHTML = "";  // Clear the current list
        entries.forEach((entry, index) => {
            const div = document.createElement('div');
            div.className = 'memory';
            
            // Ensure that we access the 'text' property of the entry object
            div.innerHTML = `${index + 1}. ${entry.text}`;  // Display the entry text correctly
            memoryList.appendChild(div);  // Append the new memory to the list
        });
    }
});
