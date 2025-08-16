import "./about.css";

export default function About() {
  return (
    <div className="about-page">
      <section className="about-container">
        <p className="about-lede">
          We design and manufacture precision parts with a focus on clean aesthetics and real-world performance.
          From fitment to finish, our process is purpose-built for engineers and enthusiasts.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h2>What We Do</h2>
            <p>
              CAD-driven development, rapid iteration, and small-batch production. We validate designs with
              real measurements, then refine based on feedback and testing.
            </p>
          </div>
          <div className="about-card">
            <h2>How We Build</h2>
            <p>
              Strong materials, reliable tolerances, and attention to detail. We prioritize clear installation
              and serviceability alongside performance.
            </p>
          </div>
          <div className="about-card">
            <h2>Why It Matters</h2>
            <p>
              Better parts make better projects. Our goal is to shorten your path from idea to installed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
