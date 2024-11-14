const track = document.getElementById('carousel-track');
const previewContainer = document.getElementById('site-preview');
const editButton = document.getElementById('edit-button');
const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const modal = document.getElementById('edit-modal');
const closeButton = document.querySelector('.close-button');
const siteForm = document.getElementById('site-form');
const siteTitleInput = document.getElementById('site-title');
const siteDescriptionInput = document.getElementById('site-description');
const siteIconInput = document.getElementById('site-icon');
const saveButton = document.getElementById('save-site');
const deleteButton = document.getElementById('delete-site');
const prevButton = document.getElementById('carousel-button prev');
const nextButton = document.getElementById('carousel-button next');

const deleteSiteButton = document.getElementById('delete-site-button');
const deleteConfirmationModal = document.getElementById('delete-confirmation-modal');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');


let favouriteSites = [
    { icon: 'home', title: 'Google icons', description: 'Use class names from this websites in the icon input field', url: 'https://fonts.google.com/icons'},
    { icon: 'home', title: 'Site Title 2', description: 'Description for site 2', url: 'example.com'},
    { icon: 'home', title: 'Site Title 3', description: 'Description for site 3', url: 'example.com'},
];
let currentSiteIndex = 0;

// Functions
function renderSites() {
    track.innerHTML = '';
    previewContainer.innerHTML = '';

    favouriteSites.forEach((site, index) => {
        const siteElement = document.createElement('div');
        siteElement.classList.add('site');
        siteElement.innerHTML = `
            <div class="site-content">
                <!-- Use Material Icons with class from site.icon -->
                <span class="material-icons">${site.icon}</span>
                <div class="container">
                    <h3>${site.title}</h3>
                    <p>${site.description}</p>
                    ${site.url ? `<a class="site-url" href="${site.url}" target="_blank">${site.url}</a>` : ''}
                    </div>
                
            </div>
        `;
        track.appendChild(siteElement);

        const previewIcon = document.createElement('div');
        previewIcon.classList.add('preview-icon');
        if (index === currentSiteIndex) {
            previewIcon.classList.add('active');
        }
        // Display the icon with Material Icons class
        previewIcon.innerHTML = `<span class="material-icons">${site.icon}</span>`;
        previewIcon.addEventListener('click', () => {
            currentSiteIndex = index;
            updateCarousel();
        });
        previewContainer.appendChild(previewIcon);
    });

    // Add the "Add New Site" button at the end of the preview container
    const addNewIcon = document.createElement('div');
    addNewIcon.classList.add('preview-icon', 'add-new');
    addNewIcon.innerHTML = `<span class="material-icons">add</span>`; // Material Icon for 'add'
    addNewIcon.addEventListener('click', () => {
        favouriteSites.push({
            title: 'New Site', 
            description: 'Description for new site', 
            url: 'example.com', 
            icon: 'home' // Default icon, you can allow users to pick their own later
        });
        storeFavouriteSites();
        renderSites();
    });
    previewContainer.appendChild(addNewIcon);

    updateCarousel();
}

// Confirm delete site
confirmDeleteButton.addEventListener('click', () => {
    if (favouriteSites.length > 1) {
        favouriteSites.splice(currentSiteIndex, 1);
        currentSiteIndex = Math.max(0, currentSiteIndex - 1);
        saveDeletedSite();
    }
    deleteConfirmationModal.style.display = 'none';
});



function updateCarousel() {
    const amountToMove = track.children[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentSiteIndex * amountToMove}px)`;
    document.querySelectorAll('.preview-icon').forEach((icon, index) => {
        icon.classList.toggle('active', index === currentSiteIndex);
    });
}

// Modal functionality
editButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    loadSiteToForm(currentSiteIndex);
});

settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});


closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

function loadSiteToForm(index) {
    const site = favouriteSites[index];
    siteTitleInput.value = site.title;
    siteDescriptionInput.value = site.description;
    siteIconInput.value = site.icon; // Display the icon name in the input field

    const siteUrlInput = document.getElementById('site-url');
    if (siteUrlInput) {
        siteUrlInput.value = site.url || '';
    }
}


siteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveSite();
});

deleteButton.addEventListener('click', () => {
    deleteConfirmationModal.style.display = 'flex';
});



function saveSite() {
    const siteUrlInput = document.getElementById('site-url');
    const siteUrl = siteUrlInput ? siteUrlInput.value : '';

    favouriteSites[currentSiteIndex] = {
        icon: siteIconInput.value, // Material Icon class name (e.g., "home")
        title: siteTitleInput.value,
        description: siteDescriptionInput.value,
        url: siteUrl,
    };
    storeFavouriteSites();
    renderSites();
    modal.style.display = 'none';
}

function saveDeletedSite() {
    modal.style.display = 'none';
    storeFavouriteSites();
    renderSites();
}


// Store favourite sites in local storage
function storeFavouriteSites() {
    localStorage.setItem('favouriteSites', JSON.stringify(favouriteSites));
}

// Load favourite sites from local storage
function loadFavouriteSites() {
    const storedSites = localStorage.getItem('favouriteSites');
    if (storedSites) {
        favouriteSites = JSON.parse(storedSites);
    }
}


// Close the modal when clicking the close button
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});



// Call loadFavouriteSites on page load
loadFavouriteSites();

// Initial Render
renderSites();

