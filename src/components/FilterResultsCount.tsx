interface FilterResultsCountProps {
  count: number;
  searchQuery: string;
  selectedTopic: string;
  itemType?: string; // e.g., "post" or "project"
}

export default function FilterResultsCount({ 
  count, 
  searchQuery, 
  selectedTopic,
  itemType = 'item'
}: FilterResultsCountProps) {
  if (!searchQuery && selectedTopic === 'All') {
    return null;
  }

  return (
    <p className="text-gray-400 mb-6">
      Found {count} {itemType}{count !== 1 ? 's' : ''}
      {searchQuery && ` matching "${searchQuery}"`}
      {selectedTopic !== 'All' && searchQuery && ' in'}
      {selectedTopic !== 'All' && !searchQuery && ' with'}
      {selectedTopic !== 'All' && ` ${selectedTopic}`}
    </p>
  );
}
