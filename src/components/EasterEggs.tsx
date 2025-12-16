import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './EasterEggs.css';

interface EasterEggsProps {
  active: boolean;
  onClose: () => void;
}

interface EasterEggModalProps {
  active: boolean;
  children: ReactNode;
  backgroundEffect?: ReactNode;
}

function EasterEggModal({ active, children, backgroundEffect }: EasterEggModalProps) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 animate-fade-in overflow-y-auto py-4 md:py-0">
      <div className="text-center max-w-2xl mx-auto px-4 my-auto">
        {backgroundEffect}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export function KonamiEasterEgg({ active, onClose }: EasterEggsProps) {
  const matrixRain = (
    <div className="matrix-rain-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={i} 
          className="matrix-drop" 
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
            fontSize: `${12 + Math.random() * 8}px`,
          }}
        >
          {['0', '1', '01', '10', '101', '010', '1001'][Math.floor(Math.random() * 7)]}
        </div>
      ))}
    </div>
  );

  return (
    <EasterEggModal active={active} backgroundEffect={matrixRain}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-green-400 font-mono glitch-text" data-text="ACCESS GRANTED">
            ACCESS GRANTED
          </h1>
          
          <div className="inline-block px-6 py-2 bg-green-400 text-gray-900 font-bold rounded-full mb-8 animate-bounce-slow shadow-lg shadow-green-400/50">
            ⭐ ACHIEVEMENT UNLOCKED ⭐
          </div>
          
          {/* Dancing Pixel Characters */}
          <div className="flex justify-center items-end mb-8 gap-8">
            <div className="pixel-character">
              <div className="pixel-head"></div>
              <div className="pixel-body"></div>
              <div className="pixel-arms">
                <div className="pixel-arm-left"></div>
                <div className="pixel-arm-right"></div>
              </div>
              <div className="pixel-legs">
                <div className="pixel-leg-left"></div>
                <div className="pixel-leg-right"></div>
              </div>
            </div>
            <div className="pixel-character" style={{ animationDelay: '0.3s' }}>
              <div className="pixel-head"></div>
              <div className="pixel-body"></div>
              <div className="pixel-arms">
                <div className="pixel-arm-left"></div>
                <div className="pixel-arm-right"></div>
              </div>
              <div className="pixel-legs">
                <div className="pixel-leg-left"></div>
                <div className="pixel-leg-right"></div>
              </div>
            </div>
            <div className="pixel-character" style={{ animationDelay: '0.6s' }}>
              <div className="pixel-head"></div>
              <div className="pixel-body"></div>
              <div className="pixel-arms">
                <div className="pixel-arm-left"></div>
                <div className="pixel-arm-right"></div>
              </div>
              <div className="pixel-legs">
                <div className="pixel-leg-left"></div>
                <div className="pixel-leg-right"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border-2 border-green-400 rounded-xl p-8 mb-6 shadow-2xl shadow-green-400/20 backdrop-blur-sm">
            <div className="inline-block px-4 py-2 bg-green-400/20 border border-green-400 rounded-lg mb-4">
              <span className="text-green-400 font-mono font-bold">KONAMI_CODE_MASTER</span>
            </div>
            <p className="text-gray-300 text-xl leading-relaxed">
              You entered the legendary <strong className="text-green-400">Konami Code</strong>!
            </p>
            <p className="text-gray-400 text-sm mt-2">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              to="/achievements"
              className="btn-secondary text-lg px-8 py-3 inline-block"
              onClick={onClose}
            >
              View Achievements 🏆
            </Link>
            <button
              onClick={onClose}
              className="btn-primary text-lg px-8 py-3"
            >
              Close (Press ESC)
            </button>
          </div>
    </EasterEggModal>
  );
}

