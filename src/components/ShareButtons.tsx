import { useState, useRef, useEffect } from 'react';
import { FaTwitter, FaLinkedin, FaReddit, FaLink, FaCheck, FaPaperPlane } from 'react-icons/fa';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-all"
        aria-label="Share post"
      >
        <FaPaperPlane className="w-4 h-4" />
        <span className="text-sm font-semibold">Share</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 p-3 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50">
          <div className="flex items-center gap-2">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#1DA1F2] text-gray-400 hover:text-white transition-all"
              aria-label="Share on Twitter"
            >
              <FaTwitter className="w-4 h-4" />
            </a>

            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#0A66C2] text-gray-400 hover:text-white transition-all"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>

            <a
              href={shareLinks.reddit}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#FF4500] text-gray-400 hover:text-white transition-all"
              aria-label="Share on Reddit"
            >
              <FaReddit className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-primary-600 text-gray-400 hover:text-white transition-all"
              aria-label="Copy link"
            >
              {copied ? <FaCheck className="w-4 h-4 text-green-400" /> : <FaLink className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
