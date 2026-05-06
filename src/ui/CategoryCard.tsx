interface CategoryCardProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({
  title,
  isActive,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-6 py-3 rounded-full border-2 transition-all duration-300 
      ${
        isActive
          ? "bg-red-600 text-white border-red-600"
          : "border-red-600 text-red-600 hover:bg-red-100"
      }`}
    >
      {title}
    </div>
  );
}