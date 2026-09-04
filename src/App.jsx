import { useEffect, useState } from 'react';
import './App.css';
import WorldScene from './components/WorldScene';
import { navigation, personalInfo, projectItems, skillItems } from './data/portfolioData';
import justinPortraitMain from './assets/portraits/justin-1.jpeg';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSkill, setActiveSkill] = useState(skillItems[0]);

  useEffect(() => {
    document.title = 'Justin Faustino — Desenvolvedor e Entusiasta de Cibersegurança';

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

        <nav className="nav" aria-label="Navegação principal">
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
              Olá, sou o Justin <span aria-hidden="true">👋</span>
            </h1>
            <p className="role-line">{personalInfo.role}</p>
            <div className="hero-actions">
              <button type="button" className="primary-btn" onClick={enterWorld}>
                ENTRAR NO MEU MUNDO
              </button>
              <a href={`mailto:${personalInfo.email}`} className="secondary-btn">
                VAMOS CONVERSAR
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Espaço de trabalho 3D do Justin">
            <WorldScene />
            <div className="portrait-frame">
              <img src={justinPortraitMain} alt="Retrato de Justin Faustino" />
              <div className="portrait-label">JF / Criador</div>
            </div>
          </div>
        </section>

        <section id="explore" className="story-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Explorar</p>
            <h2>O meu mundo digital</h2>
          </div>

          <div className="explore-grid">
            <article className="info-blob">
              <span className="blob-tag">Desenvolvimento</span>
              <h3>A criar produtos com lógica, cuidado e curiosidade</h3>
            </article>
            <article className="info-blob">
              <span className="blob-tag">Cibersegurança</span>
              <h3>A pensar como atacante e a proteger como criador</h3>
            </article>
            <article className="info-blob">
              <span className="blob-tag">Aprendizagem</span>
              <h3>A explorar continuamente sistemas, redes e tecnologia</h3>
            </article>
          </div>
        </section>

        <section id="about" className="about-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Sobre mim</p>
            <h2>Desenvolvedor. Analista. Solucionador de problemas.</h2>
          </div>

          <div className="about-layout">
            <div className="about-visual">
              <div className="terminal-window">
                <div className="window-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <pre>{`$ quem-sou
justin.faustino

$ foco
desenvolvimento de software
cibersegurança
redes de computadores
tecnologia
aprendizagem contínua`}</pre>
              </div>
            </div>

            <div className="about-copy">
              <p>
                Sou Justin Faustino, um jovem desenvolvedor de Luanda, Angola, interessado em criar experiências digitais relevantes e compreender os sistemas por detrás delas.
              </p>
              <p>
                O meu percurso combina desenvolvimento de software, programação, cibersegurança e redes de computadores, sempre com foco na aprendizagem contínua e na resolução prática de problemas.
              </p>

              <div className="meta-list">
                <div>
                  <span className="meta-label">Formação</span>
                  <strong>{personalInfo.education}</strong>
                </div>
                <div>
                  <span className="meta-label">Localização</span>
                  <strong>{personalInfo.location}</strong>
                </div>
                <div>
                  <span className="meta-label">Idiomas</span>
                  <strong>{personalInfo.languages.join(' • ')}</strong>
                </div>
              </div>

              <div className="portrait-gallery" aria-label="Galeria de retratos">
                <div className="portrait-tile">
                  <img src={justinPortraitMain} alt="Retrato de Justin, variante 1" />
                </div>
                <div className="portrait-tile">
                  <img src={justinPortraitMain} alt="Retrato de Justin, variante 2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Competências</p>
            <h2>Ferramentas, sistemas e criação digital</h2>
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
              <span className="panel-label">Sinal</span>
              <h3>{activeSkill.name}</h3>
              <p>{activeSkill.short}</p>
            </aside>
          </div>
        </section>

        <section id="projects" className="projects-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Projetos</p>
            <h2>Experiências e criações</h2>
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
                    <a href={project.link}>Ver código</a>
                    <a href={project.demo}>Pré-visualizar</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="cybersecurity" className="cyber-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Cibersegurança</p>
            <h2>A proteger sistemas com clareza e intenção</h2>
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
                Abordo a tecnologia com uma mentalidade de segurança: compreender redes, proteger sistemas e criar experiências digitais resilientes.
              </p>
              <ul>
                <li>Consciência de segurança</li>
                <li>Pensamento orientado para redes</li>
                <li>Fiabilidade de sistemas</li>
                <li>Desenvolvimento orientado para a defesa</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section panel-surface">
          <div className="section-heading">
            <p className="eyebrow">Contacto</p>
            <h2>Vamos criar algo incrível.</h2>
          </div>

          <div className="contact-grid">
            <a href={`mailto:${personalInfo.email}`} className="contact-card">
              <span>Correio eletrónico</span>
              <strong>{personalInfo.email}</strong>
            </a>
            <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="contact-card">
              <span>Telefone</span>
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
