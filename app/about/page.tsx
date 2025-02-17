import { aboutData } from "@/utils/aboutData";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="p-4 text-center">
      {aboutData.map((about) => (
        <div key={about.id}>
          <h2 className="text-3xl p-5">{about.title}</h2>
          <p>{about.text}</p>
          <div className="flex flex-col md:flex-row gap-6 p-5 justify-center">
            {about.staff.map((staff) => (
              <div key={staff.id}>
                <Image
                  className="p-5 rounded-full"
                  src={staff.image}
                  alt={staff.alt}
                  width={staff.width}
                  height={staff.height}
                />
                <h3 className="text-2xl">{staff.name}</h3>
                <p className="text-sm text-zinc-400 mt-1">{staff.rank}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
