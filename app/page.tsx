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
    <div className="max-w-screen-lg mx-auto px-6 pt-36">
      {homes.map((home) => (
        <div key={home.id}>
          <h1 className="text-3xl text-center mb-4">
            {String(home.title).toUpperCase()}
          </h1>
          <Image
            className="p-5 mx-auto"
            src={home.image}
            alt={home.alt}
            width={home.width}
            height={home.height}
          />
          <p className="text-center">{home.text}</p>
        </div>
      ))}
    </div>
  );
}
