import Card from '../Card/Card';

interface ResultsProps {
  items: Array<{
    name: string;
    description: string;
    image: string;
    id: string;
  }>;
}

export default function Results({ items }: ResultsProps) {
  const cards = items.map((item, index) => (
    <Card
      key={index}
      name={item.name}
      description={item.description}
      image={item.image}
      id={item.id}
    />
  ));

  return (
    <div className="space-y-3 p-4 bg-white rounded-lg shadow">{cards}</div>
  );
}
