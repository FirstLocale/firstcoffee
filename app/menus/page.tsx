import Menu from "@/components/Menu";
import { breakfastData, drinkData } from "@/utils/menuData";

export default function MenuPage() {
  return (
    <div className="flex flex-col gap-6 items-center p-4">

      <Menu 
        title="Drink." 
        headerImage="/variousDrinks.jpg" 
        headerAlt="Cup of coffee" 
        data={drinkData} 
        showLarge={true} 
      />
      
      <Menu 
        title="Breakfast." 
        headerImage="/breakfasts.avif" 
        headerAlt="Breakfast" 
        data={breakfastData} 
        showLarge={false} 
      />
    </div>
  );
}