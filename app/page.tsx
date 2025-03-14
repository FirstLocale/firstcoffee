import { GetInfo } from "@/utils/getInfo";
import Image from "next/image";
import { ShopifyMetaobject } from "@/utils/types";
import GallerySlider from "@/components/GalleryEffect";

export default async function Home() {
  const homeData = await GetInfo("home_info", "gallery", true); // No second parameter, third parameter is true

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
      hyperlink: getFieldValue(homeNode, "hyperlink"),
    };
  });

  const firstHomeWithGallery = homeData.edges.find((edge) => {
    const edgesExist = edge.node.field?.references?.edges;
    return !!edgesExist && edgesExist.length > 0;
  });

  // Process gallery entries if they exist
  const galleryItems =
    firstHomeWithGallery?.node.field?.references?.edges?.map((galleryEdge) => {
      const galleryNode = galleryEdge.node;

      return {
        id: galleryNode.id,
        image: getFieldValue(galleryNode, "img", true),
        alt: getFieldValue(galleryNode, "alt"),
        width: parseInt(getFieldValue(galleryNode, "width") || "0"),
        height: parseInt(getFieldValue(galleryNode, "height") || "0"),
      };
    }) || [];

  return (
    <div className="max-w-screen-lg mx-auto font-cutive px-2 pb-5 sm:px-6 pt-36">
      {homes.map((home, index) => (
        <div key={home.id}>
          {index === 0 ? (
            //! First section with unique styling - highlighted text over image
            <div className="relative">
              <div className="flex justify-end absolute z-10 w-full pr-1 sm:pr-0">
                <Image
                  className="w-11 sm:w-[100px] transform -rotate-[15deg] rounded-md"
                  src="/straightOuttaClopton.webp"
                  alt="straight outta clopton CD sticker image"
                  width={70}
                  height={100}
                />
              </div>
              {/* Gallery section: */}
              {galleryItems.length > 0 && (
                <GallerySlider galleryItems={galleryItems} />
              )}

              <div className="flex flex-col justify-end absolute left-2 w-[80%] h-[70%] top-20 sm:left-2 max-w-xl">
                <h1 className="mb-2 text-xl font-bold">
                  <span className="text-white leading-8">
                    {String(home.title).toUpperCase()}
                  </span>
                </h1>
                <p className="text-sm">
                  <span className="text-white">
                    {home.text}
                    {home.hyperlink && (
                      <>
                        {" "}
                        -{" "}
                        <a
                          href={home.hyperlink}
                          target="_blank"
                          rel="noopen noreferrer"
                          className="underline decoration-orange-500 hover:opacity-80"
                        >
                          Here.
                        </a>
                      </>
                    )}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            //! For all other sections, alternate layout based on odd/even index
            <div className="flex flex-col md:flex-row items-center sm:gap-8 pt-8">
              {/* If index is odd, image on left; if even, image on right */}
              {index % 2 !== 0 ? (
                // Odd indexes (1, 3, 5...) - Image on left, text on right
                <>
                  <div className="md:w-1/2 pb-10">
                    <Image
                      className="rounded-md"
                      src={home.image}
                      alt={home.alt}
                      width={home.width}
                      height={home.height}
                    />
                  </div>
                  <div className="px-5 md:w-1/2">
                    <h1 className="text-xl font-bold mb-4">
                      {String(home.title).toUpperCase()}
                    </h1>
                    <p className="text-sm">
                      {home.text}
                      {home.hyperlink && (
                        <>
                          {" "}
                          -{" "}
                          <a
                            href={home.hyperlink}
                            target="_blank"
                            rel="noopen noreferrer"
                            className="underline decoration-orange-500 hover:opacity-80"
                          >
                            Here.
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </>
              ) : (
                // Even indexes (2, 4, 6...) - Text on left, image on right
                <>
                  <div className="px-5 md:w-1/2 order-2 md:order-1">
                    <h1 className="text-xl font-bold mb-4">
                      {String(home.title).toUpperCase()}
                    </h1>
                    <p className="text-sm">
                      {home.text}
                      {home.hyperlink && (
                        <>
                          {" "}
                          -{" "}
                          <a
                            href={home.hyperlink}
                            target="_blank"
                            rel="noopen noreferrer"
                            className="underline decoration-orange-500 hover:opacity-80"
                          >
                            Here.
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="md:w-1/2 order-1 md:order-2 pb-10">
                    <Image
                      className="rounded-md"
                      src={home.image}
                      alt={home.alt}
                      width={home.width}
                      height={home.height}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
