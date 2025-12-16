import { useRef, useEffect } from 'react';

interface TopicFilterProps {
  topics: string[];
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

export default function TopicFilter({ 
  topics, 
  selectedTopic, 
  onTopicChange 
}: TopicFilterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedButtonRef.current && containerRef.current) {
      selectedButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedTopic]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filter by Topic</h2>
      <div 
        ref={containerRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {topics.map(topic => (
          <button
            key={topic}
            ref={topic === selectedTopic ? selectedButtonRef : null}
            onClick={() => onTopicChange(topic)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
              selectedTopic === topic
                ? 'bg-primary-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
