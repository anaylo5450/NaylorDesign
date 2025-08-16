import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      {/* Top hero with two images */}
      <section className="home-hero">
        <img src="/images/e36.jpg" alt="BMW E36 example part" className="hero-img" />
        <img src="/images/headers.JPG" alt="Custom headers example" className="hero-img" />
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

      {/* Links / CTAs */}
      <section className="home-ctas">
        <Link className="home-cta browse" to="/browse">Browse Products</Link>
        <Link className="home-cta request" to="/request">Engineer a Custom Solution</Link>
      </section>
    </main>
  );
}
