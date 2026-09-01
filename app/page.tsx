"use client";

import { useEffect, useState } from "react";

const LINKS = {
  documentation: "https://docs.blockdagnetwork.io/",
  whitepaper: "https://blockdag.network/blockdag-whitepaper-r3.pdf",
  developerHub: "https://blockdag.network/developer-hub",
  explorer: "https://bdagscan.com/",
  terms: "https://blockdag.network/terms",
  privacy: "https://blockdag.network/privacy",
};

type EventName =
  | "documentation_click"
  | "whitepaper_click"
  | "developer_click"
  | "explorer_click"
  | "qualified_engagement";

function trackEvent(name: EventName) {
  if (typeof window === "undefined") return;

  const gtag = (
    window as Window & {
      gtag?: (...args: unknown[]) => void;
    }
  ).gtag;

  gtag?.("event", name, { page_location: window.location.href });
}

function ExternalLink({
  href,
  event,
  children,
  className,
}: {
  href: string;
  event?: EventName;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => event && trackEvent(event)}
    >
      {children}
    </a>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Mark({ children }: { children: React.ReactNode }) {
  return <div className="icon-mark">{children}</div>;
}

function SectionHead({
  index,
  label,
  title,
  children,
  light = false,
}: {
  index: string;
  label: string;
  title: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-head ${light ? "section-head-light" : ""}`}>
      <div className="section-index">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <h2>{title}</h2>
      {children ? <p className="lead">{children}</p> : null}
    </div>
  );
}

function DagGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={`dag-graphic ${compact ? "dag-graphic-compact" : ""}`}
      viewBox="0 0 600 420"
      role="img"
      aria-label="Animated directed acyclic graph illustration"
    >
      <defs>
        <linearGradient id="dag-line" x1="0" x2="1">
          <stop offset="0" stopColor="#14a8ff" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#bfff3f" stopOpacity="0.9" />
          <stop offset="1" stopColor="#14a8ff" stopOpacity="0.15" />
        </linearGradient>
        <filter id="dag-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="dag-lines" fill="none" stroke="url(#dag-line)">
        <path d="M70 214 L194 100 L326 180 L472 84" />
        <path d="M70 214 L196 328 L326 180 L486 315" />
        <path d="M194 100 L326 180 L196 328" />
        <path d="M326 180 L472 84 L536 211 L486 315" />
        <path d="M196 328 L320 372 L486 315" />
      </g>
      <g className="dag-pulses" fill="none" stroke="#bfff3f" strokeWidth="2">
        <circle cx="326" cy="180" r="29" />
        <circle cx="326" cy="180" r="53" />
      </g>
      <g className="dag-nodes" fill="#bfff3f" filter="url(#dag-glow)">
        <circle cx="70" cy="214" r="9" />
        <circle cx="194" cy="100" r="9" />
        <circle cx="326" cy="180" r="14" />
        <circle cx="472" cy="84" r="9" />
        <circle cx="196" cy="328" r="9" />
        <circle cx="486" cy="315" r="9" />
        <circle cx="536" cy="211" r="9" />
        <circle cx="320" cy="372" r="9" />
      </g>
      <g className="dag-labels" fill="currentColor">
        <text x="305" y="150">CORE</text>
        <text x="40" y="250">01</text>
        <text x="455" y="55">04</text>
      </g>
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "menu-icon-open" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export default function InformationHub() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("js-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const trackedSections = new Set<string>();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionName = entry.target.getAttribute("data-section");
          if (entry.isIntersecting && sectionName && !trackedSections.has(sectionName)) {
            trackedSections.add(sectionName);
            const eventName = sectionName === "technology" ? "technology_view" : "architecture_view";
            const gtag = (
              window as Window & {
                gtag?: (...args: unknown[]) => void;
              }
            ).gtag;
            gtag?.("event", eventName, { page_location: window.location.href });
          }
        });
      },
      { threshold: 0.35 },
    );

    document.querySelectorAll("[data-section]").forEach((element) => sectionObserver.observe(element));

    const scrollMarks = new Set<number>();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (!scrollable) return;
      const progress = Math.round((window.scrollY / scrollable) * 100);

      [50, 90].forEach((mark) => {
        if (progress >= mark && !scrollMarks.has(mark)) {
          scrollMarks.add(mark);
          const gtag = (
            window as Window & {
              gtag?: (...args: unknown[]) => void;
            }
          ).gtag;
          gtag?.("event", `scroll_${mark}`, { page_location: window.location.href });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("js-ready");
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="announcement-bar">
        <span className="announcement-pulse" aria-hidden="true" />
        Technology &amp; Research Hub <span className="announcement-divider">/</span> Learn how BlockDAG is built
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="BlockDAG Technology Hub home">
            <span className="brand-symbol" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>
              Block<span className="brand-accent">DAG</span>
            </span>
          </a>

          <nav className={`desktop-nav ${menuOpen ? "desktop-nav-open" : ""}`} aria-label="Primary navigation">
            <a href="#technology" onClick={closeMenu}>Technology</a>
            <a href="#architecture" onClick={closeMenu}>Architecture</a>
            <a href="#scalability" onClick={closeMenu}>Scalability</a>
            <a href="#developers" onClick={closeMenu}>Developers</a>
            <a href="#resources" onClick={closeMenu}>Resources</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
          </nav>

          <a className="header-cta" href="#resources" onClick={closeMenu}>
            Explore technology <Arrow />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero-section" id="top">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="eyebrow-dot" /> Technology &amp; Research</div>
              <h1>
                Explore the technology behind <em>BlockDAG</em>
              </h1>
              <p className="hero-description">
                Discover a Layer-1 blockchain architecture built around Directed Acyclic Graph technology and Proof-of-Work. Learn how the network approaches transaction processing, scalability and decentralized infrastructure.
              </p>
              <div className="action-row">
                <a className="button button-primary" href="#architecture">
                  Explore the Architecture <Arrow />
                </a>
                <a className="button button-ghost" href="#resources">
                  View Resources <Arrow />
                </a>
              </div>
              <div className="hero-meta">
                <span><i /> Built for curious minds</span>
                <span>01 — 11 chapters</span>
              </div>
            </div>

            <div className="hero-visual reveal reveal-delay-1" aria-label="BlockDAG network visual">
              <div className="visual-topline"><span>NETWORK MAP / 01</span><span>LIVE STUDY</span></div>
              <div className="visual-grid" aria-hidden="true" />
              <div className="visual-ring visual-ring-one" aria-hidden="true" />
              <div className="visual-ring visual-ring-two" aria-hidden="true" />
              <div className="visual-glow" aria-hidden="true" />
              <DagGraphic />
              <div className="visual-caption">
                <span className="caption-marker" />
                <span>Multiple relationships.<br />One verifiable network.</span>
              </div>
              <div className="hero-stat-grid">
                <div className="hero-stat"><strong>Layer 1</strong><span>Base infrastructure</span></div>
                <div className="hero-stat"><strong>DAG</strong><span>Graph architecture</span></div>
                <div className="hero-stat"><strong>PoW</strong><span>Consensus model</span></div>
              </div>
            </div>
          </div>
          <div className="container hero-bottomline">
            <span>Scroll to explore</span>
            <span className="scroll-line" />
            <span>BlockDAG / Technology</span>
          </div>
        </section>

        <section className="section section-blue" id="technology" data-section="technology">
          <div className="container">
            <SectionHead index="01" label="Overview" title="What is BlockDAG?" light>
              BlockDAG is a Layer-1 blockchain network built around a Directed Acyclic Graph architecture. The design combines graph-based transaction relationships with Proof-of-Work and an EVM-compatible environment.
            </SectionHead>
            <div className="card-grid card-grid-three">
              <article className="info-card info-card-blue reveal"><Mark>L1</Mark><h3>Layer-1 Network</h3><p>A foundational blockchain infrastructure designed to support decentralized applications, smart contracts and network services.</p><span className="card-index">01</span></article>
              <article className="info-card info-card-blue reveal reveal-delay-1"><Mark>DAG</Mark><h3>DAG Architecture</h3><p>A graph-based structure that represents relationships between blocks and transactions beyond a single linear sequence.</p><span className="card-index">02</span></article>
              <article className="info-card info-card-blue reveal reveal-delay-2"><Mark>PoW</Mark><h3>Proof-of-Work</h3><p>A consensus mechanism based on computational work that contributes to network security and decentralized participation.</p><span className="card-index">03</span></article>
            </div>
          </div>
        </section>

        <section className="section section-light" data-section="context">
          <div className="container split-layout">
            <div className="split-copy reveal">
              <SectionHead index="02" label="Context" title="Why blockchain architecture matters" light>
                Blockchain networks need to balance transaction processing, security, decentralization and scalability. Architecture plays a central role in how these properties are approached.
              </SectionHead>
              <div className="blue-note"><span className="blue-note-number">02</span><span>Architecture is a set of choices — each one creates a different path through the network.</span></div>
            </div>
            <div className="card-grid card-grid-two context-cards">
              <article className="info-card info-card-light reveal"><span className="mini-line" /><h3>Transaction Throughput</h3><p>Network architecture influences how transaction activity is organized and processed as usage grows.</p></article>
              <article className="info-card info-card-light reveal reveal-delay-1"><span className="mini-line" /><h3>Network Congestion</h3><p>Different approaches to data and block organization create different trade-offs during periods of activity.</p></article>
              <article className="info-card info-card-light reveal reveal-delay-2"><span className="mini-line" /><h3>Scalability</h3><p>Scalable infrastructure needs to accommodate increasing activity while maintaining core protocol properties.</p></article>
              <article className="info-card info-card-light reveal reveal-delay-3"><span className="mini-line" /><h3>Consensus Design</h3><p>The consensus mechanism determines how participants coordinate and validate network state.</p></article>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="architecture" data-section="architecture">
          <div className="container">
            <SectionHead index="03" label="Architecture" title="How does BlockDAG work?">
              Explore the basic flow from transaction creation to network confirmation.
            </SectionHead>
            <div className="architecture-layout">
              <div className="diagram-panel reveal">
                <div className="diagram-label"><span>BLOCKDAG / FLOW</span><span>GRAPH 001</span></div>
                <DagGraphic compact />
                <div className="diagram-footer"><span>Directed</span><span>Acyclic</span><span>Verifiable</span></div>
              </div>
              <div className="flow-list">
                <div className="flow-step reveal"><span className="flow-number">01</span><div><b>Transaction creation</b><p>A transaction enters the network.</p></div><Arrow /></div>
                <div className="flow-step reveal reveal-delay-1"><span className="flow-number">02</span><div><b>Network propagation</b><p>Information is propagated across participating nodes.</p></div><Arrow /></div>
                <div className="flow-step reveal reveal-delay-2"><span className="flow-number">03</span><div><b>DAG structure</b><p>Blocks can form multiple relationships within the graph.</p></div><Arrow /></div>
                <div className="flow-step reveal reveal-delay-3"><span className="flow-number">04</span><div><b>Consensus</b><p>Protocol rules and Proof-of-Work contribute to consensus.</p></div><Arrow /></div>
                <div className="flow-step reveal reveal-delay-4"><span className="flow-number">05</span><div><b>Confirmation</b><p>The network processes transactions according to protocol rules.</p></div><Arrow /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-light" data-section="dag">
          <div className="container">
            <SectionHead index="04" label="DAG" title="Understanding Directed Acyclic Graph architecture" light>
              A Directed Acyclic Graph, or DAG, is a graph structure in which relationships follow directed paths without forming circular loops.
            </SectionHead>
            <div className="comparison-grid">
              <div className="comparison-card comparison-card-muted reveal"><div className="comparison-heading"><span className="comparison-dot comparison-dot-muted" /><h3>Traditional linear structure</h3></div><div className="chain"><span>Block</span><b>→</b><span>Block</span><b>→</b><span>Block</span></div><p>A conventional blockchain organizes blocks in a sequential chain.</p></div>
              <div className="comparison-card comparison-card-accent reveal reveal-delay-1"><div className="comparison-heading"><span className="comparison-dot" /><h3>DAG-based structure</h3></div><DagGraphic compact /><p>A graph-based architecture can represent multiple relationships between blocks.</p></div>
            </div>
          </div>
        </section>

        <section className="section section-blue section-blue-deep" id="scalability" data-section="scalability">
          <div className="container">
            <SectionHead index="05" label="Scalability" title="Explore an alternative approach to transaction processing" light>
              BlockDAG&apos;s architecture is designed around a graph-based structure. Explore how this approach addresses the organization of transactions and network activity.
            </SectionHead>
            <div className="card-grid card-grid-three">
              <article className="info-card info-card-blue info-card-blue-outline reveal"><Mark>↗</Mark><h3>Graph-Based Processing</h3><p>Explore how a DAG structure can represent relationships between multiple blocks within a network.</p></article>
              <article className="info-card info-card-blue info-card-blue-outline reveal reveal-delay-1"><Mark>◌</Mark><h3>Network Activity</h3><p>Understand the role of nodes, propagation and consensus in processing blockchain activity.</p></article>
              <article className="info-card info-card-blue info-card-blue-outline reveal reveal-delay-2"><Mark>∞</Mark><h3>Scalability Research</h3><p>Learn about the architectural trade-offs involved in designing blockchain infrastructure for growing usage.</p></article>
            </div>
          </div>
        </section>

        <section className="section section-dark" data-section="consensus">
          <div className="container">
            <SectionHead index="06" label="Consensus" title="Why Proof-of-Work?">
              Proof-of-Work uses computational work as part of a network&apos;s consensus and security model.
            </SectionHead>
            <div className="card-grid card-grid-three">
              <article className="info-card info-card-dark reveal"><Mark>01</Mark><h3>Network Security</h3><p>Computational work can make it costly to alter or manipulate network history under the protocol&apos;s security assumptions.</p></article>
              <article className="info-card info-card-dark reveal reveal-delay-1"><Mark>02</Mark><h3>Decentralized Participation</h3><p>Independent participants can contribute computational resources to the network.</p></article>
              <article className="info-card info-card-dark reveal reveal-delay-2"><Mark>03</Mark><h3>Consensus</h3><p>Protocol rules determine how valid network activity is recognized and incorporated into the network state.</p></article>
            </div>
          </div>
        </section>

        <section className="section section-white" id="developers" data-section="developers">
          <div className="container">
            <SectionHead index="07" label="Development" title="Built for EVM-compatible development" light>
              Explore an environment designed to be familiar to developers working with Ethereum-compatible tooling, smart contracts and decentralized applications.
            </SectionHead>
            <div className="card-grid card-grid-three">
              <article className="info-card info-card-white reveal"><Mark>S</Mark><h3>Solidity</h3><p>Explore smart-contract development using familiar EVM-oriented workflows.</p><span className="card-link-accent">Explore the stack <Arrow /></span></article>
              <article className="info-card info-card-white reveal reveal-delay-1"><Mark>SC</Mark><h3>Smart Contracts</h3><p>Build programmable applications that interact with blockchain network state.</p><span className="card-link-accent">Explore the stack <Arrow /></span></article>
              <article className="info-card info-card-white reveal reveal-delay-2"><Mark>dA</Mark><h3>Decentralized Apps</h3><p>Explore application architectures built on Layer-1 blockchain infrastructure.</p><span className="card-link-accent">Explore the stack <Arrow /></span></article>
            </div>
          </div>
        </section>

        <section className="section section-light" data-section="applications">
          <div className="container">
            <SectionHead index="08" label="Applications" title="Where can Layer-1 infrastructure be used?" light>
              Blockchain infrastructure can provide a foundation for a wide range of decentralized applications and digital services.
            </SectionHead>
            <div className="usecase-grid">
              <article className="usecase-card reveal"><span>01</span><h3>Payments</h3><p>Infrastructure for digital payment applications and on-chain transfers.</p></article>
              <article className="usecase-card reveal reveal-delay-1"><span>02</span><h3>Gaming</h3><p>Potential infrastructure for decentralized gaming ecosystems.</p></article>
              <article className="usecase-card reveal reveal-delay-2"><span>03</span><h3>DeFi</h3><p>Infrastructure for decentralized financial applications and protocols.</p></article>
              <article className="usecase-card reveal"><span>04</span><h3>Stablecoins</h3><p>Blockchain infrastructure for applications using stable-value digital assets.</p></article>
              <article className="usecase-card reveal reveal-delay-1"><span>05</span><h3>Digital Assets</h3><p>Infrastructure for applications built around on-chain digital assets.</p></article>
              <article className="usecase-card reveal reveal-delay-2"><span>06</span><h3>dApps</h3><p>A base layer for decentralized application ecosystems.</p></article>
            </div>
          </div>
        </section>

        <section className="section section-blue section-blue-slim" data-section="comparison">
          <div className="container">
            <SectionHead index="09" label="Comparison" title="How does the architecture differ?" light>
              Different blockchain architectures make different design trade-offs. The goal here is to understand the underlying models rather than make blanket performance claims.
            </SectionHead>
            <div className="model-grid">
              <div className="model-card reveal"><span className="model-label">MODEL / 01</span><h3>Conventional blockchain</h3><p>Linear block organization, sequential relationships and architecture-specific approaches to consensus and scalability.</p><span className="model-line" /></div>
              <div className="model-card model-card-active reveal reveal-delay-1"><span className="model-label">MODEL / 02</span><h3>BlockDAG approach</h3><p>DAG-based block relationships combined with Proof-of-Work and an EVM-compatible Layer-1 environment.</p><span className="model-line" /></div>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="resources" data-section="resources">
          <div className="container">
            <SectionHead index="10" label="Research Hub" title="Explore BlockDAG resources">
              Go deeper into the network, its architecture and development environment.
            </SectionHead>
            <div className="resource-grid">
              <ExternalLink className="resource-card reveal" href={LINKS.documentation} event="documentation_click"><span className="resource-number">01</span><span className="resource-copy"><strong>Technical Documentation</strong><small>Learn about the network architecture and protocol.</small></span><Arrow /></ExternalLink>
              <ExternalLink className="resource-card reveal reveal-delay-1" href={LINKS.whitepaper} event="whitepaper_click"><span className="resource-number">02</span><span className="resource-copy"><strong>Whitepaper</strong><small>Explore the technical foundation of the project.</small></span><Arrow /></ExternalLink>
              <ExternalLink className="resource-card reveal reveal-delay-2" href={LINKS.developerHub} event="developer_click"><span className="resource-number">03</span><span className="resource-copy"><strong>Developer Resources</strong><small>Explore tools, smart-contract workflows and technical guides.</small></span><Arrow /></ExternalLink>
              <ExternalLink className="resource-card reveal reveal-delay-3" href={LINKS.explorer} event="explorer_click"><span className="resource-number">04</span><span className="resource-copy"><strong>Network Explorer</strong><small>Explore blockchain data and network activity.</small></span><Arrow /></ExternalLink>
            </div>
            <div className="resource-footnote"><span className="eyebrow-dot" /> Verified official destinations</div>
          </div>
        </section>

        <section className="section section-light" id="faq" data-section="faq">
          <div className="container faq-layout">
            <SectionHead index="11" label="FAQ" title="Frequently asked questions" light />
            <div className="faq-list reveal">
              <details open><summary><span>01</span>What is BlockDAG?<b>+</b></summary><p>BlockDAG is a Layer-1 blockchain network using a Directed Acyclic Graph architecture and Proof-of-Work consensus.</p></details>
              <details><summary><span>02</span>What is a Directed Acyclic Graph?<b>+</b></summary><p>A DAG is a graph structure made of directed relationships that do not form circular paths.</p></details>
              <details><summary><span>03</span>How does DAG architecture differ from a traditional blockchain?<b>+</b></summary><p>A traditional blockchain generally organizes blocks into a linear sequence, while a DAG-based architecture can represent multiple relationships between blocks.</p></details>
              <details><summary><span>04</span>What is a Layer-1 blockchain?<b>+</b></summary><p>Layer 1 refers to the base blockchain network on which transactions, smart contracts and decentralized applications can operate.</p></details>
              <details><summary><span>05</span>How does Proof-of-Work work?<b>+</b></summary><p>Proof-of-Work requires participants to perform computational work as part of the network&apos;s consensus and security model.</p></details>
              <details><summary><span>06</span>Is BlockDAG EVM compatible?<b>+</b></summary><p>The BlockDAG ecosystem is designed around EVM-compatible development and smart-contract workflows.</p></details>
              <details><summary><span>07</span>Where can I learn more about the technology?<b>+</b></summary><p>Use the technical documentation, whitepaper and developer resources linked in the Research Hub.</p></details>
            </div>
          </div>
        </section>

        <section className="final-section" data-section="final-cta">
          <div className="final-grid" aria-hidden="true" />
          <div className="container final-content reveal">
            <div className="section-index section-index-centered"><span>→</span><span>Continue Exploring</span></div>
            <h2>Want to learn more about <em>BlockDAG?</em></h2>
            <p>Explore the architecture, technical resources and developer ecosystem behind the network.</p>
            <div className="action-row action-row-centered"><a className="button button-primary" href="#architecture" onClick={() => trackEvent("qualified_engagement")}>Explore Technology <Arrow /></a><a className="button button-ghost" href="#resources" onClick={() => trackEvent("qualified_engagement")}>View Resources <Arrow /></a></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand"><a className="brand" href="#top"><span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span><span>Block<span className="brand-accent">DAG</span></span></a><p>Technology &amp; Research Hub</p></div>
          <div><h3>Explore</h3><a href="#technology">Technology</a><a href="#architecture">Architecture</a><a href="#scalability">Scalability</a><a href="#developers">Developers</a></div>
          <div><h3>Resources</h3><ExternalLink href={LINKS.documentation} event="documentation_click">Documentation</ExternalLink><ExternalLink href={LINKS.whitepaper} event="whitepaper_click">Whitepaper</ExternalLink><a href="#faq">FAQ</a><ExternalLink href={LINKS.terms}>Legal</ExternalLink></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} BlockDAG</span><span>Informational destination / No investment advice</span><span><ExternalLink href={LINKS.privacy}>Privacy</ExternalLink> <span aria-hidden="true">·</span> <ExternalLink href={LINKS.terms}>Terms</ExternalLink></span></div>
      </footer>
    </>
  );
}
