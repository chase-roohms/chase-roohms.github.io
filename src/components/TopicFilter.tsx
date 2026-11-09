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
      <h2 className="text-sm font-medium text-gray-400 mb-3">Filter by topic</h2>
      <div 
        ref={containerRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {topics.map(topic => (
          <button
            key={topic}
            ref={topic === selectedTopic ? selectedButtonRef : null}
            onClick={() => onTopicChange(topic)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap flex-shrink-0 ${
              selectedTopic === topic
                ? 'bg-primary-400 border-primary-400 text-gray-950'
                : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-100'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
