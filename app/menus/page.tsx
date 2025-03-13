import Menu from "@/components/Menu";
import { GetMenuInfo } from "@/utils/getMenuInfo";

export default async function MenuPage() {
  // Fetch data from Shopify
  const menuData = await GetMenuInfo(true); // Pass true to resolve image URLs

  if (!menuData) {
    return <div>Could not load Menu Information.</div>;
  }

  const { drinkData, breakfastData, lunchData, pizzaData } = menuData;

  return (
    <div className="max-w-screen-lg mx-auto font-cutive text-center px-2 pb-5 sm:px-6 pt-36">
      <div className="flex flex-col sm:flex-row">
        <div className="p-3">
          <Menu
            title="Drink."
            headerImage="/variousDrinks.jpg"
            headerAlt="Cup of coffee"
            data={drinkData}
            showLarge={true}
          />
        </div>

        <div className="p-3">
          <Menu
            title="Breakfast."
            headerImage="/breakfasts.avif"
            headerAlt="Breakfast"
            data={breakfastData}
            showLarge={false}
          />
        </div>

        <div className="p-3">
          <Menu
            title="Lunch."
            headerImage="/breakfasts.avif"
            headerAlt="Lunch"
            data={lunchData}
            showLarge={false}
          />
        </div>

        <div className="p-3">
          <Menu
            title="Pizza."
            headerImage="/breakfasts.avif"
            headerAlt="Pizza"
            data={pizzaData}
            showLarge={false}
          />
        </div>
      </div>
    </div>
  );
}
