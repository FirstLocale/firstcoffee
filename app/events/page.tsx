import { GetInfo } from "@/utils/getInfo";
import Image from "next/image";
import { ShopifyMetaobject, ShopifyMetaobjectEdge } from "@/utils/types";

export default async function EventsPage() {
  const eventsData = await GetInfo("events_info", "dates", true); // Fetching events with dates and resolving image URLs

  if (!eventsData || eventsData.edges.length === 0) {
    return <div>Could not load Events Information.</div>;
  }

  // Helper function
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

  // Process events with their associated dates
  const events = eventsData.edges.map((eventEdge) => {
    const eventNode = eventEdge.node;

    // Extract dates if they exist
    const datesEdges = eventNode.field?.references?.edges as
      | ShopifyMetaobjectEdge[]
      | undefined;

    const dates = datesEdges
      ? datesEdges.map((dateEdge) => ({
          id: dateEdge.node.id,
          date: getFieldValue(dateEdge.node, "date"),
          desc: getFieldValue(dateEdge.node, "desc"),
        }))
      : [];

    return {
      id: eventNode.id,
      title: getFieldValue(eventNode, "title"),
      image: getFieldValue(eventNode, "img", true),
      alt: getFieldValue(eventNode, "alt"),
      width: parseInt(getFieldValue(eventNode, "width") || "0"),
      height: parseInt(getFieldValue(eventNode, "height") || "0"),
      desc: getFieldValue(eventNode, "desc"),
      dates: dates,
    };
  });

  return (
    <div className="p-4">
      {events.map((event) => (
        <div key={event.id} className="mb-8">
          <h2 className="text-3xl p-5">{event.title}</h2>
          <Image
            className="mx-auto"
            src={event.image}
            alt={event.alt}
            width={event.width}
            height={event.height}
          />
          <p className="text-center mt-4">{event.desc}</p>

          {event.dates.length > 0 && (
            <div className="mt-4 text-center">
              {event.dates.map((date) => (
                <p key={date.id} className="text-sm text-zinc-600">
                  {`${date.date} | ${date.desc}`}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
