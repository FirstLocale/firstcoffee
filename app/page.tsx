import { homeData } from "@/utils/homeData";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-900 p-4">
      {homeData.map((home) => (
        <div key={home.id}>
          <h2 className="text-3xl">{String(home.title).toUpperCase()}</h2>
          <Image
            className="p-5"
            src={home.image}
            alt={home.alt}
            width={home.width}
            height={home.height}
          />
          <p>{home.text}</p>
        </div>
      ))}
    </div>
  );
}