export function AutomationEasterEgg({ active, onClose }: EasterEggsProps) {
  const pipelineEffect = (
    <div className="pipeline-container">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="pipeline-segment"
          style={{
            top: `${20 + i * 15}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <div className="pipeline-flow"></div>
        </div>
      ))}
    </div>
  );

  return (
    <EasterEggModal active={active} backgroundEffect={pipelineEffect}>
      <>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-primary-400 font-mono glitch-text" data-text="AUTOMATION DETECTED">
          AUTOMATION DETECTED
        </h1>
        
        <div className="inline-block px-6 py-2 bg-primary-400 text-gray-900 font-bold rounded-full mb-8 animate-bounce-slow shadow-lg shadow-primary-400/50">
          ⭐ ACHIEVEMENT UNLOCKED ⭐
        </div>

        {/* Pipeline Animation */}
        <div className="flex justify-center items-end mb-8 gap-8">
          <div className="pipeline-animation">
            <div className="pipeline-tube">
              <div className="pipeline-person">
                <div style={{
                  position: 'absolute',
                  width: '8px',
                  height: '16px',
                  background: '#ff6200',
                  borderRadius: '4px',
                  top: '22px',
                  left: '4px',
                  boxShadow: '0 0 8px rgba(255, 98, 0, 0.6)'
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '8px',
                  height: '16px',
                  background: '#ff6200',
                  borderRadius: '4px',
                  top: '22px',
                  right: '4px',
                  boxShadow: '0 0 8px rgba(255, 98, 0, 0.6)'
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '7px',
                  height: '14px',
                  background: '#f59e0b',
                  borderRadius: '3px',
                  bottom: '0',
                  left: '10px',
                  boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)'
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '7px',
                  height: '14px',
                  background: '#f59e0b',
                  borderRadius: '3px',
                  bottom: '0',
                  right: '10px',
                  boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)'
                }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border-2 border-primary-400 rounded-xl p-8 mb-6 shadow-2xl shadow-primary-400/20 backdrop-blur-sm">
          <div className="inline-block px-4 py-2 bg-primary-400/20 border border-primary-400 rounded-lg mb-4">
            <span className="text-primary-400 font-mono font-bold">AUTOMATION_MASTER</span>
          </div>
          <p className="text-gray-300 text-xl leading-relaxed">
            You typed the magic word: <strong className="text-primary-400">"automation"</strong>!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            to="/achievements"
            className="btn-secondary text-lg px-8 py-3 inline-block"
            onClick={onClose}
          >
            View Achievements 🏆
          </Link>
          <button
            onClick={onClose}
            className="btn-primary text-lg px-8 py-3"
          >
            Close (Press ESC)
          </button>
        </div>
      </>
    </EasterEggModal>
  );
}

export function LogoClickEasterEgg({ active, onClose }: EasterEggsProps) {
  const confettiEffect = (
    <>
      <div className="confetti-container">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i} 
            className="confetti" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              backgroundColor: ['#ff6200', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 6)],
              width: `${5 + Math.random() * 10}px`,
              height: `${5 + Math.random() * 10}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-gradient-radial from-yellow-400/20 via-orange-500/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
    </>
  );

  return (
    <EasterEggModal active={active} backgroundEffect={confettiEffect}>
      <>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent animate-gradient-x">
          PERSISTENCE PAYS OFF!
        </h1>
        
        <div className="inline-block px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-full mb-8 animate-bounce-slow shadow-lg shadow-yellow-400/50">
          ⭐ ACHIEVEMENT UNLOCKED ⭐
        </div>

        {/* Hammer Smith Animation */}
        <div className="flex justify-center items-end mb-8 gap-8">
          <div className="hammer-smith-container">
            <div className="hammer-smith">
              <div className="smith-head"></div>
              <div className="smith-body"></div>
              <div className="smith-arm-left"></div>
              <div className="smith-arm-right">
                <div className="smith-hammer">
                  <div className="smith-hammer-head"></div>
                  <div className="smith-hammer-handle"></div>
                </div>
              </div>
              <div className="smith-legs">
                <div className="smith-leg-left"></div>
                <div className="smith-leg-right"></div>
              </div>
            </div>
            <div className="anvil"></div>
            <div className="impact-sparks">
              <div className="spark"></div>
              <div className="spark"></div>
              <div className="spark"></div>
              <div className="spark"></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border-2 border-yellow-400 rounded-xl p-8 mb-6 shadow-2xl shadow-yellow-400/20 backdrop-blur-sm">
          <div className="inline-block px-4 py-2 bg-yellow-400/20 border border-yellow-400 rounded-lg mb-4">
            <span className="text-yellow-400 font-mono font-bold">RAPID_CLICK_MASTER</span>
          </div>
          <p className="text-gray-300 text-xl leading-relaxed">
            You clicked the logo <strong className="text-yellow-400">20 times</strong> in rapid succession!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            to="/achievements"
            className="btn-secondary text-lg px-8 py-3 inline-block"
            onClick={onClose}
          >
            View Achievements 🏆
          </Link>
          <button
            onClick={onClose}
            className="btn-primary text-lg px-8 py-3"
          >
            Close (Press ESC)
          </button>
        </div>
      </>
    </EasterEggModal>
  );
}
