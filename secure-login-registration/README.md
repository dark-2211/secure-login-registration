# Fieldnote — Login and Registration Interface

Extract the ZIP and open `index.html` in your browser. No installer, packages, or server are needed.

- `index.html` contains both forms, their labels, and the password controls.
- `style.css` handles the desktop and mobile layouts, keyboard focus, and error states.
- `script.js` switches forms, checks input as you type, and handles submission.

## Try it

1. Submit an empty form to see required-field messages and focus move to the first error.
2. Enter an invalid email and correct it to `sam@example.com`.
3. Switch to Register. Enter a password shorter than eight characters, then try `demo-pass123`.
4. Enter a different confirmation, fix it, and change the original password to see the match rechecked.
5. Use Tab and Enter to reveal and hide passwords, switch forms, and submit.

Both forms are simulations. No details are sent or saved, and passing validation does not create an account or sign anyone in. A production version needs server-side validation and a real authentication system.

[MDN — Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
