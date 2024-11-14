const editBordersButton = document.getElementById('edit-border-button');
const borderOption = document.getElementById('border-options');

//Settings: 

// Store the user's background preference (color or image)
function storeBackgroundPreference(preference) {
    localStorage.setItem('backgroundPreference', preference);
}

// Load the user's background preference
function loadBackgroundPreference() {
    return localStorage.getItem('backgroundPreference');
}

// Update the background based on the user's preference
function updateBackground() {
    const backgroundPreference = loadBackgroundPreference();
    if (backgroundPreference === 'color') {
        const backgroundColor = localStorage.getItem('backgroundColor');
        if (backgroundColor) {
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = backgroundColor;
        }
    } else if (backgroundPreference === 'image') {
        const backgroundImage = localStorage.getItem('backgroundImage');
        if (backgroundImage) {
            document.body.style.backgroundImage = `url(${backgroundImage})`;
            document.body.style.backgroundColor = 'transparent';
        }
    }
}

// Update the background preference when the user selects a background color
document.getElementById('background-color-picker').addEventListener('input', function(event) {
    const color = event.target.value;
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = color;
    storeBackgroundPreference('color');
    localStorage.setItem('backgroundColor', color);
});

// Update the background preference when the user uploads a background image
document.getElementById('background-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundColor = 'transparent';
            storeBackgroundPreference('image');
            localStorage.setItem('backgroundImage', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Load the background preference on page load
window.addEventListener('load', function() {
    updateBackground();
});

// Handle container border color picker
document.getElementById('container-border-color-picker').addEventListener('input', function(event) {
    const color = event.target.value;
    const width = document.getElementById('container-border-width').value;
    document.getElementById('container').style.border = `${width}px solid ${color}`;
    localStorage.setItem('containerBorderColor', color);
    localStorage.setItem('containerBorderWidth', width);
});

// Handle container border width input
document.getElementById('container-border-width').addEventListener('input', function(event) {
    const width = event.target.value;
    const color = document.getElementById('container-border-color-picker').value;
    document.getElementById('container').style.border = `${width}px solid ${color}`;
    localStorage.setItem('containerBorderWidth', width);
    localStorage.setItem('containerBorderColor', color);
});

// Handle top border color picker
document.getElementById('top-border-color-picker').addEventListener('input', function(event) {
    const color = event.target.value;
    const width = document.getElementById('top-border-width').value;
    document.getElementById('top').style.border = `${width}px solid ${color}`;
    localStorage.setItem('topBorderColor', color);
    localStorage.setItem('topBorderWidth', width);
});

// Handle top border width input
document.getElementById('top-border-width').addEventListener('input', function(event) {
    const width = event.target.value;
    const color = document.getElementById('top-border-color-picker').value;
    document.getElementById('top').style.border = `${width}px solid ${color}`;
    localStorage.setItem('topBorderWidth', width);
    localStorage.setItem('topBorderColor', color);
});

// Handle bottom border color picker
document.getElementById('bottom-border-color-picker').addEventListener('input', function(event) {
    const color = event.target.value;
    const width = document.getElementById('bottom-border-width').value;
    document.getElementById('bottom').style.border = `${width}px solid ${color}`;
    localStorage.setItem('bottomBorderColor', color);
    localStorage.setItem('bottomBorderWidth', width);
});

// Handle bottom border width input
document.getElementById('bottom-border-width').addEventListener('input', function(event) {
    const width = event.target.value;
    const color = document.getElementById('bottom-border-color-picker').value;
    document.getElementById('bottom').style.border = `${width}px solid ${color}`;
    localStorage.setItem('bottomBorderWidth', width);
    localStorage.setItem('bottomBorderColor', color);
});

// Handle remove container border button
document.getElementById('remove-container-border').addEventListener('click', function() {
    document.getElementById('container').style.border = 'none';
    localStorage.removeItem('containerBorderColor');
    localStorage.removeItem('containerBorderWidth');
});

// Handle remove top border button
document.getElementById('remove-top-border').addEventListener('click', function() {
    document.getElementById('top').style.border = 'none';
    localStorage.removeItem('topBorderColor');
    localStorage.removeItem('topBorderWidth');
});

// Handle remove bottom border button
document.getElementById('remove-bottom-border').addEventListener('click', function() {
    document.getElementById('bottom').style.border = 'none';
    localStorage.removeItem('bottomBorderColor');
    localStorage.removeItem('bottomBorderWidth');
});

// Load container, top, and bottom borders from local storage on page load
window.addEventListener('load', function() {
    const containerBorderColor = localStorage.getItem('containerBorderColor');
    const containerBorderWidth = localStorage.getItem('containerBorderWidth');
    if (containerBorderColor && containerBorderWidth) {
        document.getElementById('container').style.border = `${containerBorderWidth}px solid ${containerBorderColor}`;
        document.getElementById('container-border-color-picker').value = containerBorderColor;
        document.getElementById('container-border-width').value = containerBorderWidth;
    }

    const topBorderColor = localStorage.getItem('topBorderColor');
    const topBorderWidth = localStorage.getItem('topBorderWidth');
    if (topBorderColor && topBorderWidth) {
        document.getElementById('top').style.border = `${topBorderWidth}px solid ${topBorderColor}`;
        document.getElementById('top-border-color-picker').value = topBorderColor;
        document.getElementById('top-border-width').value = topBorderWidth;
    }

    const bottomBorderColor = localStorage.getItem('bottomBorderColor');
    const bottomBorderWidth = localStorage.getItem('bottomBorderWidth');
    if (bottomBorderColor && bottomBorderWidth) {
        document.getElementById('bottom').style.border = `${bottomBorderWidth}px solid ${bottomBorderColor}`;
        document.getElementById('bottom-border-color-picker').value = bottomBorderColor;
        document.getElementById('bottom-border-width').value = bottomBorderWidth;
    }
});

editBordersButton.addEventListener('click', function() {
    const selectedOption = borderOption.value;
    if (selectedOption === 'container') {
        document.getElementById('container-border-modal').style.display = 'flex';
        document.getElementById('top-border-modal').style.display = 'none';
        document.getElementById('bottom-border-modal').style.display = 'none';
    } else if (selectedOption === 'top') {
        document.getElementById('container-border-modal').style.display = 'none';
        document.getElementById('top-border-modal').style.display = 'flex';
        document.getElementById('bottom-border-modal').style.display = 'none';
    } else if (selectedOption === 'bottom') {
        document.getElementById('container-border-modal').style.display = 'none';
        document.getElementById('top-border-modal').style.display = 'none';
        document.getElementById('bottom-border-modal').style.display = 'flex';
    }
});
// Handle container border radius input
document.getElementById('container-border-radius').addEventListener('input', function(event) {
    const radius = event.target.value;
    document.getElementById('container').style.borderRadius = `${radius}px`;
    localStorage.setItem('containerBorderRadius', radius);
});

// Handle top border radius input
document.getElementById('top-border-radius').addEventListener('input', function(event) {
    const radius = event.target.value;
    document.getElementById('top').style.borderRadius = `${radius}px`;
    localStorage.setItem('topBorderRadius', radius);
});

// Handle bottom border radius input
document.getElementById('bottom-border-radius').addEventListener('input', function(event) {
    const radius = event.target.value;
    document.getElementById('bottom').style.borderRadius = `${radius}px`;
    localStorage.setItem('bottomBorderRadius', radius);
});

// Load border radius from local storage on page load
window.addEventListener('load', function() {
    const containerBorderRadius = localStorage.getItem('containerBorderRadius');
    if (containerBorderRadius) {
        document.getElementById('container').style.borderRadius = `${containerBorderRadius}px`;
        document.getElementById('container-border-radius').value = containerBorderRadius;
    }

    const topBorderRadius = localStorage.getItem('topBorderRadius');
    if (topBorderRadius) {
        document.getElementById('top').style.borderRadius = `${topBorderRadius}px`;
        document.getElementById('top-border-radius').value = topBorderRadius;
    }

    const bottomBorderRadius = localStorage.getItem('bottomBorderRadius');
    if (bottomBorderRadius) {
        document.getElementById('bottom').style.borderRadius = `${bottomBorderRadius}px`;
        document.getElementById('bottom-border-radius').value = bottomBorderRadius;
    }
});

// Handle edit background button click
document.getElementById('edit-background-button').addEventListener('click', function() {
    const selectedOption = document.getElementById('background-options').value;
    if (selectedOption === 'container-background') {
        document.getElementById('container-background-modal').style.display = 'flex';
        document.getElementById('top-background-modal').style.display = 'none';
        document.getElementById('bottom-background-modal').style.display = 'none';
    } else if (selectedOption === 'top-background') {
        document.getElementById('container-background-modal').style.display = 'none';
        document.getElementById('top-background-modal').style.display = 'flex';
        document.getElementById('bottom-background-modal').style.display = 'none';
    } else if (selectedOption === 'bottom-background') {
        document.getElementById('container-background-modal').style.display = 'none';
        document.getElementById('top-background-modal').style.display = 'none';
        document.getElementById('bottom-background-modal').style.display = 'flex';
    }
});

// Handle container background color picker
document.getElementById('container-background-color-picker').addEventListener('input', function(event) {
    const color = event.target.value;
    document.getElementById('container').style.backgroundColor = color;
    localStorage.setItem('containerBackgroundColor', color);
});

// Handle container background opacity input
document.getElementById('container-background-opacity').addEventListener('input', function(event) {
    const opacity = event.target.value;
    document.getElementById('container').style.backgroundColor = `rgba(${hexToRgb(localStorage.getItem('containerBackgroundColor'))}, ${opacity})`;
    localStorage.setItem('containerBackgroundOpacity', opacity);
});

// Handle top background color picker
document.getElementById('top-background-color-picker').addEventListener('input', function(event) {
    const color = event.target.value;
    document.getElementById('top').style.backgroundColor = color;
    localStorage.setItem('topBackgroundColor', color);
});

// Handle top background opacity input
document.getElementById('top-background-opacity').addEventListener('input', function(event) {
    const opacity = event.target.value;
    document.getElementById('top').style.backgroundColor = `rgba(${hexToRgb(localStorage.getItem('topBackgroundColor'))}, ${opacity})`;
    localStorage.setItem('topBackgroundOpacity', opacity);
});

// Handle bottom background color picker
document.getElementById('bottom-background-color-picker').addEventListener('input', function(event) {
    const color = event.target.value;
    document.getElementById('bottom').style.backgroundColor = color;
    localStorage.setItem('bottomBackgroundColor', color);
});

// Handle bottom background opacity input
document.getElementById('bottom-background-opacity').addEventListener('input', function(event) {
    const opacity = event.target.value;
    document.getElementById('bottom').style.backgroundColor = `rgba(${hexToRgb(localStorage.getItem('bottomBackgroundColor'))}, ${opacity})`;
    localStorage.setItem('bottomBackgroundOpacity', opacity);
});

// Load background color and opacity from local storage on page load
window.addEventListener('load', function() {
    const containerBackgroundColor = localStorage.getItem('containerBackgroundColor');
    if (containerBackgroundColor) {
        document.getElementById('container').style.backgroundColor = containerBackgroundColor;
        document.getElementById('container-background-color-picker').value = containerBackgroundColor;
    }

    const containerBackgroundOpacity = localStorage.getItem('containerBackgroundOpacity');
    if (containerBackgroundOpacity) {
        document.getElementById('container').style.backgroundColor = `rgba(${hexToRgb(containerBackgroundColor)}, ${containerBackgroundOpacity})`;
        document.getElementById('container-background-opacity').value = containerBackgroundOpacity;
    }

    const topBackgroundColor = localStorage.getItem('topBackgroundColor');
    if (topBackgroundColor) {
        document.getElementById('top').style.backgroundColor = topBackgroundColor;
        document.getElementById('top-background-color-picker').value = topBackgroundColor;
    }

    const topBackgroundOpacity = localStorage.getItem('topBackgroundOpacity');
    if (topBackgroundOpacity) {
        document.getElementById('top').style.backgroundColor = `rgba(${hexToRgb(topBackgroundColor)}, ${topBackgroundOpacity})`;
        document.getElementById('top-background-opacity').value = topBackgroundOpacity;
    }

    const bottomBackgroundColor = localStorage.getItem('bottomBackgroundColor');
    if (bottomBackgroundColor) {
        document.getElementById('bottom').style.backgroundColor = bottomBackgroundColor;
        document.getElementById('bottom-background-color-picker').value = bottomBackgroundColor;
    }

    const bottomBackgroundOpacity = localStorage.getItem('bottomBackgroundOpacity');
    if (bottomBackgroundOpacity) {
        document.getElementById('bottom').style.backgroundColor = `rgba(${hexToRgb(bottomBackgroundColor)}, ${bottomBackgroundOpacity})`;
        document.getElementById('bottom-background-opacity').value = bottomBackgroundOpacity;
    }
});

// Helper function to convert hex color to rgb
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}