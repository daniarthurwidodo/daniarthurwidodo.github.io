document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Bulma navbar burger
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }

    // Sticky navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolling down
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });

    fetch('references/docs/data.json')
        .then(response => response.json())
        .then(data => {
            populateUI(data);
        });

    // PDF Generation
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', async () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Fetch data again for PDF generation
            const response = await fetch('references/docs/data.json');
            const data = await response.json();

            let yPos = 20;

            // Name and Role
            doc.setFontSize(22);
            doc.text(data.name, 20, yPos);
            yPos += 10;
            doc.setFontSize(14);
            doc.text(data.role, 20, yPos);
            yPos += 20;

            // About Me
            doc.setFontSize(16);
            doc.text('About Me', 20, yPos);
            yPos += 7;
            doc.setFontSize(12);
            const splitBio = doc.splitTextToSize(data.bio, 170);
            doc.text(splitBio, 20, yPos);
            yPos += (splitBio.length * 7) + 10;

            // Contact Information
            doc.setFontSize(16);
            doc.text('Contact Information', 20, yPos);
            yPos += 7;
            doc.setFontSize(12);
            doc.text(`Email: ${data["contact information"].email || 'N/A'}`, 20, yPos);
            yPos += 7;
            doc.text(`Phone: ${data["contact information"].mobile || 'N/A'}`, 20, yPos);
            yPos += 7;
            doc.text(`GitHub: ${data["contact information"].github || 'N/A'}`, 20, yPos);
            yPos += 7;
            doc.text(`LinkedIn: ${data["contact information"].linkedin || 'N/A'}`, 20, yPos);
            yPos += 20;

            // Education
            if (data.education) {
                doc.setFontSize(16);
                doc.text('Education', 20, yPos);
                yPos += 7;
                doc.setFontSize(12);
                doc.text(`${data.education.degree} from ${data.education.institution}`, 20, yPos);
                yPos += 7;
                doc.text(`Graduation Year: ${data.education.year}`, 20, yPos);
                yPos += 20;
            }

            // Skills
            doc.setFontSize(16);
            doc.text('Skills', 20, yPos);
            yPos += 7;
            doc.setFontSize(12);
            if (data.skills && data.skills.length > 0) {
                const skillsText = data.skills.join(', ');
                const splitSkills = doc.splitTextToSize(skillsText, 170);
                doc.text(splitSkills, 20, yPos);
                yPos += (splitSkills.length * 7) + 15;
            } else {
                doc.text('Skills not specified', 20, yPos);
                yPos += 15;
            }

            // Experience
            doc.setFontSize(16);
            doc.text('Experience', 20, yPos);
            yPos += 7;
            doc.setFontSize(12);
            if (data.experience && data.experience.length > 0) {
                data.experience.forEach(exp => {
                    // Check if we need a new page
                    if (yPos > 250) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    doc.setFontSize(14);
                    doc.text(`${exp.position} at ${exp.company}`, 20, yPos);
                    yPos += 7;
                    doc.setFontSize(10);
                    doc.text(exp.duration, 20, yPos);
                    yPos += 7;
                    
                    doc.setFontSize(12);
                    if (exp.responsibilities && exp.responsibilities.length > 0) {
                        exp.responsibilities.forEach(resp => {
                            const splitResp = doc.splitTextToSize(`• ${resp}`, 160);
                            doc.text(splitResp, 25, yPos);
                            yPos += (splitResp.length * 5) + 2;
                        });
                    }
                    yPos += 8;
                });
            } else {
                doc.text('Experience details not specified', 20, yPos);
                yPos += 15;
            }

            // Projects
            if (data.projects && data.projects.length > 0) {
                // Check if we need a new page
                if (yPos > 200) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.setFontSize(16);
                doc.text('Projects', 20, yPos);
                yPos += 7;
                doc.setFontSize(12);
                
                data.projects.forEach(project => {
                    if (yPos > 250) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    doc.setFontSize(14);
                    doc.text(project.title, 20, yPos);
                    yPos += 7;
                    doc.setFontSize(12);
                    const splitDesc = doc.splitTextToSize(project.description, 170);
                    doc.text(splitDesc, 20, yPos);
                    yPos += (splitDesc.length * 7) + 8;
                });
            }

            // Add footer with generation date
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text(`Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`, 20, 285);
                doc.text(`Portfolio of ${data.name}`, 140, 285);
            }

            doc.save(`${data.name.replace(/ /g, '_')}_CV.pdf`);
        });
    }
});

function populateUI(data) {
    // Populate logo
    document.getElementById('logo').textContent = data.name;

    // Populate hero section
    document.getElementById('hero-title').textContent = `I'm ${data.name}.`;
    document.getElementById('hero-subtitle').innerHTML = `I'm a ${data.role.toLowerCase()} specializing in building exceptional software. Currently I am focused on building products at <span style="color: #64ffda;">Second Company</span>.`;

    // Populate about me
    document.getElementById('about-bio').textContent = data.bio;

    // Populate projects
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = ''; // Clear existing projects
    data.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectContainer.appendChild(projectCard);
    });

    // Populate contact information
    const contactInfoContainer = document.getElementById('contact-info');
    contactInfoContainer.innerHTML = ''; // Clear existing contact info
    
    // Add email contact
    if (data.email) {
        const emailItem = document.createElement('div');
        emailItem.className = 'contact-item';
        emailItem.innerHTML = `
            <i data-lucide="mail"></i>
            <a href="mailto:${data.email}">${data.email}</a>
        `;
        contactInfoContainer.appendChild(emailItem);
    }

    // Add phone contact
    if (data.mobile) {
        const phoneItem = document.createElement('div');
        phoneItem.className = 'contact-item';
        phoneItem.innerHTML = `
            <i data-lucide="phone"></i>
            <a href="tel:${data.mobile}">${data.mobile}</a>
        `;
        contactInfoContainer.appendChild(phoneItem);
    }

    // Add GitHub contact
    if (data.github) {
        const githubItem = document.createElement('div');
        githubItem.className = 'contact-item';
        githubItem.innerHTML = `
            <i data-lucide="github"></i>
            <a href="${data.github}" target="_blank">GitHub Profile</a>
        `;
        contactInfoContainer.appendChild(githubItem);
    }

    // Add LinkedIn contact
    if (data.linkedin) {
        const linkedinItem = document.createElement('div');
        linkedinItem.className = 'contact-item';
        linkedinItem.innerHTML = `
            <i data-lucide="linkedin"></i>
            <a href="${data.linkedin}" target="_blank">LinkedIn Profile</a>
        `;
        contactInfoContainer.appendChild(linkedinItem);
    }

    // Populate social icons in footer
    const socialIconsContainer = document.getElementById('social-icons');
    socialIconsContainer.innerHTML = `
        <a href="${data.github}" target="_blank"><i data-lucide="github"></i></a>
        <a href="${data.linkedin}" target="_blank"><i data-lucide="linkedin"></i></a>
    `;

    // Re-create icons
    lucide.createIcons();
}