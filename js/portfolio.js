document.addEventListener('DOMContentLoaded', () => {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                const categories = item.dataset.category.split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Navigate to project detail page when clicking a portfolio item
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            window.location.href = `project-detail.html?id=${projectId}`;
        });
    });
}); 