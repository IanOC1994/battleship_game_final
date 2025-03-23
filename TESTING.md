## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

#### Initial

---

| Page | Screenshot | Notes |
| --- | --- | --- |
| index.html | ![screenshot](documentation/validation/html-validation-1.png) | Bad value for CSS href attribute. Fix: replace with appropriate URL for HTML validation but required for flask|
| index.html | ![screenshot](documentation/validation/html-validation-2.png) | Bad value for JavaScript href attribute. Fix: replace with appropriate URL for HTML validation but required for flask|
| index.html | ![screenshot](documentation/validation/html-validation-3.png) | Bad value for attribute aria-valuemax. Fix: replaced with aria-valuemax="2" for purpose of static validation put set back for flask to run correctly |
| index.html | ![screenshot](documentation/validation/html-validation-4.png) | Bad value for attribute id. Fix: Replace with <div id="cell-3-5"></div> for static validation but removed for final deploy version. |
| index.html | ![screenshot](documentation/validation/html-validation-5.png) | Stray end tag. Fix: remove stray tag and re-align. |

- Majority of this issue arose from use of jinja2 templating while not being rendered through Flask. These templates were removed for static validation and replaced prior to deployment.

#### Final State 

---

| Page | Screenshot | Notes |
| --- | --- | --- |
| index.html | ![screenshot](documentation/validation/html-validation-final-state.png) | Pass: No Errors |

---

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator/) to validate the CSS file for this project.

| Page | Screenshot | Notes |
| --- | --- | --- |
| style.css | ![screenshot](documentation/validation/css-validation.png) | Pass: No Errors |

---

### JavaScript

I have used [JS Hint](https://jshint.com/) to validate the JavaScript file for this project.

| Page | Screenshot | Notes |
| --- | --- | --- |
| script.js | ![screenshot](documentation/validation/js-validation.png) | Pass: No Errors |

---

### Python

I have used [Code Institute PEP8](https://pep8ci.herokuapp.com/) linter to validate the python file for this project.

| Page | Screenshot | Notes |
| --- | --- | --- |
| app.py | ![screenshot](documentation/validation/python-validation.png) | Pass: No Errors |

---

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Size | Screenshot | Notes |
| --- | --- | --- | --- |
| UI | Mobile | ![screenshot](documentation/lighthouse/lighthouse-mobile.png) | Minor render-blocking and text compression suggestions |
| UI | Desktop | ![screenshot](documentation/lighthouse/lighthouse-desktop.png) | Minor render-blocking and text compression suggestions |

---

## Responsiveness

I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device | Screenshot | Notes |
| --- | --- | --- |
| Mobile (DevTools) | ![screenshot](documentation/responsiveness/mobile.png) | Works correctly |
| Tablet (DevTools) | ![screenshot](documentation/responsiveness/tablet.png) | Works correctly  |
| Laptop & Desktop (DevTools) | ![screenshot](documentation/responsiveness/laptop-and-desktop.png) | Works correctly |

---