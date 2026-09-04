import { useEffect, useState } from 'react';
import './App.css';
import WorldScene from './components/WorldScene';
import { navigation, personalInfo, projectItems, skillItems } from './data/portfolioData';
import justinPortraitMain from './assets/portraits/justin-1.jpeg';
import justinPortrait2 from './assets/portraits/justin-2.jpeg';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSkill, setActiveSkill] = useState(skillItems[0]);

  useEffect(() => {
    document.title = 'Justin Faustino — Developer & Cybersecurity Enthusiast';

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');

    if (!cursor || window.matchMedia('(pointer: coarse)').matches) {
      return undefined;
    }

    const handleMove = (event) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };

    const handleEnter = () => {
      cursor.classList.add('is-active');
    };

    const handleLeave = () => {
      cursor.classList.remove('is-active');
    };

    document.addEventListener('pointermove', handleMove);
    document.querySelectorAll('button, a, .skill-card, .project-card, .info-blob').forEach((element) => {
      element.addEventListener('pointerenter', handleEnter);
      element.addEventListener('pointerleave', handleLeave);
    });

    return () => {
      document.removeEventListener('pointermove', handleMove);
      document.querySelectorAll('button, a, .skill-card, .project-card, .info-blob').forEach((element) => {
        element.removeEventListener('pointerenter', handleEnter);
        element.removeEventListener('pointerleave', handleLeave);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const enterWorld = () => {
    scrollToSection('explore');
  };

  return (
    <div className="portfolio-shell">
      <div className="custom-cursor" aria-hidden="true" />

      {loading && (
        <div className="loading-screen" aria-live="polite">
          <div className="loading-orb">
            <span className="jf-mark">JF</span>
          </div>
          <div className="loading-bar">
            <span />
          </div>
        </div>
      )}

      <header className="topbar">
        <div className="brand-wrap" onClick={() => scrollToSection('enter')} role="button" tabIndex={0} onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            scrollToSection('enter');
          }
        }}>
          <div className="brand-mark">JF</div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button key={item.label} type="button" className="nav-link" onClick={() => scrollToSection(item.href.replace('#', ''))}>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <section id="enter" className="hero-section panel-surface">
          <div className="hero-copy">
            <p className="eyebrow">Luanda, Angola</p>
            <h1>
              Hi, I&apos;m Justin <span aria-hidden="true">👋</span>
            </h1>
            <p className="role-line">{personalInfo.role}</p>
            <div className="hero-actions">
              <button type="button" className="primary-btn" onClick={enterWorld}>
                ENTER MY WORLD
              </button>
              <a href={`mailto:${personalInfo.email}`} className="secondary-btn">
                LET&apos;S TALK
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Justin's 3D workspace">
            <WorldScene />
            <div className="portrait-frame">
              <img src={justinPortraitMain} alt="Justin Faustino portrait" />
              <div className="portrait-label">JF / Builder</div>
            </div>
          </div>
        </section>

        <section id="explore" className="story-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Explore</p>
            <h2>My digital world</h2>
          </div>

          <div className="explore-grid">
            <article className="info-blob">
              <span className="blob-tag">Developer</span>
              <h3>Building products with logic, craft and curiosity</h3>
            </article>
            <article className="info-blob">
              <span className="blob-tag">Cybersecurity</span>
              <h3>Thinking like an attacker, protecting like a builder</h3>
            </article>
            <article className="info-blob">
              <span className="blob-tag">Learning</span>
              <h3>Constantly exploring systems, networks and technology</h3>
            </article>
          </div>
        </section>

        <section id="about" className="about-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Developer. Analyst. Problem solver.</h2>
          </div>

          <div className="about-layout">
            <div className="about-visual">
              <div className="terminal-window">
                <div className="window-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <pre>{`$ whoami
justin.faustino

$ focus
software development
cybersecurity
computer networks
technology
continuous learning`}</pre>
              </div>
            </div>

            <div className="about-copy">
              <p>
                I&apos;m Justin Faustino, a young developer from Luanda, Angola, with a strong interest in building meaningful digital experiences and understanding the systems behind them.
              </p>
              <p>
                My path blends software development, programming, cybersecurity, and computer networks, always grounded in continuous learning and practical problem solving.
              </p>

              <div className="meta-list">
                <div>
                  <span className="meta-label">Education</span>
                  <strong>{personalInfo.education}</strong>
                </div>
                <div>
                  <span className="meta-label">Location</span>
                  <strong>{personalInfo.location}</strong>
                </div>
                <div>
                  <span className="meta-label">Languages</span>
                  <strong>{personalInfo.languages.join(' • ')}</strong>
                </div>
              </div>

              <div className="portrait-gallery" aria-label="Portrait gallery">
                <div className="portrait-tile">
                  <img src={justinPortraitMain} alt="Justin portrait variant 1" />
                </div>
                <div className="portrait-tile">
                  <img src={justinPortrait2} alt="Justin portrait variant 2" />
                </div>
                <div className="portrait-tile">
                  <img src={justinPortraitMain} alt="Justin portrait variant 4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Tools, systems and digital craft</h2>
          </div>

          <div className="skills-layout">
            <div className="skill-grid">
              {skillItems.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  className={`skill-card ${activeSkill.name === skill.name ? 'is-active' : ''}`}
                  onClick={() => setActiveSkill(skill)}
                  style={{ '--skill-accent': skill.accent }}
                >
                  <span>{skill.name}</span>
                </button>
              ))}
            </div>

            <aside className="skill-panel" style={{ '--skill-accent': activeSkill.accent }}>
              <div className="panel-glow" />
              <span className="panel-label">Signal</span>
              <h3>{activeSkill.name}</h3>
              <p>{activeSkill.short}</p>
            </aside>
          </div>
        </section>

        <section id="projects" className="projects-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Projects</p>
            <h2>Experiments and creative builds</h2>
          </div>

          <div className="project-grid">
            {projectItems.map((project) => (
              <article key={project.name} className="project-card">
                <div className="project-screen">
                  <span>{project.preview}</span>
                </div>
                <div className="project-body">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a href={project.link}>View</a>
                    <a href={project.demo}>Preview</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="cybersecurity" className="cyber-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Cybersecurity</p>
            <h2>Securing systems with clarity and intent</h2>
          </div>

          <div className="cyber-layout">
            <div className="shield-scene" aria-hidden="true">
              <div className="shield-core" />
              <div className="ring ring-one" />
              <div className="ring ring-two" />
              <div className="ring ring-three" />
            </div>

            <div className="cyber-copy">
              <p>
                I approach technology with a security mindset: understanding networks, protecting systems and creating resilient digital experiences.
              </p>
              <ul>
                <li>Security awareness</li>
                <li>Network thinking</li>
                <li>System reliability</li>
                <li>Defense-focused development</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s build something amazing.</h2>
          </div>

          <div className="contact-grid">
            <a href={`mailto:${personalInfo.email}`} className="contact-card">
              <span>Email</span>
              <strong>{personalInfo.email}</strong>
            </a>
            <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="contact-card">
              <span>Phone</span>
              <strong>{personalInfo.phone}</strong>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="contact-card">
              <span>GitHub</span>
              <strong>{personalInfo.github}</strong>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
