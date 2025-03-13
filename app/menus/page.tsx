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
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  <div className="overflow-visible">
    <Menu
      title="Drink."
      headerImage="/coffeeMain.webp"
      headerAlt="Cup of coffee"
      data={drinkData}
      showLarge={true}
    />
  </div>
    
    
    <div className="overflow-visible">
      <Menu
      title="Breakfast."
      headerImage="/breakfastMain.webp"
      headerAlt="Breakfast"
      data={breakfastData}
      showLarge={false}
    />
    </div>
    
    
    <div className="overflow-visible">
      <Menu
      title="Lunch."
      headerImage="/lunchMain.webp"
      headerAlt="Lunch"
      data={lunchData}
      showLarge={false}
    />
    </div>
    
    <div className="overflow-visible">
      <Menu
      title="Pizza."
      headerImage="/pizzaMain.webp"
      headerAlt="Pizza"
      data={pizzaData}
      showLarge={false}
    />
    </div>
    
  </div>
</div>
  );

}
