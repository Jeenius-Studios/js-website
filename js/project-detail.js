document.addEventListener('DOMContentLoaded', () => {
    // Get the project ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        console.error('No project ID provided');
        window.location.href = 'portfolio.html';
        return;
    }

    if (!projectData) {
        console.error('Project data not loaded');
        window.location.href = 'portfolio.html';
        return;
    }

    const project = projectData[projectId];
    
    if (!project) {
        console.error('Project not found:', projectId);
        window.location.href = 'portfolio.html';
        return;
    }

    try {
        // Update page title
        document.title = `${project.title} - Jeenius Studios`;
        
        // Update content
        document.getElementById('projectTitle').textContent = project.title;
        document.getElementById('projectDescription').textContent = project.description;
        document.getElementById('projectClient').textContent = project.client;
        document.getElementById('projectServices').textContent = project.services;
        document.getElementById('projectYear').textContent = project.year;
        
        // Update categories
        document.getElementById('projectCategories').innerHTML = project.categories
            .map(category => `<span class="project-category">${category}</span>`)
            .join(' • ');

        // Update images
        const projectImage = document.getElementById('projectImage');
        const projectImageCaption = document.getElementById('projectImageCaption');
        const galleryGrid = document.getElementById('projectGallery');

        // Set main image and caption
        const mainImage = project.images[0];
        projectImage.src = mainImage.src || mainImage; // Handle both new and old format
        projectImage.alt = project.title;
        if (mainImage.caption) {
            projectImageCaption.textContent = mainImage.caption;
            projectImageCaption.style.display = 'block';
        } else {
            projectImageCaption.style.display = 'none';
        }

        // Create gallery grid if there are additional images
        if (project.images.length > 1) {
            galleryGrid.innerHTML = project.images
                .map((image, index) => {
                    const imgSrc = image.src || image;
                    const imgCaption = image.caption || '';
                    return `
                        <div class="gallery-item" 
                            onclick="updateMainImage('${imgSrc}', '${imgCaption.replace(/'/g, "\\'")}')">
                            <img src="${imgSrc}" 
                                alt="${project.title} - Image ${index + 1}">
                        </div>
                    `;
                }).join('');
        }
    } catch (error) {
        console.error('Error updating project details:', error);
        window.location.href = 'portfolio.html';
    }
});

function updateMainImage(src, caption) {
    const projectImage = document.getElementById('projectImage');
    const projectImageCaption = document.getElementById('projectImageCaption');
    
    projectImage.src = src;
    if (caption) {
        projectImageCaption.textContent = caption;
        projectImageCaption.style.display = 'block';
    } else {
        projectImageCaption.style.display = 'none';
    }
}