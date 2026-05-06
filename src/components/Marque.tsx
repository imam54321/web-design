import SpeakerCard from "../ui/SpeakerCard";

interface Speaker {
  name: string;
  role: string;
  imageUrl: string;
}

export default function MarqueeSpeakers({ speakers }: { speakers: Speaker[] }) {
  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-8 animate-marquee">
        {[...speakers, ...speakers].map((item, i) => (
          <div key={i} className="shrink-0">
            <SpeakerCard
              name={item.name}
              role={item.role}
              imageUrl={item.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}