const modeButtons = document.querySelectorAll('[data-mode]');
const forms = {
  login: document.querySelector('#login-form'),
  register: document.querySelector('#register-form')
};
const title = document.querySelector('#page-title');
const intro = document.querySelector('#intro');
const feedback = document.querySelector('#feedback');

function setPasswordVisibility(button, visible) {
  const input = document.getElementById(button.getAttribute('aria-controls'));
  input.type = visible ? 'text' : 'password';
  const action = visible ? 'Hide' : 'Show';
  button.textContent = action;
  button.setAttribute('aria-label', action + button.dataset.labelSuffix);
}

function switchMode(mode) {
  if (!forms[mode].hidden) return;

  for (const [name, form] of Object.entries(forms)) {
    form.hidden = name !== mode;
    form.querySelector('fieldset').disabled = form.hidden;
    if (form.hidden) {
      // Don't carry a visible password over when switching forms.
      form.querySelectorAll('.reveal').forEach(button => setPasswordVisibility(button, false));
    }
  }

  modeButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
  });

  const registering = mode === 'register';
  title.textContent = registering ? 'Create an account.' : 'Welcome back.';
  intro.textContent = registering ? 'Set up your Fieldnote workspace.' : 'Log in to your Fieldnote workspace.';
  feedback.textContent = '';
}

function validate(input) {
  let message = '';

  if (input.type === 'email') {
    if (!input.value) message = 'Enter your email address.';
    else if (input.validity.typeMismatch) message = 'Enter a valid email address, like you@example.com.';
  } else if (input.id === 'register-confirm') {
    if (!input.value) message = 'Confirm your password.';
    else if (input.value !== document.querySelector('#register-password').value) {
      message = 'Passwords do not match.';
    }
  } else if (!input.value) {
    message = 'Enter your password.';
  } else if (input.value.length < input.minLength) {
    message = 'Use at least ' + input.minLength + ' characters.';
  }

  const error = document.getElementById(input.id + '-error');
  if (error.textContent !== message) error.textContent = message;
  if (message) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
  return !message;
}

for (const [mode, form] of Object.entries(forms)) {
  const fields = [...form.querySelectorAll('input')];

  for (const input of fields) {
    input.addEventListener('input', () => {
      feedback.textContent = '';
      validate(input);
      // Recheck confirmation if the original password changes.
      if (input.id === 'register-password') {
        const confirm = document.querySelector('#register-confirm');
        if (confirm.value || confirm.hasAttribute('aria-invalid')) validate(confirm);
      }
    });
    input.addEventListener('blur', () => {
      if (input.value) validate(input);
    });
  }

  form.querySelectorAll('.reveal').forEach(button => {
    button.dataset.labelSuffix = button.getAttribute('aria-label').slice(4);
    const input = document.getElementById(button.getAttribute('aria-controls'));
    button.addEventListener('click', () => setPasswordVisibility(button, input.type === 'password'));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    feedback.textContent = '';
    const invalid = fields.filter(input => !validate(input));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    // The demo checks the form without creating an account or sending data.
    form.reset();
    form.querySelectorAll('.reveal').forEach(button => setPasswordVisibility(button, false));
    feedback.textContent = mode === 'register'
      ? 'Registration form passed validation. No account was created.'
      : 'Login form passed validation. No sign-in took place.';
  });
}

forms.login.querySelector('fieldset').disabled = false;
modeButtons.forEach(button => {
  button.disabled = false;
  button.addEventListener('click', () => switchMode(button.dataset.mode));
});
