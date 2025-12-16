import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FilterableItem {
  topics?: string[];
  tech?: string[];
  title: string;
  description: string;
  date?: string;
  fullDate?: string;
}

export function useContentFilter<T extends FilterableItem>(items: T[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTopic = searchParams.get('topic') || 'All';
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Get all unique topics sorted by occurrence count and recency
  const allTopics = useMemo(() => {
    const topicData = new Map<string, { count: number; mostRecentDate: Date }>();
    
    items.forEach(item => {
      const itemTopics = item.topics || item.tech || [];
      const itemDate = new Date(item.date || item.fullDate || 0);
      
      itemTopics.forEach(topic => {
        const existing = topicData.get(topic);
        if (existing) {
          existing.count++;
          if (itemDate > existing.mostRecentDate) {
            existing.mostRecentDate = itemDate;
          }
        } else {
          topicData.set(topic, { count: 1, mostRecentDate: itemDate });
        }
      });
    });

    const sortedTopics = Array.from(topicData.entries())
      .sort(([, a], [, b]) => {
        // Sort by count first (descending)
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        // Then by most recent date (descending)
        return b.mostRecentDate.getTime() - a.mostRecentDate.getTime();
      })
      .map(([topic]) => topic);

    return ['All', ...sortedTopics];
  }, [items]);

  // Filter items by selected topic and search query
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const itemTopics = item.topics || item.tech || [];
      const matchesTopic = selectedTopic === 'All' || itemTopics.includes(selectedTopic);
      const matchesSearch = searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itemTopics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTopic && matchesSearch;
    });
  }, [items, selectedTopic, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const newParams: Record<string, string> = {};
    if (value) newParams.search = value;
    if (selectedTopic !== 'All') newParams.topic = selectedTopic;
    setSearchParams(newParams);
  };

  const handleTopicChange = (topic: string) => {
    const newParams: Record<string, string> = {};
    if (searchQuery) newParams.search = searchQuery;
    if (topic !== 'All') newParams.topic = topic;
    setSearchParams(newParams);
  };

  return {
    searchQuery,
    selectedTopic,
    allTopics,
    filteredItems,
    handleSearchChange,
    handleTopicChange,
  };
}
