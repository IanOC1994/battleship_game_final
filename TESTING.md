## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

#### Initial

---

| Page | Screenshot | Notes |
| --- | --- | --- |
| UI | ![screenshot](documentation/validation/html-validation-1.png) | Bad value for CSS href attribute. Fix: replace with appropriate URL for HTML validation but required for flask|
| UI | ![screenshot](documentation/validation/html-validation-2.png) | Bad value for JavaScript href attribute. Fix: replace with appropriate URL for HTML validation but required for flask|
| UI | ![screenshot](documentation/validation/html-validation-3.png) | Bad value for attribute aria-valuemax. Fix: replaced with aria-valuemax="2" for purpose of static validation put set back for flask to run correctly |
| UI | ![screenshot](documentation/validation/html-validation-4.png) | Bad value for attribute id. Fix: Replace with <div id="cell-3-5"></div> for static validation but removed for final deploy version. |
| UI | ![screenshot](documentation/validation/html-validation-5.png) | Stray end tag. Fix: remove stray tag and re-align. |

- Majority of this issue arose from use of jinja2 templating while not being rendered through Flask. These templates were removed for static validation and replaced prior to deployment.

#### Final State 

---

| Page | Screenshot | Notes |
| --- | --- | --- |
| Home | ![screenshot](documentation/validation/html-validation-final-state.png) | Pass: No Errors |


### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator/) to validate the CSS file for this project.

| Page | Screenshot | Notes |
| --- | --- | --- |
| style.css | ![screenshot](documentation/validation/css-validation.png) | Pass: No Errors |