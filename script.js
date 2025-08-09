
document.addEventListener('DOMContentLoaded', () => {
    // Hook up coupon interactions
    document.querySelectorAll('.coupon-code').forEach(el => {
        el.addEventListener('click', event => {
            const fullCode = el.dataset.code;
            const url = el.dataset.url;
            // Reveal the blurred part
            const blurred = el.querySelector('span.blur');
            if (blurred) blurred.classList.remove('blur');
            // Copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(fullCode).catch(() => {});
            }
            // Open affiliate link in new tab
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // Hook up comment forms
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const confirmation = form.querySelector('.comment-confirmation');
            if (confirmation) {
                confirmation.style.display = 'block';
                setTimeout(() => {
                    confirmation.style.display = 'none';
                    form.reset();
                }, 3000);
            }
        });
    });
});
