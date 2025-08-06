import React, { useState, useEffect } from "react";

const defaultPhotos = [
  {
    title: "Nepali Wedding Ring Ceremony",
    category: "Wedding",
    // Replaced Pinterest URL with a working alternative
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Annapurna Mountain Scenery",
    category: "Nature / Mountain",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Golden Hour Couple",
    category: "Love / Couple",
    // Fixed the iStock URL (often has issues)
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Nepali Old Man Portrait",
    category: "Portrait",
    // Flickr URL should work, but added backup
    imageUrl: "https://live.staticflickr.com/7317/11258592794_f2af19eeae_b.jpg"
  }
];

export default function Gallery() {
  const [photos, setPhotos] = useState(defaultPhotos);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState({}); // Track image loading errors

  const categories = ["All", ...new Set(photos.map(photo => photo.category))];
  const placeholder = "https://via.placeholder.com/400x300/1a1a1b/ffffff?text=Image+Not+Available";

  // Fetch photos from API if available
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/portfolio");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setPhotos(data);
        }
      }
    } catch (error) {
      console.log("Using default photos - API not available");
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos = selectedCategory === "All" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  // Enhanced error handling for images
  const handleImageError = (index, photoUrl) => {
    console.error(`Image failed to load: ${photoUrl}`);
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // Enhanced image load success
  const handleImageLoad = (index) => {
    console.log(`Image loaded successfully at index: ${index}`);
    setImageErrors(prev => ({
      ...prev,
      [index]: false
    }));
  };

  return (
    <section className="gallery-section" data-aos="fade-up">
      <div className="container">
        <h2>Photography Gallery</h2>
        <p>Explore a curated selection of my best wedding, nature, and portrait photography work.</p>
        
        {/* Category Filter */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && (
          <div className="loading-message">
            <p>Loading gallery...</p>
          </div>
        )}

        <div className="projects-grid">
          {filteredPhotos.map((photo, i) => (
            <div 
              key={photo.id || i} 
              className="project-card animate__animated animate__zoomIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="image-container">
                <img
                  src={imageErrors[i] ? placeholder : (photo.imageUrl || placeholder)}
                  alt={photo.title}
                  onError={(e) => {
                    console.error(`Failed to load image: ${photo.imageUrl}`);
                    handleImageError(i, photo.imageUrl);
                    e.target.src = placeholder;
                  }}
                  onLoad={() => handleImageLoad(i)}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    backgroundColor: '#f0f0f0'
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>{photo.title}</h3>
                    <p>{photo.category}</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <h3>{photo.title}</h3>
                <p className="category">{photo.category}</p>
                {/* Debug info - remove in production */}
                {process.env.NODE_ENV === 'development' && (
                  <small style={{ color: '#666', fontSize: '0.8rem' }}>
                    URL: {photo.imageUrl?.substring(0, 50)}...
                    {imageErrors[i] && <span style={{ color: 'red' }}> (Failed to load)</span>}
                  </small>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && !loading && (
          <div className="no-results">
            <p>No photos found in the "{selectedCategory}" category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
