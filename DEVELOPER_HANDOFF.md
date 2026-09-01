# BlockDAG — Information Hub / Developer Handoff

## 1. What this package is

This package contains:
- `blockdag_information_hub.html` — the visual HTML prototype.
- This handoff specification — what the developer should build, what should be reused from the existing BlockDAG site, and what must be replaced before production.

The prototype is an **information-first landing page**, not a copy of the existing commercial/presale page.

## 2. Main goal

Build a standalone informational destination for advertising and educational traffic.

Core user journey:

User intent → ChatGPT Ad → informational landing page → technology/resource engagement

The page should feel like a technology/research hub rather than a presale or investment page.

## 3. Existing BlockDAG sources to use as references

Primary pages:
- https://blockdag.network/about-us
- https://blockdag.network/keynote
- https://blockdag.network/developer-hub
- https://docs.blockdagnetwork.io/

The current About page contains the project's existing navigation, technology sections, miner content, ecosystem references and resource links. Reuse only assets/content that the project is authorized to use.

## 4. Important production rule

Do NOT simply iframe or clone the existing page.

Create a new page with the information architecture in the prototype:

1. Hero — Explore the technology behind BlockDAG
2. What is BlockDAG?
3. Why blockchain architecture matters
4. How does BlockDAG work?
5. Understanding DAG architecture
6. Scalability / transaction processing
7. Proof-of-Work
8. EVM-compatible development
9. Layer-1 use cases
10. Architecture comparison
11. Research / resources
12. FAQ
13. Final educational CTA

## 5. Visual direction

Keep the existing BlockDAG visual language where appropriate:
- dark/futuristic interface
- neon technology accents
- network/DAG graphics
- premium typography
- rounded cards
- subtle motion
- technical diagrams

But remove or isolate sales-oriented elements from the informational destination:
- Buy Now
- presale countdowns
- price/ROI messaging
- aggressive FOMO
- investment claims
- purchase widgets

## 6. Assets

The developer should obtain production assets from the project's authorized source/repository/CMS:
- logo
- fonts
- brand icons
- existing illustrations
- approved team imagery
- approved technology graphics
- keynote thumbnails
- documentation/whitepaper covers
- explorer/developer screenshots if needed

Do not invent official logos, partner claims or third-party endorsements.

The HTML prototype currently uses CSS/SVG placeholders for the network graphics. These should be replaced with production-approved assets or polished SVG/Lottie/WebGL animations.

## 7. Links to replace

The prototype contains placeholder `#` links for:
- Technical Documentation
- Whitepaper
- Developer Resources
- Network Explorer
- Legal

Replace these with the project's verified production URLs.

Known current resources include the BlockDAG documentation and developer hub. Verify URLs again immediately before launch.

## 8. Tracking

Implement:
- OpenAI Ads Pixel / conversion tracking as provided by the ads setup
- GA4
- UTM parameters
- scroll-depth events
- resource click events

Suggested events:
- page_view
- scroll_50
- scroll_90
- technology_view
- architecture_view
- documentation_click
- whitepaper_click
- developer_click
- explorer_click
- keynote_click
- qualified_engagement

## 9. Responsive behavior

The page must be fully responsive:
- desktop
- tablet
- mobile

The navigation should collapse on mobile.
Network diagrams must remain legible on small screens.
Cards should stack vertically on mobile.

## 10. Technical requirements

Preferred:
- semantic HTML5
- clean CSS
- lightweight JavaScript
- fast loading
- lazy-load below-the-fold imagery
- WebP/AVIF where appropriate
- accessible buttons/links
- proper H1/H2/H3 hierarchy
- metadata and Open Graph tags
- no unnecessary third-party scripts

## 11. Content principle

The page should answer informational questions naturally:

- What is BlockDAG?
- What is DAG architecture?
- How does DAG differ from a traditional blockchain?
- What is Layer 1?
- How does Proof-of-Work work?
- How does BlockDAG approach scalability?
- Is BlockDAG EVM compatible?
- What can developers build?
- Where can I read the documentation?

Avoid making unsupported absolute claims such as “fastest blockchain in the world” unless the project provides substantiation and explicitly approves the claim.

## 12. Definition of done

The developer should deliver:
- production page
- mobile version
- approved assets integrated
- real links replacing placeholders
- analytics/tracking installed
- metadata/SEO completed
- QA in Chrome/Safari/Firefox
- performance check
- final staging URL
- source code/repository access

## 13. Important distinction

The supplied HTML is a **design/prototype starting point**.

It is NOT a complete copy of all functionality/assets from blockdag.network.

For production, the developer should use the project's authorized existing assets and connect the page to the real documentation, developer hub, whitepaper, explorer and other resources.
