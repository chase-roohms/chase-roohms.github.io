import { FaGithub, FaLinkedin, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
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
        <title>Contact - Chase Roohms</title>
        <meta name="description" content="Get in touch with Chase Roohms via email, GitHub, LinkedIn, or Discord. Let's connect!" />
        <meta property="og:title" content="Contact - Chase Roohms" />
        <meta property="og:description" content="Get in touch with Chase Roohms via email, GitHub, LinkedIn, or Discord." />
        <meta property="og:url" content="https://chaseroohms.com/contact" />
        <link rel="canonical" href="https://chaseroohms.com/contact" />
      </Helmet>
      <div className="section-container py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center flex items-center justify-center gap-3">
          <FaCommentDots className="text-primary-400" />
          Get in Touch
        </h1>
        <p className="text-gray-400 text-lg mb-16 text-center">
          Feel free to reach out through any of these platforms.
        </p>

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
