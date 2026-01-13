import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCommentDots, FaPaperPlane } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { unlockAchievement } from '../utils/achievements';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xblnezrg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        unlockAchievement('networker');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const contactLinks = [
    {
      name: 'Email',
      href: 'mailto:chaseroohms@gmail.com',
      icon: FaEnvelope,
      description: 'Send me an email',
      handle: 'chaseroohms@gmail.com',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/chase-roohms',
      icon: FaGithub,
      description: 'Check out my code',
      handle: '@chase-roohms',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/chaseroohms',
      icon: FaLinkedin,
      description: 'Connect professionally',
      handle: 'Chase Roohms',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Chase Roohms - DevOps Engineer & Automation Evangelist</title>
        <meta name="description" content="Get in touch with Chase Roohms via email, GitHub, or LinkedIn. Let's connect!" />
        <meta name="author" content="Chase Roohms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaseroohms.com/contact" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Chase Roohms" />
        <meta property="og:title" content="Contact - Chase Roohms" />
        <meta property="og:description" content="Get in touch with Chase Roohms via email, GitHub, or LinkedIn. Let's connect!" />
        <meta property="og:image" content="https://chaseroohms.com/social-preview.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:alt" content="Chase Roohms - DevOps Engineer Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact - Chase Roohms" />
        <meta name="twitter:description" content="Get in touch with Chase Roohms via email, GitHub, or LinkedIn. Let's connect!" />
        <meta name="twitter:image" content="https://chaseroohms.com/social-preview.webp" />
        <link rel="canonical" href="https://chaseroohms.com/contact" />
      </Helmet>
      <div className="section-container py-8 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center flex items-center justify-center gap-3">
          <FaCommentDots className="text-primary-400" />
          Get in Touch
        </h1>
        <p className="text-gray-400 text-lg mb-12 text-center">
          Send me a message or connect on your preferred platform.
        </p>

        {/* Contact Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FaPaperPlane className="text-primary-400" />
            Send a Message
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            {formState === 'success' && (
              <div className="bg-green-900/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {formState === 'error' && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                ✗ Failed to send message. Please try again or email me directly.
              </div>
            )}

            <button
              type="submit"
              disabled={formState === 'submitting'}
              className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {formState === 'submitting' ? (
                <>Sending...</>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social Links */}
        <h2 className="text-2xl font-bold mb-6 text-center">Or Connect Via</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-primary-500 hover:bg-gray-800 transition-all group"
            >
              <div className="flex gap-3 mb-3">
                <link.icon className="w-12 h-12 text-primary-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-1">{link.name}</h3>
                  <p className="text-gray-400 text-sm">{link.description}</p>
                </div>
              </div>
              <p className="text-primary-400 font-mono text-sm break-all">{link.handle}</p>
            </a>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
