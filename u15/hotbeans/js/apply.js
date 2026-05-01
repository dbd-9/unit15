/* ============================================================
   HOT BEANS WEB — apply.js
   Client-side validation for the application form.
   Validates on submit, shows per-field errors,
   and replaces the form with a success message on pass.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form           = document.getElementById('application-form');
  const successMessage = document.getElementById('success-message');

  if (!form || !successMessage) return;

  /* ── helpers ─────────────────────────────────────────────── */

  function showError(input, errorEl) {
    input.classList.add('error');
    errorEl.classList.add('visible');
  }

  function clearError(input, errorEl) {
    input.classList.remove('error');
    errorEl.classList.remove('visible');
  }

  /* ── submit handler ──────────────────────────────────────── */

  form.addEventListener('submit', event => {
    event.preventDefault();
    let isValid = true;

    /* 1 · Full Name — not empty */
    const fullName      = document.getElementById('full-name');
    const fullNameError = document.getElementById('full-name-error');

    if (!fullName.value.trim()) {
      showError(fullName, fullNameError);
      isValid = false;
    } else {
      clearError(fullName, fullNameError);
    }

    /* 2 · Email — basic pattern */
    const email      = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
      showError(email, emailError);
      isValid = false;
    } else {
      clearError(email, emailError);
    }

    /* 3 · Phone — UK format */
    const phone      = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    // Accepts +44 or 0 prefix, then 9–12 digits/spaces
    const phoneRegex = /^(\+44|0)[0-9\s]{9,12}$/;

    if (!phoneRegex.test(phone.value.trim())) {
      showError(phone, phoneError);
      isValid = false;
    } else {
      clearError(phone, phoneError);
    }

    /* 4 · Position — not empty / not the disabled placeholder */
    const position      = document.getElementById('position');
    const positionError = document.getElementById('position-error');

    if (!position.value) {
      showError(position, positionError);
      isValid = false;
    } else {
      clearError(position, positionError);
    }

    /* 5 · CV — file selected with accepted extension */
    const cvUpload  = document.getElementById('cv-upload');
    const cvError   = document.getElementById('cv-error');
    const allowedExt = ['.pdf', '.doc', '.docx'];
    let cvValid = false;

    if (cvUpload.files && cvUpload.files.length > 0) {
      const fileName = cvUpload.files[0].name.toLowerCase();
      cvValid = allowedExt.some(ext => fileName.endsWith(ext));
    }

    if (!cvValid) {
      showError(cvUpload, cvError);
      isValid = false;
    } else {
      clearError(cvUpload, cvError);
    }

    /* 6 · Cover letter — minimum 20 characters */
    const coverLetter      = document.getElementById('cover-letter');
    const coverLetterError = document.getElementById('cover-letter-error');

    if (coverLetter.value.trim().length < 20) {
      showError(coverLetter, coverLetterError);
      isValid = false;
    } else {
      clearError(coverLetter, coverLetterError);
    }

    /* 7 · Declaration checkbox — must be checked */
    const declaration      = document.getElementById('declaration');
    const declarationError = document.getElementById('declaration-error');

    if (!declaration.checked) {
      declarationError.classList.add('visible');
      isValid = false;
    } else {
      declarationError.classList.remove('visible');
    }

    /* ── on success ──────────────────────────────────────────── */
    if (isValid) {
      form.style.display = 'none';
      successMessage.style.display = 'block';
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Scroll to the first error so it's visible
      const firstError = form.querySelector('.error, .error-message.visible');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
});
