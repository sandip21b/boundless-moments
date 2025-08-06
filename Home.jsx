import React from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <section className="hero" data-aos="fade-up">
      <div className="hero-content">
        <h1>Welcome to Boundless Moments</h1>
        <h2>
          <span className="typewriter">
            <Typewriter
              words={[
                "Professional Wedding Photographer", 
                "Nature & Landscape Enthusiast", 
                "Portrait Artist",
                "Storyteller Through Lens"
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h2>
        <p className="hero-description">
          Capturing life's most precious moments with artistry and passion.<br />
          Let Boundless Moments turn your memories into timeless treasures that you'll cherish forever.
        </p>
        
        <div className="hero-buttons">
          <a href="/gallery" className="cta-button primary">
            View Portfolio
          </a>
          <a href="/contact" className="cta-button secondary">
            Get In Touch
          </a>
        </div>
        
        <div className="hero-stats">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Photos Captured</p>
          </div>
          <div className="stat-item">
            <h3>5+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
