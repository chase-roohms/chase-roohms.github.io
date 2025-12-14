import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Chase Roohms. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a
              href="https://github.com/chase-roohms"
              target="_blank"
              className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/chaseroohms"
              target="_blank"
              className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
