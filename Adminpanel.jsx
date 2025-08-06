import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api/portfolio";

export default function AdminPanel() {
  const [works, setWorks] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", imageUrl: "" });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState("");

  const correctPassword = "sandip123";

  // Move useEffect to top level to avoid hooks rule violation
  useEffect(() => {
    if (auth) {
      fetchWorks();
    }
  }, [auth]);

  const handleLogin = () => {
    console.log("Login attempt with password:", password);
    console.log("Correct password:", correctPassword);
    
    if (password === correctPassword) {
      console.log("Password matches! Setting auth to true");
      setAuth(true);
      setError("");
    } else {
      console.log("Password doesn't match!");
      setError("Incorrect password. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  function fetchWorks() {
    setLoading(true);
    fetch(API_BASE)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => setWorks(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error('Fetch error:', err);
        setWorks([]);
      })
      .finally(() => setLoading(false));
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!form.title || !form.category || !form.imageUrl) {
      alert("All fields are required.");
      return;
    }
    setLoading(true);
    fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add work");
        return res.json();
      })
      .then(() => {
        setForm({ title: "", category: "", imageUrl: "" });
        fetchWorks();
      })
      .catch((err) => alert("Error: " + err.message))
      .finally(() => setLoading(false));
  }

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this work?")) return;
    setLoading(true);
    fetch(`${API_BASE}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete work");
        fetchWorks();
      })
      .catch((err) => alert("Error: " + err.message))
      .finally(() => setLoading(false));
  }

  // Login UI - Clean version without demo button
  if (!auth) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-background">
          <div className="bg-blur-1"></div>
          <div className="bg-blur-2"></div>
        </div>
        <div className="login-container">
          <div className="login-card">
            <div className="welcome-section">
              <div className="welcome-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7V10C2 16 12 22 12 22S22 16 22 10V7L12 2Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1>Welcome Back!</h1>
              <p>Enter your credentials to access the admin dashboard</p>
            </div>
            
            <div className="form-section">
              <h2>Admin Portal</h2>
              
              <div className="social-login">
                <button className="social-btn google" disabled>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  </svg>
                  Continue with Google
                </button>
                <button className="social-btn facebook" disabled>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </button>
              </div>
              
              <div className="divider">
                <span>or sign in with password</span>
              </div>
              
              <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="input-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    placeholder="admin@boundlessmoments.com"
                    value="admin@boundlessmoments.com"
                    disabled
                  />
                </div>
                
                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(""); // Clear error when user types
                    }}
                    onKeyPress={handleKeyPress}
                    autoComplete="current-password"
                  />
                </div>
                
                <button
                  type="button"
                  className="sign-in-btn"
                  onClick={handleLogin}
                >
                  Sign In
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {error && (
                  <div className="error-msg">
                    <strong>❌ {error}</strong>
                    <br />
                    <small>Please enter the correct password to continue.</small>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full Dashboard UI with complete functionality
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Portfolio Dashboard</h1>
            <p>Manage your photography portfolio</p>
          </div>
          <div className="header-right">
            <div className="user-menu">
              <div className="user-avatar">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Admin" />
              </div>
              <div className="user-info">
                <span className="user-name">Sandip Chettri</span>
                <span className="user-role">Administrator</span>
              </div>
              <button className="logout-btn" onClick={() => {
                setAuth(false);
                setPassword("");
                setError("");
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📸</div>
            <div className="stat-info">
              <h3>{works.length}</h3>
              <p>Total Works</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-info">
              <h3>{new Set(works.map(w => w.category)).size}</h3>
              <p>Categories</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>4.9</h3>
              <p>Rating</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>1.2k</h3>
              <p>Visitors</p>
            </div>
          </div>
        </div>

        <div className="main-grid">
          <div className="add-work-section">
            <div className="section-card">
              <div className="card-header">
                <h2>Add New Work</h2>
                <p>Upload a new piece to your portfolio</p>
              </div>
              <form className="modern-form" onSubmit={handleAdd}>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Project Title</label>
                    <input
                      type="text"
                      placeholder="Enter project title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Nature / Mountain">Nature / Mountain</option>
                      <option value="Love / Couple">Love / Couple</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                </div>
                <div className="input-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Add to Portfolio
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="works-section">
            <div className="section-card">
              <div className="card-header">
                <h2>Portfolio Works</h2>
                <p>Manage your existing portfolio items</p>
              </div>
              
              {loading && (
                <div className="loading-state">
                  <div className="spinner large"></div>
                  <p>Loading portfolio...</p>
                </div>
              )}

              {!loading && works.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">📷</div>
                  <h3>No works yet</h3>
                  <p>Add your first portfolio piece using the form above</p>
                </div>
              )}

              <div className="works-grid">
                {works.map((work) => (
                  <div key={work._id || work.id} className="work-card">
                    <div className="work-image">
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                      />
                      <div className="image-overlay">
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(work._id || work.id)}
                          disabled={loading}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="work-info">
                      <h3>{work.title}</h3>
                      <span className="category-badge">{work.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
