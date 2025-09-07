# Gemini Code Assistant Guide

This document provides guidance for the Gemini code assistant on how to work with this project.

## About the Project

This is a simple, single-page personal portfolio website for Dani Arthur Widodo. It's built with plain HTML, CSS, and JavaScript. The website showcases personal information, projects, and a contact form.

## File Structure

- `index.html`: The main and only HTML file for the website.
- `style.css`: Contains all the styles for the website.
- `script.js`: Contains JavaScript for client-side interactivity (e.g., smooth scrolling).
- `docs/data.json`: Contains personal data, such as name, role, experience, and skills. **Note: This data is not currently used to dynamically populate the website. The content in `index.html` is static.**
- `assets/images/`: Contains image assets for the website.

## Development Workflow

### Updating Personal Information

To update personal information such as the "About Me" section, skills, or experience, you should:

1.  **Modify `docs/data.json`**: Update the relevant fields in this file.
2.  **Modify `index.html`**: Manually update the corresponding content in the `index.html` file to reflect the changes from `docs/data.json`.

**Example:** To change the "About Me" text, you would update the `bio` field in `docs/data.json` and then copy that text into the `<p>` tag within the `#about` section in `index.html`.

### Adding a New Project

To add a new project to the portfolio:

1.  **Add project data to `docs/data.json`**: If you want to keep the data consistent, add a new project object to the `projects` array in `docs/data.json`. (Note: a `projects` array does not exist yet, so you might need to create it).
2.  **Add a new project card in `index.html`**: In the `#projects` section, add a new `<div class="project-card">` with the project's image, title, and description.

```html
<div class="project-card">
    <img src="path/to/your/image.jpg" alt="New Project">
    <h3>New Project Title</h3>
    <p>A brief description of the new project.</p>
</div>
```

## Conventions

- **Keep it simple**: The project uses plain HTML, CSS, and JavaScript. Avoid introducing complex libraries or frameworks unless specifically requested.
- **Static content**: The website is currently static. When updating content, edit the `index.html` file directly. While `docs/data.json` exists, it is not dynamically loaded. Future work might involve using JavaScript to fetch and render this data.
- **CSS Styling**: Follow the existing styling conventions in `style.css`. Use the existing color palette and component styles.
- **JavaScript**: The `script.js` file is for simple enhancements. Any new JavaScript should be clean, well-commented, and vanilla (no jQuery or other libraries).
