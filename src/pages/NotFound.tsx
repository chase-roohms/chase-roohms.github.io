import { Helmet } from 'react-helmet-async';
import { FaRobot } from 'react-icons/fa';
import { useState } from 'react';

const funMessages = [
  {
    title: "Beep Boop!",
    message: "My automation scripts couldn't find this page. Looks like it's a manual intervention situation!",
  },
  {
    title: "Houston, we have a problem",
    message: "This page escaped the deployment pipeline. Even my CI/CD skills can't bring it back!",
  },
  {
    title: "Coffee Not Found",
    message: "This page is like my coffee on a Monday morning... nowhere to be found. But unlike coffee, it doesn't actually exist.",
  },
  {
    title: "It's Not a Bug...",
    message: "...it's a feature! Just kidding, this page genuinely doesn't exist. Not everything can be solved with DevOps.",
  },
  {
    title: "Infrastructure Error",
    message: "Looks like this page wasn't provisioned. Even Infrastructure as Code has its limits!",
  },
  {
    title: "Container Not Found",
    message: "This page isn't in any of my Docker containers. Trust me, I checked all the layers!",
  },
];

export default function NotFound() {
  const [message] = useState(() => 
    funMessages[Math.floor(Math.random() * funMessages.length)]
  );

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found - Chase Roohms</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="section-container py-20 min-h-[60vh] flex items-center justify-center">
        <div className={`text-center max-w-2xl transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <FaRobot className="text-primary-400 text-7xl mx-auto mb-6 animate-bounce" />
          
          <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-300">
            {message.title}
          </h2>
          
          <p className="text-gray-300 text-xl mb-8 leading-relaxed">
            {message.message}
          </p>

          <div className="bg-gray-900 border border-primary-800 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-sm text-gray-400 font-mono text-left">
              <span className="text-primary-400">Error Code:</span> ENOENT<br/>
              <span className="text-primary-400">Status:</span> 404<br/>
              <span className="text-primary-400">Message:</span> Resource not found in production
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
