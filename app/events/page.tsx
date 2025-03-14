import { GetInfo } from "@/utils/getInfo";
import Image from "next/image";
import { ShopifyMetaobject, ShopifyMetaobjectEdge } from "@/utils/types";

export default async function EventsPage() {
  const eventsData = await GetInfo("events_info", "dates", true);

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
      if (resolveImageUrls && field.reference?.image?.url) {
        return field.reference.image.url;
      }
      return field.value || "";
    }
    return "";
  };

  // Date formatting function - placed OUTSIDE the map function
  const formatDate = (dateString: string): string => {
    const dateObj = new Date(dateString);

    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    }).format(dateObj);
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
    <div className="max-w-screen-lg mx-auto font-cutive px-2 pb-5 sm:px-6 pt-36">
      {events.map((event, index) => (
        <div key={event.id} className="flex flex-col pb-6 md:flex-row items-center gap-8">
          {index % 2 !== 0 ? (
            <>
              <div className="md:w-1/2 pb-10">
                <Image className="rounded-md"
                  src={event.image}
                  alt={event.alt}
                  width={event.width}
                  height={event.height}
                />
              </div>
              <div className="px-5 md:w-1/2">
                <h2 className="text-xl font-bold mb-4">{event.title}</h2>
                <p className="text-sm">{event.desc}</p>
                
                {event.dates.length > 0 && (
                  <div className="mt-4">
                    {event.dates.map((date) => (
                      <p key={date.id} className="text-sm text-zinc-500">
                        {`${formatDate(date.date)} | ${date.desc}`}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="px-5 md:w-1/2 order-2 md:order-1">
                <h2 className="text-xl font-bold mb-4">{event.title}</h2>
                <p className="text-sm">{event.desc}</p>
                
                {event.dates.length > 0 && (
                  <div className="mt-4">
                    {event.dates.map((date) => (
                      <p key={date.id} className="text-sm text-zinc-500">
                        {`${formatDate(date.date)} | ${date.desc}`}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div className="md:w-1/2 order-1 md:order-2 pb-10">
                <Image className="rounded-md"
                  src={event.image}
                  alt={event.alt}
                  width={event.width}
                  height={event.height}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}