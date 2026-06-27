import { Link } from 'react-router-dom';
import './About.css';

const values = [
  { emoji: '🎯', title: 'Purposeful Curation', desc: 'Every product earns its place through rigorous testing and design review. No filler, no compromise.' },
  { emoji: '🌿', title: 'Sustainable Choices', desc: 'We prioritize partners with verified ethical manufacturing and environmental practices.' },
  { emoji: '💎', title: 'Built to Last', desc: 'We stock products designed for longevity, not disposability. Quality over quantity, always.' },
  { emoji: '🔍', title: 'Radical Transparency', desc: 'Clear pricing, honest specs, and real customer reviews — no dark patterns, ever.' },
];

const team = [
  { name: 'Aria Chen', role: 'CEO & Co-founder', emoji: '👩‍💼' },
  { name: 'Marcus Webb', role: 'Head of Product', emoji: '👨‍🎨' },
  { name: 'Priya Nair', role: 'Lead Engineer', emoji: '👩‍💻' },
  { name: 'Jae-won Oh', role: 'Head of Design', emoji: '🎨' },
];

export default function About() {
  return (
    <main className="about page-enter">
      <div className="container">
        {/* Hero */}
        <section className="about-hero">
          <div className="about-eyebrow">Our Story</div>
          <h1 className="about-title">
            We believe great products<br />
            <span className="about-accent">change how you live</span>
          </h1>
          <p className="about-lead">
            ShopForge was founded in 2022 with a simple thesis: the internet deserves a better way to discover products. Not through algorithmic noise or sponsored chaos — but through careful, human-first curation.
          </p>
          <Link to="/catalog" className="btn-primary">Shop Our Collection</Link>
        </section>

        {/* Mission */}
        <section className="mission-section">
          <div className="mission-card">
            <blockquote className="mission-quote">
              "We don't just sell products. We assemble a collection of things worth owning — things made with intention, built with craft, and designed to outlast the trend cycle."
            </blockquote>
            <cite className="mission-cite">— Aria Chen, CEO</cite>
          </div>
        </section>

        {/* Values */}
        <section className="values-section">
          <h2 className="section-heading">What We Stand For</h2>
          <div className="values-grid">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <span className="value-emoji">{v.emoji}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="team-section">
          <h2 className="section-heading">The Team</h2>
          <div className="team-grid">
            {team.map(m => (
              <div key={m.name} className="team-card">
                <div className="team-avatar">{m.emoji}</div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2>Ready to explore?</h2>
          <p>Browse our full catalog of carefully curated products.</p>
          <Link to="/catalog" className="btn-primary">Shop Now →</Link>
        </section>
      </div>
    </main>
  );
}
