interface CardProps {
  name: string;
  description: string;
  image: string;
}

export default function Card({ name, description, image }: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-contain rounded"
      />{' '}
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
