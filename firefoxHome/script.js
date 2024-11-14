const track = document.getElementById('carousel-track');
const previewContainer = document.getElementById('site-preview');
const settingsButton = document.getElementById('settings-button');
const modal = document.getElementById('settings-modal');
const closeButton = document.querySelector('.close-button');
const siteForm = document.getElementById('site-form');
const siteTitleInput = document.getElementById('site-title');
const siteDescriptionInput = document.getElementById('site-description');
const siteIconInput = document.getElementById('site-icon');
const saveButton = document.getElementById('save-site');
const deleteButton = document.getElementById('delete-site');
const addButton = document.getElementById('add-site');
const prevButton = document.getElementById('carousel-button prev');
const nextButton = document.getElementById('carousel-button next');

let favouriteSites = [
    { icon: '1', title: 'Site Title 1', description: 'Description for site 1' },
    { icon: '2.png', title: 'Site Title 2', description: 'Description for site 2' },
    { icon: '3.png', title: 'Site Title 3', description: 'Description for site 3' },
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
                <h3>${site.icon}</h3>
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
        previewIcon.innerHTML = `<h3>${site.icon}</h3>`;
        previewIcon.addEventListener('click', () => {
            currentSiteIndex = index;
            updateCarousel();
        });
        previewContainer.appendChild(previewIcon);
    });

    updateCarousel();
}


function updateCarousel() {
    const amountToMove = track.children[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentSiteIndex * amountToMove}px)`;
    document.querySelectorAll('.preview-icon').forEach((icon, index) => {
        icon.classList.toggle('active', index === currentSiteIndex);
    });
}


// Modal functionality
settingsButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    loadSiteToForm(currentSiteIndex);
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

function loadSiteToForm(index) {
    const site = favouriteSites[index];
    siteTitleInput.value = site.title;
    siteDescriptionInput.value = site.description;
    siteIconInput.value = site.icon;

    const siteUrlInput = document.getElementById('site-url');
    if (siteUrlInput) {
        siteUrlInput.value = site.url || '';
    }
}

siteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveSite();
});

addButton.addEventListener('click', () => {
    favouriteSites.push({ icon: '', title: 'New Site', description: 'Description...' });
    renderSites();
});

deleteButton.addEventListener('click', () => {
    if (favouriteSites.length > 1) {
        favouriteSites.splice(currentSiteIndex, 1);
        currentSiteIndex = Math.max(0, currentSiteIndex - 1);
        renderSites();
    }
});


function saveSite() {
    const siteUrlInput = document.getElementById('site-url');
    const siteUrl = siteUrlInput ? siteUrlInput.value : '';

    favouriteSites[currentSiteIndex] = {
        icon: siteIconInput.value,
        title: siteTitleInput.value,
        description: siteDescriptionInput.value,
        url: siteUrl,
    };
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

// Call loadFavouriteSites on page load
loadFavouriteSites();

// Initial Render
renderSites();
