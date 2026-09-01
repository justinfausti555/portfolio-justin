const projectData = {
  cybersecurity: {
    category: 'Security',
    title: 'Cybersecurity Dashboard',
    overview:
      'A monitoring-focused security interface designed to provide rapid visibility into threats, system health, and operational risk across critical digital environments.',
    features: [
      'Threat detection and escalation',
      'Security alert prioritization',
      'Network activity monitoring',
      'System health overview',
      'Security log review',
      'Live activity charts'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Security UX', 'Monitoring', 'Visualization'],
    useCases: ['Operational security desks', 'Vulnerability review', 'Threat response workflows'],
    benefits: ['Better incident awareness', 'Faster response times', 'Clear operational visibility']
  },
  portal: {
    category: 'Web Experience',
    title: 'Web Portal',
    overview:
      'A polished digital portal concept built around clear navigation, secure access patterns, and a highly structured service experience for users and teams.',
    features: [
      'Dashboard overview',
      'User profile access',
      'Notifications center',
      'Document management',
      'Navigation system',
      'Authentication workflow'
    ],
    technologies: ['Responsive UI', 'Access design', 'Front-end structure', 'UX patterns', 'Workflow logic'],
    useCases: ['Client portals', 'Internal dashboards', 'User management experiences'],
    benefits: ['Improved clarity', 'Strong user trust', 'Efficient daily workflows']
  },
  automation: {
    category: 'Automation',
    title: 'Automation & Monitoring',
    overview:
      'A systems orchestration concept that blends workflow automation, clear task tracking, and continuous monitoring for better reliability and faster response cycles.',
    features: [
      'Automation flow design',
      'System monitoring',
      'Task status tracking',
      'Activity logs',
      'Notifications and alerts',
      'Operational metrics'
    ],
    technologies: ['Workflow modeling', 'Monitoring patterns', 'Process design', 'Task visibility', 'Operational UX'],
    useCases: ['DevOps operations', 'Business workflows', 'System health reporting'],
    benefits: ['Reduced manual effort', 'Visible performance trends', 'Faster issue awareness']
  },
  infrastructure: {
    category: 'Infrastructure',
    title: 'Security & Infrastructure',
    overview:
      'An infrastructure concept highlighting resilient server architecture, network health indicators, firewall visibility, and dependable system monitoring.',
    features: [
      'Server infrastructure visibility',
      'Network monitoring',
      'Firewall security indicators',
      'System health checks',
      'Infrastructure status view',
      'Operational resilience reporting'
    ],
    technologies: ['Infrastructure design', 'Security monitoring', 'Network insight', 'System health', 'Operational dashboards'],
    useCases: ['Hosting review', 'Platform audits', 'Security architecture planning'],
    benefits: ['More stable operations', 'Health-based decision making', 'Stronger resilience']
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalOverview = document.getElementById('modalOverview');
const modalFeatures = document.getElementById('modalFeatures');
const modalTech = document.getElementById('modalTech');
const modalUseCases = document.getElementById('modalUseCases');
const modalBenefits = document.getElementById('modalBenefits');
const modalClose = document.querySelector('.modal__close');
const modalBack = document.querySelector('.modal__back');
const modalBackdrop = document.querySelector('.modal__backdrop');
const body = document.body;

function renderList(target, items) {
  target.innerHTML = ''; 

  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    target.appendChild(li);
  });
}

function openProjectModal(key) {
  const project = projectData[key];

  if (!project) return;

  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category;
  modalOverview.textContent = project.overview;
  renderList(modalFeatures, project.features);
  renderList(modalTech, project.technologies);
  renderList(modalUseCases, project.useCases);
  renderList(modalBenefits, project.benefits);

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
}

function closeProjectModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
}

document.querySelectorAll('.is-project').forEach((button) => {
  button.addEventListener('click', () => {
    openProjectModal(button.dataset.project);
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeProjectModal);
}

if (modalBack) {
  modalBack.addEventListener('click', closeProjectModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeProjectModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeProjectModal();
  }
});

const menuLinks = document.querySelectorAll('.menu a');
const sections = [...document.querySelectorAll('main section[id]')];

function setActiveLink() {
  const scrollPosition = window.scrollY + 140;
  let activeId = sections[0]?.id || '';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeId = section.id;
    }
  });

  menuLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', isActive);
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
