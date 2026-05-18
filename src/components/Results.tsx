import Card from './Card';

interface ResultsProps {
  items: Array<{
    name: string;
    description: string;
    image: string;
  }>;
}

export default function Results({ items }: ResultsProps) {
  const cards = items.map((item, index) => (
    <Card
      key={index}
      name={item.name}
      description={item.description}
      image={item.image}
    />
  ));

  return (
    <div className="space-y-3 p-4 bg-white rounded-lg shadow">{cards}</div>
  );
}
