import React, { useRef, useState } from "react";

export default function Contact() {
  const [statusMsg, setStatusMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatusMsg("Thank you for contacting Boundless Moments! I'll get back to you soon.");
        form.current.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatusMsg("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-section" data-aos="fade-up">
      <div className="container">
        <h2>Contact Us</h2>
        <p>Get in touch with Boundless Moments for your photography needs.</p>
        
        <div className="contact-content">
          <form className="contact-form" ref={form} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input 
                id="name" 
                name="name" 
                type="text"
                placeholder="Your full name"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="your.email@example.com"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea 
                id="message" 
                name="message" 
                rows={6} 
                placeholder="Tell us about your photography needs..."
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
            
            {statusMsg && (
              <div className={`status-msg ${statusMsg.includes('Failed') ? 'error' : 'success'}`}>
                {statusMsg}
              </div>
            )}
          </form>

          <aside className="contact-details">
            <h3>Get In Touch</h3>
            <div className="contact-info">
              <div className="contact-item">
                <strong>📞 Phone:</strong>
                <p>+977 9805678901</p>
              </div>
              
              <div className="contact-item">
                <strong>📧 Email:</strong>
                <p>info@boundlessmoments.com</p>
              </div>
              
              <div className="contact-item">
                <strong>📍 Address:</strong>
                <p>Tinkune, Kathmandu City<br />Nepal</p>
              </div>
              
              <div className="contact-item">
                <strong>🕒 Working Hours:</strong>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br />
                   Saturday: 10:00 AM - 4:00 PM<br />
                   Sunday: By appointment</p>
              </div>
            </div>

            <div className="specialties">
              <h4>Photography Services:</h4>
              <ul>
                <li>Wedding Photography</li>
                <li>Portrait Sessions</li>
                <li>Nature & Landscape</li>
                <li>Event Photography</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
