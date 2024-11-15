const saveConfigButton = document.getElementById('save-config-button');
const loadConfigButton = document.getElementById('load-config-button');
const saveConfigModal = document.getElementById('save-config-modal');
const loadConfigModal = document.getElementById('load-config-modal');
const saveConfigConfirmButton = document.getElementById('save-config-confirm-button');
const saveNameInput = document.getElementById('save-name');
const saveSlots = document.getElementById('save-slots');
const loadSlots = document.getElementById('load-slots');

// Data structure to hold all current usages of local storage
const localStorageKeys = [
    'favouriteSites',
    'backgroundColor',
    'backgroundOpacity',
    'containerBorderColor',
    'containerBorderWidth',
    'containerBorderRadius',
    'topBorderColor',
    'topBorderWidth',
    'topBorderRadius',
    'bottomBorderColor',
    'bottomBorderWidth',
    'bottomBorderRadius',
    'containerBackgroundColor',
    'containerBackgroundOpacity',
    'topBackgroundColor',
    'topBackgroundOpacity',
    'bottomBackgroundColor',
    'bottomBackgroundOpacity',
];

// Open save config modal
saveConfigButton.addEventListener('click', () => {
    saveConfigModal.style.display = 'flex';
    renderSaveSlots();
});

// Open load config modal
loadConfigButton.addEventListener('click', () => {
    loadConfigModal.style.display = 'flex';
    renderLoadSlots();
});

// Close modals when clicking the close button
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

// Save configuration
saveConfigConfirmButton.addEventListener('click', () => {
    const saveName = saveNameInput.value.trim();
    if (saveName) {
        const config = {};
        localStorageKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value !== null) {
                config[key] = value;
            }
        });
        localStorage.setItem(`config_${saveName}`, JSON.stringify(config));
        saveNameInput.value = '';
        renderSaveSlots();
        alert('Configuration saved!');
    } else {
        alert('Please enter a save name.');
    }
});

// Render save slots
function renderSaveSlots() {
    saveSlots.innerHTML = '';
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('config_')) {
            const saveName = key.replace('config_', '');
            const slot = document.createElement('div');
            slot.classList.add('save-slot');
            slot.innerHTML = `
                <span>${saveName}</span>
                <button class="delete-save" data-save-name="${saveName}">x</button>
            `;
            saveSlots.appendChild(slot);
        }
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-save').forEach(button => {
        button.addEventListener('click', (event) => {
            const saveName = event.target.getAttribute('data-save-name');
            localStorage.removeItem(`config_${saveName}`);
            renderSaveSlots();
        });
    });
}

// Render load slots
function renderLoadSlots() {
    loadSlots.innerHTML = '';
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('config_')) {
            const saveName = key.replace('config_', '');
            const slot = document.createElement('div');
            slot.classList.add('load-slot');
            slot.innerHTML = `
                <span>${saveName}</span>
                <button class="load-save" data-save-name="${saveName}">Load</button>
            `;
            loadSlots.appendChild(slot);
        }
    });

    // Add event listeners to load buttons
    document.querySelectorAll('.load-save').forEach(button => {
        button.addEventListener('click', (event) => {
            const saveName = event.target.getAttribute('data-save-name');
            const config = JSON.parse(localStorage.getItem(`config_${saveName}`));
            if (config) {
                Object.keys(config).forEach(key => {
                    localStorage.setItem(key, config[key]);
                });
                alert('Configuration loaded!');
                location.reload();
            } else {
                alert('Failed to load configuration.');
            }
        });
    });
}