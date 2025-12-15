export default function CircuitDecoration() {
  return (
    <div className="absolute -top-32 -left-32 w-[900px] h-[700px] pointer-events-none opacity-60 z-0">
      <svg viewBox="0 0 700 500" className="w-full h-full" style={{ transform: 'rotate(-45deg)', transformOrigin: 'center center' }}>
        {/* Circuit paths */}
        <path d="M 0 100 L 100 100 L 100 50 L 180 50" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 0 150 L 150 150 L 150 100 L 230 100" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 50 0 L 50 120 L 130 120" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 100 0 L 100 180 L 200 180 L 200 130" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 150 0 L 150 230 L 250 230" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 0 200 L 80 200 L 80 250 L 180 250" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 0 250 L 230 250 L 230 200 L 280 200" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 0 300 L 120 300 L 120 280 L 200 280" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 200 0 L 200 150 L 280 150" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 250 0 L 250 180 L 320 180 L 320 230" stroke="#1f2937" strokeWidth="2" fill="none" />
        
        {/* Extended horizontal paths */}
        <path d="M 280 50 L 350 50 L 350 100 L 430 100" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 320 100 L 400 100 L 400 150 L 480 150" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 350 0 L 350 120 L 430 120" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 400 0 L 400 180 L 500 180 L 500 130" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 450 0 L 450 230 L 550 230" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 280 200 L 360 200 L 360 250 L 440 250" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 320 250 L 480 250 L 480 200 L 530 200" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 280 300 L 380 300 L 380 280 L 460 280" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 500 0 L 500 150 L 580 150" stroke="#1f2937" strokeWidth="2" fill="none" />
        <path d="M 550 0 L 550 180 L 620 180 L 620 230" stroke="#1f2937" strokeWidth="2" fill="none" />
        
        {/* Circuit nodes/connection points */}
        <circle cx="100" cy="100" r="4" fill="#1f2937" />
        <circle cx="180" cy="50" r="4" fill="#1f2937" />
        <circle cx="150" cy="150" r="4" fill="#1f2937" />
        <circle cx="230" cy="100" r="4" fill="#1f2937" />
        <circle cx="50" cy="120" r="4" fill="#1f2937" />
        <circle cx="130" cy="120" r="4" fill="#1f2937" />
        <circle cx="100" cy="180" r="4" fill="#1f2937" />
        <circle cx="200" cy="180" r="4" fill="#1f2937" />
        <circle cx="150" cy="230" r="4" fill="#1f2937" />
        <circle cx="250" cy="230" r="4" fill="#1f2937" />
        <circle cx="80" cy="200" r="4" fill="#1f2937" />
        <circle cx="80" cy="250" r="4" fill="#1f2937" />
        <circle cx="180" cy="250" r="4" fill="#1f2937" />
        <circle cx="230" cy="250" r="4" fill="#1f2937" />
        <circle cx="280" cy="200" r="4" fill="#1f2937" />
        <circle cx="120" cy="300" r="4" fill="#1f2937" />
        <circle cx="120" cy="280" r="4" fill="#1f2937" />
        <circle cx="200" cy="280" r="4" fill="#1f2937" />
        <circle cx="200" cy="150" r="4" fill="#1f2937" />
        <circle cx="280" cy="150" r="4" fill="#1f2937" />
        <circle cx="250" cy="180" r="4" fill="#1f2937" />
        <circle cx="320" cy="180" r="4" fill="#1f2937" />
        <circle cx="200" cy="130" r="4" fill="#1f2937" />
        <circle cx="320" cy="230" r="4" fill="#1f2937" />
        
        {/* Extended horizontal nodes */}
        <circle cx="350" cy="50" r="4" fill="#1f2937" />
        <circle cx="350" cy="100" r="4" fill="#1f2937" />
        <circle cx="430" cy="100" r="4" fill="#1f2937" />
        <circle cx="400" cy="100" r="4" fill="#1f2937" />
        <circle cx="400" cy="150" r="4" fill="#1f2937" />
        <circle cx="480" cy="150" r="4" fill="#1f2937" />
        <circle cx="350" cy="120" r="4" fill="#1f2937" />
        <circle cx="430" cy="120" r="4" fill="#1f2937" />
        <circle cx="400" cy="180" r="4" fill="#1f2937" />
        <circle cx="500" cy="180" r="4" fill="#1f2937" />
        <circle cx="450" cy="230" r="4" fill="#1f2937" />
        <circle cx="550" cy="230" r="4" fill="#1f2937" />
        <circle cx="360" cy="200" r="4" fill="#1f2937" />
        <circle cx="360" cy="250" r="4" fill="#1f2937" />
        <circle cx="440" cy="250" r="4" fill="#1f2937" />
        <circle cx="480" cy="250" r="4" fill="#1f2937" />
        <circle cx="530" cy="200" r="4" fill="#1f2937" />
        <circle cx="380" cy="300" r="4" fill="#1f2937" />
        <circle cx="380" cy="280" r="4" fill="#1f2937" />
        <circle cx="460" cy="280" r="4" fill="#1f2937" />
        <circle cx="500" cy="150" r="4" fill="#1f2937" />
        <circle cx="580" cy="150" r="4" fill="#1f2937" />
        <circle cx="550" cy="180" r="4" fill="#1f2937" />
        <circle cx="620" cy="180" r="4" fill="#1f2937" />
        <circle cx="500" cy="130" r="4" fill="#1f2937" />
        <circle cx="620" cy="230" r="4" fill="#1f2937" />
      </svg>
    </div>
  );
}
