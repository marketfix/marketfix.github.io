document.addEventListener('DOMContentLoaded', () => {
    // Coupon interactions: reveal code, copy to clipboard and open link
    document.querySelectorAll('.coupon-code').forEach(el => {
        el.addEventListener('click', event => {
            const fullCode = el.dataset.code;
            const url = el.dataset.url;
            // Reveal the blurred part
            const blurred = el.querySelector('span.blur');
            if (blurred) blurred.classList.remove('blur');
            // Copy to clipboard if available
            if (navigator.clipboard) {
                navigator.clipboard.writeText(fullCode).catch(() => {});
            }
            // Open affiliate link in new tab
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // Set up category filtering, sorting and pagination
    const cards = Array.from(document.querySelectorAll('.card-link'));
    const navLinks = document.querySelectorAll('nav .nav-links a[data-category]');
    const sortSelect = document.getElementById('sort-select');
    let currentCategory = 'all';
    let currentSort = 'default';
    let currentPage = 1;
    const itemsPerPage = 12; // four rows of three cards on wider screens

    function render() {
        // Filter by category
        let filtered = cards;
        if (currentCategory !== 'all') {
            filtered = cards.filter(card => card.dataset.category === currentCategory);
        }
        // Sort alphabetically if requested
        if (currentSort === 'az') {
            filtered.sort((a, b) => a.querySelector('h2').textContent.localeCompare(b.querySelector('h2').textContent));
        } else if (currentSort === 'za') {
            filtered.sort((a, b) => b.querySelector('h2').textContent.localeCompare(a.querySelector('h2').textContent));
        }
        // Hide all cards
        cards.forEach(card => {
            card.style.display = 'none';
        });
        // Show only cards for the current page
        const start = (currentPage - 1) * itemsPerPage;
        const pageItems = filtered.slice(start, start + itemsPerPage);
        pageItems.forEach(card => {
            card.style.display = 'block';
        });
        // Update pagination controls
        updatePagination(filtered.length);
        // Update active nav state
        navLinks.forEach(link => {
            if (link.dataset.category === currentCategory) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function updatePagination(totalItems) {
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;
        pagination.innerHTML = '';
        const pageCount = Math.max(1, Math.ceil(totalItems / itemsPerPage));
        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = i === currentPage ? 'active' : '';
            btn.addEventListener('click', () => {
                currentPage = i;
                render();
            });
            pagination.appendChild(btn);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            currentCategory = link.dataset.category;
            currentPage = 1;
            render();
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            currentPage = 1;
            render();
        });
    }

    // Burger menu toggle
    const burger = document.querySelector('.burger-menu');
    const navLinkContainer = document.querySelector('nav .nav-links');
    if (burger && navLinkContainer) {
        burger.addEventListener('click', () => {
            navLinkContainer.classList.toggle('active');
        });
    }

    // Perform initial rendering
    render();
});