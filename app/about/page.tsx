import { GetInfo } from "@/utils/getInfo";
import Image from "next/image";
import { ShopifyMetaobject, ShopifyMetaobjectEdge } from "@/utils/types";

export default async function AboutPage() {
  const aboutData = await GetInfo("about_info", "staff", true); // Fetching data with resolveImageUrls as true

  if (!aboutData || !aboutData.edges[0]) {
    return <div>Could not load About Information.</div>;
  }

  const aboutInfo = aboutData.edges[0].node;

  const staffEdges = aboutInfo.field?.references?.edges as
    | ShopifyMetaobjectEdge[]
    | undefined;

  const staff: ShopifyMetaobject[] = staffEdges
    ? staffEdges.map((edge) => edge.node)
    : [];

  // handle image URLs based on the resolveImageUrls flag
  const getFieldValue = (
    metaobject: ShopifyMetaobject,
    key: string,
    resolveImageUrls: boolean = false
  ) => {
    const field = metaobject.fields.find((field) => field.key === key);

    if (field) {
      // If resolveImageUrls is true, and the field references an image, return the image URL
      if (resolveImageUrls && field.reference?.image?.url) {
        return field.reference.image.url; // Return the image URL
      }

      // Otherwise, return the raw value (for other fields like text, etc.)
      return field.value || "";
    }
    return "";
  };

  return (
    <div className="max-w-screen-lg mx-auto font-cutive text-center px-2 pb-5 sm:px-6 pt-36">
      <h1 className="text-3xl pb-5">{getFieldValue(aboutInfo, "title")}</h1>
      <p>{getFieldValue(aboutInfo, "desc")}</p>
      <div className="flex flex-col md:flex-row gap-6 p-5 justify-center">
        {staff.map((member) => (
          <div key={member.id}>
            <Image
              className="p-5 rounded-full"
              src={getFieldValue(member, "img", true)} // Pass resolveImageUrls as true for images
              alt={getFieldValue(member, "alt")}
              width={parseInt(getFieldValue(member, "width"))}
              height={parseInt(getFieldValue(member, "height"))}
            />
            <h3 className="text-2xl">{getFieldValue(member, "name")}</h3>
            <p className="text-sm text-zinc-500 mt-1">
              {getFieldValue(member, "rank")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
