'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map component to disable Server-Side Rendering (SSR) for Leaflet
const RestaurantMap = dynamic(() => import('./components/RestaurantMap'), { ssr: false });

export default function Home() {
  // 1. Header Scroll Effect State
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Mobile Menu Toggle State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // 3. Active Nav Link Intersection Observer
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute('id') || '');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // 4. Menu Category Tab Switching State
  const [activeTab, setActiveTab] = useState('starters');
  const [isPanelActive, setIsPanelActive] = useState(true);

  const handleTabChange = (tabId) => {
    setIsPanelActive(false);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsPanelActive(true);
    }, 150);
  };

  // 5. Ambiance Gallery Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = 3;

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <>
      {/* Header Navigation */}
      <header id="main-header" className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="#" className="logo" id="header-logo" onClick={handleLinkClick}>
            <span className="brand-text">Bistrot Ha</span>
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-nav-toggle ${isMenuOpen ? 'open' : ''}`} 
            id="nav-toggle" 
            aria-label="Toggle NavigationMenu" 
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="hamburger"></span>
          </button>
          
          <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`} id="nav-menu">
            <ul>
              <li>
                <a 
                  href="#story" 
                  className={`nav-link ${activeSection === 'story' ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Our Story
                </a>
              </li>
              <li>
                <a 
                  href="#menu" 
                  className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Menu
                </a>
              </li>
              <li>
                <a 
                  href="#ambiance" 
                  className={`nav-link ${activeSection === 'ambiance' ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Ambiance
                </a>
              </li>
              <li>
                <a 
                  href="#reservations" 
                  className={`nav-link ${activeSection === 'reservations' ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Reservations
                </a>
              </li>
              <li>
                <a 
                  href="#location" 
                  className={`nav-link ${activeSection === 'location' ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Find Us
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="header-cta">
            <a href="https://resy.com/cities/new-york-ny/venues/bistrot-ha?rwg_token=AFd1xnECz-lW4iFD3u96rGoyG7MzvM2x1vNfjC39Axo4zTNM6JQATnqwaC1cmHP-mJAFw0oSoy8nzzY0THytdk3smaUheyNJ2hy8wv7V13GirYlq_J7CHF4%3D&date=2026-06-12&seats=2" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" id="nav-book-btn">Book a Table</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div 
          className="hero-bg" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.4), rgba(18, 18, 18, 0.85)), url('/assets/bistrot_ha_ambiance.png')` 
          }}
        ></div>
        <div className="hero-content-container">
          <div className="hero-badge">Lower East Side, New York</div>
          <h1 className="hero-title">Where Parisian Bistro Heritage Meets the Soul of Saigon</h1>
          <p className="hero-subtitle">A sensory culinary dialogue by Chefs Anthony Ha & Sadie Mae Burns</p>
          <div className="hero-actions">
            <a href="#menu" className="btn btn-outline" id="hero-menu-btn">Explore Menu</a>
            <a href="#reservations" className="btn btn-primary" id="hero-book-btn">Reserve a Table</a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <a href="#story" className="scroll-arrow" aria-label="Scroll to story section">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Culinary Story Section */}
      <section className="story-section" id="story">
        <div className="container grid-2-col">
          <div className="story-image-wrapper">
            <div className="story-image-card">
              <img src="/assets/bistrot_ha_ambiance.png" alt="Bistrot Ha cozy candle-lit interior" className="story-img" loading="lazy" />
              <div className="image-overlay-card">
                <span className="card-title">137 Eldridge St.</span>
                <span className="card-desc">Lower East Side, NYC</span>
              </div>
            </div>
          </div>
          
          <div className="story-content">
            <h2 className="section-title">A Symphony of Contrast</h2>
            <div className="section-divider"></div>
            <p className="story-lead">Following the playful, boisterous spirit of their acclaimed Ha’s Snack Bar, chefs Anthony Ha and Sadie Mae Burns introduce Bistrot Ha—a mature, refined evolution on Eldridge Street.</p>
            <p className="story-text">Bistrot Ha functions as a living dialogue between two rich culinary histories. We weave the traditional, butter-fueled techniques of Paris with the bright, herbaceous, and deeply savory street flavours of Vietnam. Our space is warm and boisterous, designed to recall the neighborhood bistros of France while remaining rooted in the energetic pulse of Lower Manhattan.</p>
            
            <div className="chef-signature">
              <div className="chef-profile">
                <span className="chef-name">Anthony Ha & Sadie Mae Burns</span>
                <span className="chef-title">Co-Chefs & Founders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu Section */}
      <section className="menu-section" id="menu">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">The Menu</h2>
            <p className="section-subtitle">French bistrot sensibilities reimagined with bold Vietnamese profiles</p>
            <div className="section-divider mx-auto"></div>
          </div>
          
          {/* Menu Category Tabs */}
          <div className="menu-tabs-container">
            <div className="menu-tabs" role="tablist">
              <button 
                className={`menu-tab-btn ${activeTab === 'starters' ? 'active' : ''}`}
                role="tab" 
                aria-selected={activeTab === 'starters'} 
                aria-controls="panel-starters" 
                id="tab-starters"
                onClick={() => handleTabChange('starters')}
              >
                Pour Commencer
              </button>
              <button 
                className={`menu-tab-btn ${activeTab === 'mains' ? 'active' : ''}`}
                role="tab" 
                aria-selected={activeTab === 'mains'} 
                aria-controls="panel-mains" 
                id="tab-mains"
                onClick={() => handleTabChange('mains')}
              >
                Plats Principaux
              </button>
              <button 
                className={`menu-tab-btn ${activeTab === 'drinks' ? 'active' : ''}`}
                role="tab" 
                aria-selected={activeTab === 'drinks'} 
                aria-controls="panel-drinks" 
                id="tab-drinks"
                onClick={() => handleTabChange('drinks')}
              >
                Cocktails & Desserts
              </button>
            </div>
          </div>

          {/* Tab Panels */}
          <div className="menu-panels-container">
            
            {/* Panel 1: Starters */}
            <div 
              className={`menu-panel ${activeTab === 'starters' && isPanelActive ? 'active' : ''}`} 
              id="panel-starters" 
              role="tabpanel" 
              aria-labelledby="tab-starters"
              style={{ display: activeTab === 'starters' ? 'block' : 'none' }}
            >
              <div className="grid-2-col">
                {/* Menu Item 1 */}
                <div className="menu-card">
                  <div className="menu-card-img-wrapper">
                    <img src="/assets/crab_yuba_rolls.png" alt="Crispy Crab Yuba Rolls" className="menu-card-img" loading="lazy" />
                  </div>
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Crispy Crab Yuba Rolls</h3>
                      <span className="menu-card-price">$18</span>
                    </div>
                    <p className="menu-card-desc">Crunchy bean curd skin stuffed with blue crab, minced heritage pork, water chestnuts, and fresh wood ear mushrooms, served with an aromatic herb nuoc cham dipping sauce.</p>
                    <div className="menu-card-tags">
                      <span className="tag-signature">Chef Signature</span>
                    </div>
                  </div>
                </div>

                {/* Menu Item 2 */}
                <div className="menu-card">
                  <div className="menu-card-img-wrapper">
                    <img src="/assets/eggs_mayo_maggi.png" alt="Oeufs Mayo with Maggi" className="menu-card-img" loading="lazy" />
                  </div>
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Oeufs Mayo avec Maggi</h3>
                      <span className="menu-card-price">$14</span>
                    </div>
                    <p className="menu-card-desc">Soft-boiled organic eggs with jammy, custard-like yolks, topped with a creamy Kewpie mayonnaise infused with savory Maggi seasoning, crispy golden shallots, and micro-chives.</p>
                    <div className="menu-card-tags">
                      <span className="tag-popular">Popular</span>
                    </div>
                  </div>
                </div>

                {/* Menu Item 3 */}
                <div className="menu-card text-only">
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Pâté Chaud</h3>
                      <span className="menu-card-price">$16</span>
                    </div>
                    <p className="menu-card-desc">Flaky, golden puff pastry baked fresh and stuffed with a savory, spiced pork pâté, minced wood ear mushrooms, and coarse black pepper.</p>
                  </div>
                </div>

                {/* Menu Item 4 */}
                <div className="menu-card text-only">
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Leeks Vinaigrette</h3>
                      <span className="menu-card-price">$15</span>
                    </div>
                    <p className="menu-card-desc">Tender, slow-poached baby leeks served with a warm fermented mussel vinaigrette, toasted pine nuts, garlic chips, and a bouquet of fresh Vietnamese herbs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2: Mains */}
            <div 
              className={`menu-panel ${activeTab === 'mains' && isPanelActive ? 'active' : ''}`} 
              id="panel-mains" 
              role="tabpanel" 
              aria-labelledby="tab-mains"
              style={{ display: activeTab === 'mains' ? 'block' : 'none' }}
            >
              <div className="grid-2-col">
                {/* Menu Item 5 */}
                <div className="menu-card">
                  <div className="menu-card-img-wrapper">
                    <img src="/assets/steak_frites.png" alt="Bistrot Ha Steak Frites" className="menu-card-img" loading="lazy" />
                  </div>
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Steak Frites avec Sauce Bordelaise</h3>
                      <span className="menu-card-price">$48</span>
                    </div>
                    <p className="menu-card-desc">Prime dry-aged ribeye steak seared in butter and sliced, finished with a lemongrass and black cardamom-infused Bordelaise sauce, roasted bone marrow butter, watercress, and hand-cut crispy golden frites.</p>
                    <div className="menu-card-tags">
                      <span className="tag-signature">Chef Signature</span>
                    </div>
                  </div>
                </div>

                {/* Menu Item 6 */}
                <div className="menu-card text-only">
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Lobster Curry Vol-au-Vent</h3>
                      <span className="menu-card-price">$44</span>
                    </div>
                    <p className="menu-card-desc">Tender butter-poached Maine lobster tails swimming in a fragrant yellow coconut curry with lemongrass and ginger, served inside a towering, flaky puff pastry shell.</p>
                  </div>
                </div>

                {/* Menu Item 7 */}
                <div className="menu-card text-only">
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Boudin Noir aux Épices</h3>
                      <span className="menu-card-price">$38</span>
                    </div>
                    <p className="menu-card-desc">Classic French blood sausage seared in brown butter, accompanied by five-spice caramelized apples, a ginger-soy reduction, and silky potato purée.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3: Drinks & Desserts */}
            <div 
              className={`menu-panel ${activeTab === 'drinks' && isPanelActive ? 'active' : ''}`} 
              id="panel-drinks" 
              role="tabpanel" 
              aria-labelledby="tab-drinks"
              style={{ display: activeTab === 'drinks' ? 'block' : 'none' }}
            >
              <div className="grid-2-col">
                {/* Menu Item 8 */}
                <div className="menu-card text-only">
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Pickled Oyster Martini</h3>
                      <span className="menu-card-price">$19</span>
                    </div>
                    <p className="menu-card-desc">Dry gin, premium vermouth, and a splash of house-made pickled oyster brine, served ice-cold with a fresh, chilled pickled oyster on a cocktail skewer.</p>
                    <div className="menu-card-tags">
                      <span className="tag-signature">Signature Drink</span>
                    </div>
                  </div>
                </div>

                {/* Menu Item 9 */}
                <div className="menu-card text-only">
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Pandan Crème Brûlée</h3>
                      <span className="menu-card-price">$12</span>
                    </div>
                    <p className="menu-card-desc">Silky, aromatic pandan leaf custard topped with a caramelized sugar crust, served with toasted coconut flakes and fresh raspberries.</p>
                  </div>
                </div>

                {/* Menu Item 10 */}
                <div className="menu-card text-only">
                  <div className="menu-card-content">
                    <div className="menu-card-header">
                      <h3 className="menu-card-title">Vietnamese Coffee Profiteroles</h3>
                      <span className="menu-card-price">$14</span>
                    </div>
                    <p className="menu-card-desc">Crisp choux pastry shells stuffed with rich condensed milk gelato and drizzled with a warm, dark espresso-fudge sauce.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ambiance Showcase Section */}
      <section className="ambiance-section" id="ambiance">
        <div className="container">
          <div className="grid-2-col align-center">
            <div className="ambiance-content">
              <h2 className="section-title">The Ambiance</h2>
              <div className="section-divider"></div>
              <p className="ambiance-lead">A cozy, bustling room where custom-crafted details elevate the neighborhood dining experience.</p>
              <p className="ambiance-text">Illuminated by the soft, golden light of custom brass lamps designed by James Cherry, the dining room pairs pristine white tablecloths with warm wood accents and checkered mosaic floors. The room is lively, loud, and intimate—perfect for sharing bottles of natural wine and lingering over late-night dessert.</p>
              
              <div className="ambiance-features">
                <div className="feature-item">
                  <span className="feature-title">The Lighting Design</span>
                  <span className="feature-desc">Bespoke lighting by designer James Cherry cast a warm, candle-like glow across the space.</span>
                </div>
                <div className="feature-item">
                  <span className="feature-title">The Bar Queue</span>
                  <span className="feature-desc">A 12-seat solid walnut bar reserved exclusively for walk-ins, capturing the energetic LES dining spirit.</span>
                </div>
              </div>
            </div>
            
            <div 
              className="slider-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="slider-wrapper" id="ambiance-slider">
                {/* Slide 1 */}
                <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
                  <img src="/assets/bistrot_ha_ambiance.png" alt="Candle-lit dining tables at Bistrot Ha" className="slide-img" />
                  <div className="slide-caption">The dining room at Bistrot Ha, featuring warm custom brass lighting.</div>
                </div>
                {/* Slide 2 */}
                <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
                  <div 
                    className="slide-placeholder" 
                    style={{ 
                      backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.4), rgba(18, 18, 18, 0.8)), url('/assets/steak_frites.png')` 
                    }}
                  >
                    <div className="slide-placeholder-content">
                      <h3>Bistro Classics, Reimagined</h3>
                      <p>Steak frites with aromatic Vietnamese accents served on classic dinnerware.</p>
                    </div>
                  </div>
                </div>
                {/* Slide 3 */}
                <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
                  <div 
                    className="slide-placeholder" 
                    style={{ 
                      backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.4), rgba(18, 18, 18, 0.8)), url('/assets/crab_yuba_rolls.png')` 
                    }}
                  >
                    <div className="slide-placeholder-content">
                      <h3>Intimate Plates</h3>
                      <p>Delicate, bold recipes cooked with seasonal ingredients and traditional spices.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Slider Navigation */}
              <div className="slider-controls">
                <button className="slider-arrow prev" id="slider-prev" aria-label="Previous image" onClick={handlePrevSlide}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="slider-dots" id="slider-dots">
                  {[0, 1, 2].map((idx) => (
                    <button 
                      key={idx}
                      className={`dot ${currentSlide === idx ? 'active' : ''}`} 
                      data-index={idx} 
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setCurrentSlide(idx)}
                    ></button>
                  ))}
                </div>
                <button className="slider-arrow next" id="slider-next" aria-label="Next image" onClick={handleNextSlide}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservations Section */}
      <section className="reservations-section" id="reservations">
        <div className="container-narrow text-center">
          <h2 className="section-title">Reservations & Walk-Ins</h2>
          <p className="section-subtitle">We look forward to hosting you on Eldridge Street</p>
          <div className="section-divider mx-auto"></div>
          
          <div className="reservation-card glass-card">
            <div className="card-grid">
              <div className="card-column">
                <div className="icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <h3>Book via Resy</h3>
                <p className="res-text">Our primary dining tables are released on Resy 14 days in advance at exactly 10:00 AM EST. Due to limited spacing, reservations are highly recommended.</p>
                <a href="https://resy.com/cities/new-york-ny/venues/bistrot-ha?rwg_token=AFd1xnECz-lW4iFD3u96rGoyG7MzvM2x1vNfjC39Axo4zTNM6JQATnqwaC1cmHP-mJAFw0oSoy8nzzY0THytdk3smaUheyNJ2hy8wv7V13GirYlq_J7CHF4%3D&date=2026-06-12&seats=2" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="card-resy-btn">Book on Resy</a>
              </div>
              
              <div className="card-divider-vertical"></div>
              
              <div className="card-column">
                <div className="icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>Walk-Ins & Bar Queue</h3>
                <p className="res-text">We reserve our 12-seat walnut bar counter and select cocktail tables for walk-in guests. Our digital and physical waitlist opens at the host stand at 5:15 PM every evening.</p>
                <a href="#location" className="btn btn-outline">Directions & Map</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location / Map Section */}
      <section className="location-section" id="location">
        <div className="container grid-2-col align-stretch">
          <div className="contact-info">
            <h2 className="section-title">Find Us</h2>
            <div className="section-divider"></div>
            
            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Address</h3>
                  <p>137 Eldridge Street<br />New York, NY 10002</p>
                  <a href="https://maps.app.goo.gl/VwcpDWYT38VX7Nwg6" target="_blank" rel="noopener noreferrer" className="text-link">Open in Google Maps</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Hours</h3>
                  <p>Tuesday &ndash; Saturday<br />5:30 PM &ndash; 10:30 PM</p>
                  <p className="text-muted">Closed Sunday &amp; Monday</p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="map-wrapper">
            <RestaurantMap />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container text-center">
          <h2 className="footer-logo">Bistrot Ha</h2>
          <p className="footer-tagline">French-Vietnamese Bistro | Lower East Side, NYC</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/has_dac_biet" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
          <div className="footer-divider"></div>
          <p className="copyright">&copy; 2026 Bistrot Ha. All rights reserved. Reservations powered by Resy.</p>
        </div>
      </footer>
    </>
  );
}
