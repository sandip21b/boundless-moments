import React, { useState, useEffect } from "react";
import { FaCameraRetro, FaTree, FaPortrait, FaHeart, FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

// Default portfolio works
const defaultWorks = [
  {
    title: "Nepali Wedding Ring Ceremony",
    category: "Wedding",
    imageUrl: "https://weddingdocumentary.com/wp-content/uploads/2016/05/sikh__wedding_photos_san_mateo_mariott_0009.jpg"
  },
  {
    title: "Annapurna Mountain Scenery",
    category: "Nature / Mountain",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Golden Hour Couple",
    category: "Love / Couple",
    imageUrl: "https://media.nepalnomad.com/uploads/fullbanner/nepal-honeymoon-tour-photos.webp"
  },
  {
    title: "Nepali Old Woman Portrait",
    category: "Portrait",
    imageUrl: "https://www.insidehimalayas.com/wp-content/uploads/2017/11/Nepali-Woman-Bhaktapur_edit.jpg"
  }
];

// Personal skills list
const mySkills = [
  { name: "Wedding & Events Photography", icon: <FaCameraRetro size={34} color="#ff5722" /> },
  { name: "Nature & Landscape Photography", icon: <FaTree size={34} color="#55c57a" /> },
  { name: "Portrait Photography", icon: <FaPortrait size={34} color="#19a7ce" /> },
  { name: "Storytelling & Love Stories", icon: <FaHeart size={34} color="#ff328f" /> },
  { name: "Adobe Lightroom/Photoshop", icon: <FaCameraRetro size={34} color="#d2691e" /> },
  { name: "Creative Direction", icon: <FaHeart size={34} color="#e17055" /> }
];

// Skill categories for filtering - FIXED FILTERS
const skillList = [
  { 
    icon: <FaCameraRetro size={40} />, 
    label: "Wedding Photography", 
    filters: ["Wedding"], // Make sure this matches your data exactly
    description: "Capturing your special day with elegance and emotion"
  },
  { 
    icon: <FaTree size={40} />, 
    label: "Nature Photography", 
    filters: ["Nature / Mountain"], // Exact match with your data
    description: "Beautiful landscapes and natural scenery"
  },
  { 
    icon: <FaPortrait size={40} />, 
    label: "Portrait Photography", 
    filters: ["Portrait"], // Exact match
    description: "Professional portraits that capture personality"
  },
  { 
    icon: <FaHeart size={40} />, 
    label: "Love & Couple Stories", 
    filters: ["Love / Couple"], // Exact match
    description: "Romantic sessions and engagement photography"
  }
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [allWorks, setAllWorks] = useState(defaultWorks);
  const [loading, setLoading] = useState(false);

  // Fetch works from API
  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/portfolio");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setAllWorks(data);
        }
      }
    } catch (error) {
      console.log("Using default works - API not available");
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Filter works by category with better matching
  const getWorksForSkill = (skill) => {
    console.log("Filtering for skill:", skill); // Debug log
    console.log("All works:", allWorks); // Debug log
    console.log("Skill filters:", skill.filters); // Debug log
    
    if (!skill || !Array.isArray(skill.filters) || skill.filters.length === 0) {
      console.log("No skill or filters provided");
      return [];
    }
    
    const filteredWorks = allWorks.filter(work => {
      console.log("Checking work category:", work.category); // Debug log
      return skill.filters.some(filter => {
        const match = filter.trim().toLowerCase() === work.category.trim().toLowerCase();
        console.log(`Filter "${filter}" matches work category "${work.category}":`, match);
        return match;
      });
    });
    
    console.log("Filtered works:", filteredWorks); // Debug log
    return filteredWorks;
  };

  // FIXED: Click handler with proper toggle logic
  const handleSkillClick = (skill) => {
    console.log("Skill clicked:", skill.label); // Debug log
    
    // Toggle: if the same skill is clicked, deselect it
    if (selectedSkill && selectedSkill.label === skill.label) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
    }
  };

  return (
    <section className="skills-section" data-aos="fade-right">
      <div className="container">
        <h2>Experience & Skills</h2>
        <p>Professional photography services with years of experience and passion for capturing perfect moments.</p>

        {/* Personal Skills Grid */}
        <div className="personal-skills-grid">
          {mySkills.map((skill, idx) => (
            <div key={idx} className="skill-item">
              <div className="skill-icon">{skill.icon}</div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>

        <div className="section-divider">
          <p className="interaction-hint">
            Click on any category below to view sample works in that genre
          </p>
        </div>

        {/* Skills Grid - FIXED onClick handler */}
        <div className="skills-grid">
          {skillList.map((skill, i) => (
            <div
              key={i}
              className={`skill-card animate__animated animate__fadeInUp ${
                selectedSkill && selectedSkill.label === skill.label ? "active" : ""
              }`}
              tabIndex={0}
              role="button"
              onClick={() => handleSkillClick(skill)} // FIXED: Proper click handler
              onKeyPress={(e) =>
                (e.key === "Enter" || e.key === " ") && handleSkillClick(skill)
              }
              style={{ cursor: "pointer" }}
              aria-pressed={selectedSkill && selectedSkill.label === skill.label}
              aria-label={`Select ${skill.label}`}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.label}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>

        {/* Selected Skill Works Gallery */}
        {selectedSkill && (
          <div className="skill-gallery">
            <div className="gallery-header">
              <button
                className="back-button"
                onClick={() => setSelectedSkill(null)}
                aria-label="Back to all skills"
              >
                ← Back to all skills
              </button>
              <h3>{selectedSkill.label} - Portfolio</h3>
            </div>
            
            {loading ? (
              <div className="loading-message">
                <p>Loading portfolio...</p>
              </div>
            ) : (
              <div className="projects-grid">
                {getWorksForSkill(selectedSkill).length === 0 ? (
                  <div className="no-works-message">
                    <p>No works available for this category yet.</p>
                    <p><strong>Debug info:</strong> Selected skill: {selectedSkill.label}</p>
                    <p><strong>Available categories:</strong> {allWorks.map(w => w.category).join(", ")}</p>
                  </div>
                ) : (
                  getWorksForSkill(selectedSkill).map((work, i) => (
                    <div 
                      key={work._id || work.id || i} 
                      className="project-card"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="image-container">
                        <img
                          src={work.imageUrl}
                          alt={work.title}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Available";
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div className="card-content">
                        <h4>{work.title}</h4>
                        <p>{work.category}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Social Media Links */}
        <div className="social-links">
          <h3>Connect With Me</h3>
          <div className="social-icons">
            <a 
              href="https://www.instagram.com/sandeyp_chettrri/profilecard/?igsh=MWFlMGRsanp3YWhsbA%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-link instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://www.facebook.com/share/15AQjqwK3fX/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-link facebook"
            >
              <FaFacebook />
            </a>
            <a 
              href="https://www.linkedin.com/in/sandip-chettri-751ba0345/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link linkedin"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://github.com/sandip21b/boundless-moments" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Github"
              className="social-link github"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
