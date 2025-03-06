import { GetInfo } from "@/utils/getInfo";
import Image from "next/image";
import { ShopifyMetaobject } from "@/utils/types";

export default async function Home() {
  const homeData = await GetInfo("home_info", undefined, true); // No second parameter, third parameter is true

  if (!homeData || homeData.edges.length === 0) {
    return <div>Could not load Home Information.</div>;
  }

  // Helper function to get field value
  const getFieldValue = (
    metaobject: ShopifyMetaobject,
    key: string,
    resolveImageUrls: boolean = false
  ) => {
    const field = metaobject.fields.find((field) => field.key === key);

    if (field) {
      // If resolveImageUrls is true, and the field references an image, return the image URL
      if (resolveImageUrls && field.reference?.image?.url) {
        return field.reference.image.url;
      }

      // Otherwise, return the raw value
      return field.value || "";
    }
    return "";
  };

  // Process home info entries
  const homes = homeData.edges.map((homeEdge) => {
    const homeNode = homeEdge.node;

    return {
      id: homeNode.id,
      title: getFieldValue(homeNode, "title"),
      image: getFieldValue(homeNode, "img", true),
      alt: getFieldValue(homeNode, "alt"),
      width: parseInt(getFieldValue(homeNode, "width") || "0"),
      height: parseInt(getFieldValue(homeNode, "height") || "0"),
      text: getFieldValue(homeNode, "text"),
    };
  });

  return (
    <div className="max-w-screen-lg mx-auto px-6 pt-36 font-cutive">
      {homes.map((home, index) => (
  <div key={home.id}>
    {index === 0 ? (
      // First section layout:
      <div className="relative pb-10">
        <div className="flex justify-end absolute z-0 w-full">
          <Image
            className="transform -rotate-[15deg]"
            src='/straightOuttaClopton.webp'
            alt="straight outta clopton CD sticker image"
            width={100}
            height={100}
          />
        </div>
        <Image
          className="w-full"
          src={home.image}
          alt={home.alt}
          width={home.width}
          height={home.height}
        />
  
        <div className="absolute bottom-12 left-8 max-w-md">
          <h1 className="text-2xl mb-2">
            <span className="box-decoration-clone bg-[#241f21] text-white pt-2 px-1 leading-8">
              {String(home.title)}
            </span>
          </h1>
          <p className="text-md">
            <span className="box-decoration-clone bg-[#241f21] bg-opacity-90 text-white pt-1 px-1 leading-7">
              {home.text}
            </span>
          </p>
        </div>
      </div>
    ) : index === 1 ? (
      // Second section layout: (image left, title and text right)
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image
            src={home.image}
            alt={home.alt}
            width={home.width}
            height={home.height}
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl mb-4">
            {String(home.title).toUpperCase()}
          </h1>
          <p>{home.text}</p>
        </div>
      </div>
    ) : index === 2 ? (
      // Third section layout:
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image
            src={home.image}
            alt={home.alt}
            width={home.width}
            height={home.height}
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl mb-4">
            {String(home.title).toUpperCase()}
          </h1>
          <p>{home.text}</p>
        </div>
      </div>
    ) : index === 3 ? (
      // Fourth section layout:
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image
            src={home.image}
            alt={home.alt}
            width={home.width}
            height={home.height}
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl mb-4">
            {String(home.title).toUpperCase()}
          </h1>
          <p>{home.text}</p>
        </div>
      </div>
    ) : index === 4 ? (
      // Fifth section layout:
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image
            src={home.image}
            alt={home.alt}
            width={home.width}
            height={home.height}
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl mb-4">
            {String(home.title).toUpperCase()}
          </h1>
          <p>{home.text}</p>
        </div>
      </div>
    ) : (
      // Sixth section layout (index 5):
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image
            src={home.image}
            alt={home.alt}
            width={home.width}
            height={home.height}
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl mb-4">
            {String(home.title).toUpperCase()}
          </h1>
          <p>{home.text}</p>
        </div>
      </div>
    )}
  </div>
))}
    </div>
  );
}
