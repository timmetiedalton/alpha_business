// ── Mobile nav toggle
const hamburger = document.querySelector('.nav__hamburger');
const navLinks  = document.querySelector('.nav__links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) navLinks.classList.remove('open');
  });
}

// ── Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── Contact & registration form handling
document.querySelectorAll('form[data-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Verzenden…';
    btn.disabled = true;

    // In production: replace with a real POST (Formspree / Netlify Forms / etc.)
    setTimeout(() => {
      form.innerHTML = `
        <div style="text-align:center;padding:2rem 0">
          <div style="font-size:3rem;margin-bottom:1rem">✅</div>
          <h3 style="font-family:var(--font-heading);color:var(--navy);text-transform:uppercase;font-size:1.5rem;margin-bottom:.5rem">
            Bedankt!
          </h3>
          <p style="color:#4a5568">
            ${form.dataset.successMessage || 'Je bericht is ontvangen. We nemen zo snel mogelijk contact met je op.'}
          </p>
        </div>`;
    }, 1200);
  });
});
