import { useSelectedStore } from '../../store/selectedStore';

interface CardProps {
  name: string;
  description: string;
  image: string;
  id: string;
}

export default function Card({ name, description, image, id }: CardProps) {
  const toggle = useSelectedStore((state) => state.toggle);
  const isSelected = useSelectedStore((state) => state.selectedIds.has(id));
  return (
    <div className="relative border rounded-lg p-4 shadow-sm flex flex-col items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation();
          toggle(id);
        }}
        className="absolute top-3 left-3 w-5 h-5 cursor-pointer accent-blue-600"
      />
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
