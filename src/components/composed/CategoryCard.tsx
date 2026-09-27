import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import Text from "@/components/Text";

export const categories = [
  "all",
  "UI",
  "UX",
  "enhancement",
  "bug",
  "feature",
] as const;

export type Category = (typeof categories)[number];

export default function CategoryCard() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const handlePress = (pressed: boolean, category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-wrap gap-x-[0.5rem] gap-y-[0.875rem] bg-white rounded-[0.625rem] px-[1.5rem] py-[1.5rem] grow basis-0">
      {categories.map((category) => (
        <Toggle
          key={category}
          className="bg-gray-2 text-blue hover:bg-[#CFD7FF] hover:text-blue data-[state=on]:bg-blue data-[state=on]:text-white font-semibold rounded-[0.625rem] px-[1rem] py-[0.375rem] capitalize"
          onPressedChange={(pressed) => handlePress(pressed, category)}
          pressed={selectedCategory === category}
        >
          <Text as="Body 3" content={category} />
        </Toggle>
      ))}
    </div>
  );
}
