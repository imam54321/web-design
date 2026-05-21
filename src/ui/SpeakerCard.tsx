interface SpeakerCardProps {
  name: string;
  role: string;
  image: string;
}

export default function SpeakerCard({
  name,
  role,
  image,
}: SpeakerCardProps) {
  return (
    <div className="w-64 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover"
      />

      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 mt-1">{role}</p>
      </div>
    </div>
  );
}