import { FaChevronDown } from 'react-icons/fa';

interface TopicSelectProps {
  topics: string[];
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

export default function TopicSelect({ topics, selectedTopic, onTopicChange }: TopicSelectProps) {
  return (
    <div className="relative">
      <label htmlFor="topic-select" className="sr-only">Filter by topic</label>
      <select
        id="topic-select"
        value={selectedTopic}
        onChange={(e) => onTopicChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-800 bg-gray-900 py-3 pl-4 pr-10 text-gray-100 transition-colors hover:border-gray-700 focus:border-primary-500 focus:outline-none"
      >
        {topics.map((topic) => (
          <option key={topic} value={topic}>
            {topic === 'All' ? 'All topics' : topic}
          </option>
        ))}
      </select>
      <FaChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}
