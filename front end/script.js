const contactForm = document.getElementById('contactForm');
const msgEl = document.getElementById('msg');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('input[type="submit"]');
        submitBtn.value    = 'Sending…';
        submitBtn.disabled = true;
        msgEl.textContent  = '';

        const body = {
            Name:    document.querySelector('input[name="name"]').value,
            Email:   document.querySelector('input[name="email"]').value,
            Mobile:  document.querySelector('input[name="mobile"]').value || '',
            Subject: document.querySelector('input[name="subject"]').value,
            Message: document.querySelector('textarea[name="message"]').value,
        };

        try {
            const res  = await fetch('http://localhost:3000/contact', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(body),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                msgEl.style.color = '#00e5ff';
                msgEl.textContent = data.message;
                contactForm.reset();
            } else {
                msgEl.style.color = '#ff4b4b';
                msgEl.textContent = data.message || 'Something went wrong.';
            }
        } catch (err) {
            msgEl.style.color = '#ff4b4b';
            msgEl.textContent = 'Could not reach server. Please try again later.';
        } finally {
            submitBtn.value    = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}