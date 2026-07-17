import { useState } from 'react';
import { Mail, MapPin, Send, Terminal } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [formData, setFormData] = useState({
    alias: '',
    address: '',
    payload: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEncrypting(true);

    // Simulate encryption / transmit delay
    setTimeout(() => {
      setIsEncrypting(false);

      const subject = encodeURIComponent(`Secure Comms from: ${formData.alias}`);
      const body = encodeURIComponent(`SENDER ALIAS: ${formData.alias}\nRETURN ADDRESS: ${formData.address}\n\nPAYLOAD:\n${formData.payload}`);

      window.location.href = `mailto:chanwit.loeyos@gmail.com?subject=${subject}&body=${body}`;

      // Reset form
      setFormData({ alias: '', address: '', payload: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">System Comms</span>
          <h2 className="section-title">Secure Drop</h2>
          <div className="section-divider" />
        </div>

        <div className="contact-grid">
          {/* Left: Active Nodes */}
          <div className="contact-nodes-panel card">
            <div className="panel-header">
              <Terminal size={18} />
              <span>ACTIVE_NODES.log</span>
            </div>
            <div className="panel-body">
              <p className="contact-intro">
                &gt; SYSTEM STATUS: READY<br />
                &gt; Open to internship opportunities and security operations.<br />
                &gt; Select a node below or initiate secure transmission.
              </p>

              <div className="nodes-list">
                <a href="mailto:chanwit.loeyos@gmail.com" className="node-item">
                  <div className="node-icon"><Mail size={20} /></div>
                  <div className="node-info">
                    <span className="node-id">NODE_01 // EMAIL</span>
                    <span className="node-val">chanwit.loeyos@gmail.com</span>
                  </div>
                </a>

                <div className="node-item non-link">
                  <div className="node-icon"><MapPin size={20} /></div>
                  <div className="node-info">
                    <span className="node-id">NODE_02 // LOCATION</span>
                    <span className="node-val">Bangkok, Thailand</span>
                  </div>
                </div>

                <a href="https://github.com/chanwit-loeyos" target="_blank" rel="noopener noreferrer" className="node-item">
                  <div className="node-icon"><FaGithub size={20} /></div>
                  <div className="node-info">
                    <span className="node-id">NODE_03 // GITHUB</span>
                    <span className="node-val">/chanwit-loeyos</span>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/chanwit-loeyos-b54a202a0/" target="_blank" rel="noopener noreferrer" className="node-item">
                  <div className="node-icon"><FaLinkedin size={20} /></div>
                  <div className="node-info">
                    <span className="node-id">NODE_04 // LINKEDIN</span>
                    <span className="node-val">/in/chanwit-loeyos</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Secure Transmission Form */}
          <div className="secure-form-panel card">
            <div className="panel-header">
              <Terminal size={18} />
              <span>TRANSMISSION_PROTOCOL.exe</span>
            </div>
            <div className="panel-body">
              <form onSubmit={handleSubmit} className="cyber-form">

                <div className="form-group">
                  <label htmlFor="alias">&gt; ENTER_SENDER_ALIAS:</label>
                  <input
                    type="text"
                    id="alias"
                    name="alias"
                    required
                    autoComplete="off"
                    value={formData.alias}
                    onChange={handleChange}
                    placeholder="e.g. Neo"
                  />
                  <div className="input-line"></div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">&gt; ENTER_RETURN_ADDRESS:</label>
                  <input
                    type="email"
                    id="address"
                    name="address"
                    required
                    autoComplete="off"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. neo@matrix.com"
                  />
                  <div className="input-line"></div>
                </div>

                <div className="form-group">
                  <label htmlFor="payload">&gt; INPUT_PAYLOAD:</label>
                  <textarea
                    id="payload"
                    name="payload"
                    rows="5"
                    required
                    value={formData.payload}
                    onChange={handleChange}
                    placeholder="Enter your message..."
                  ></textarea>
                  <div className="input-line"></div>
                </div>

                <button
                  type="submit"
                  className={`cyber-submit-btn ${isEncrypting ? 'encrypting' : ''}`}
                  disabled={isEncrypting}
                >
                  {isEncrypting ? (
                    <span className="glitch-text" data-text="ENCRYPTING...">ENCRYPTING...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>TRANSMIT_DATA</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
