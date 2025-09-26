import React from 'react';
import Navbar from '../components/Navbar';
import { FaEnvelope, FaInstagram, FaWhatsapp, FaPhone, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="page contact-page">
        <section className="container">
          <h1 className="page-title">About SkillBarter</h1>
          <p className="page-desc">
            SkillBarter connects people with complementary skills for learning and sharing. Here’s how to reach us:
          </p>

          <div className="contact-cards">
            {/* First row */}
            <div className="contact-card">
              <FaEnvelope className="icon" />
              <h3>Email</h3>
              <p>innovate@skillbarter.com</p>
            </div>

            <div className="contact-card">
              <FaPhone className="icon" />
              <h3>Phone</h3>
              <p>+91 12345 67890</p>
            </div>

            <div className="contact-card">
              <FaWhatsapp className="icon" />
              <h3>WhatsApp</h3>
              <p>+91 12345 67890</p>
            </div>

            {/* Second row */}
            <div className="contact-card">
              <FaInstagram className="icon" />
              <h3>Instagram</h3>
              <p>@skillbarter_official</p>
            </div>

            <div className="contact-card">
              <FaGlobe className="icon" />
              <h3>Website</h3>
              <p>www.skillbarter.com</p>
            </div>

            <div className="contact-card">
              <FaMapMarkerAlt className="icon" />
              <h3>Location</h3>
              <p>Madurai, India</p>
            </div>
          </div>

          <p className="contact-msg">
            🌟 Connect with us and start your skill-sharing journey today!
          </p>
        </section>
      </main>
    </>
  );
}
