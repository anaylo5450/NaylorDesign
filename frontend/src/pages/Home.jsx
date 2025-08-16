import { Link } from "react-router-dom";
import "./Home.css";

// Update these imports to your actual image filenames/paths
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";

export default function Home() {
  return (
    <main className="home">
      {/* Top hero: two images */}
      <section className="home-hero" aria-label="Featured work">
        <img className="hero-img" src={hero1} alt="Featured Naylor Design part one" />
        <img className="hero-img" src={hero2} alt="Featured Naylor Design part two" />
      </section>

      {/* Intro / explanation */}
      <section className="home-intro">
        <h1 className="home-title">Naylor Design</h1>
        <p className="home-blurb">
          Naylor Design creates practical, accurate parts and models with a focus on
          automotive applications and custom problem-solving. The site hosts ready-to-print
          products and supports custom engineering requests. Every design emphasizes
          fit, function, and clarity so you can build with confidence.
        </p>
      </section>

      {/* Calls to action */}
      <section className="home-ctas" aria-label="Primary actions">
        <Link className="home-cta browse" to="/browse">Browse Products</Link>
        <Link className="home-cta request" to="/request">Engineer a Custom Solution</Link>
      </section>
    </main>
  );
}
