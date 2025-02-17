import { eventsData } from "@/utils/eventsData";
import Image from "next/image";

export default function EventsPage() {
  return (
    <div>
      {eventsData.map((events) => (
        <div key={events.id}>
          <h2 className="text-3xl p-5">{events.title}</h2>
          <Image
            src={events.image}
            alt={events.alt}
            width={events.width}
            height={events.height}
          />
          <p>{events.desc}</p>
          {events.dates &&
            events.dates.map((dates) => (
              <div key={dates.id}>
                <p>{`${dates.date} | ${dates.desc}`}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
