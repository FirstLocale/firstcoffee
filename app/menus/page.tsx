import { drinkData, breakfastData } from "@/utils/menuData";
import Image from "next/image";

export default function MenusPage() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      {/* Left Box (Drinks) */}
      <div className="w-full md:w-1/2 bg-zinc-800 rounded-2xl p-6 h-auto">
        <h1 className="text-4xl mb-4">Drinks.</h1>
        {drinkData.map((drink) => (
          <div key={drink.id} className="mb-6">
            <h2 className="text-2xl">{drink.item}</h2>
            <Image
              src={drink.image}
              alt={drink.alt}
              height={drink.height}
              width={drink.width}
              className="mt-2"
            />
            <div className="mt-2">
              {drink.menu.map((menuItem) => (
                <div
                  key={menuItem.id}
                  className="border-b border-zinc-700 py-2"
                >
                  <h3 className="text-lg">{menuItem.item}</h3>
                  {menuItem.opts && (
                    <p className="text-sm text-zinc-400">{menuItem.opts}</p>
                  )}
                  <div className="flex gap-2 text-base">
                    <p>
                      REG:
                      {typeof menuItem.reg === "number"
                        ? ` £${menuItem.reg.toFixed(2)}`
                        : ` ${menuItem.reg}`}
                    </p>
                    {menuItem.lrg && (
                      <p>LRG: £{Number(menuItem.lrg).toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Box (Breakfast) */}
      <div className="w-full md:w-1/2 bg-zinc-800 rounded-2xl p-6 h-auto">
        <h1 className="text-4xl mb-4">Breakfast.</h1>
        {breakfastData.map((breakfast) => (
          <div key={breakfast.id} className="mb-6">
            <h2 className="text-2xl">{breakfast.item}</h2>
            <p className="text-sm text-zinc-400 mt-1">{breakfast.desc}</p>
            <Image
              src={breakfast.image}
              alt={breakfast.alt}
              height={breakfast.height}
              width={breakfast.width}
              className="mt-2"
            />
            {breakfast.menu && (
              <div className="mt-2">
                {breakfast.menu.map((menuItem) => (
                  <div
                    key={menuItem.id}
                    className="border-b border-zinc-700 py-2"
                  >
                    <h3 className="text-lg">{menuItem.item}</h3>
                    <p className="text-base">
                      £{Number(menuItem.reg).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
