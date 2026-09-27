import { cn } from "@/lib/utils";
import { Status } from "@/types";
import { useState } from "react";

export const DropArea: React.FC<{
  onDrop: () => void;
}> = ({ onDrop }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showArea = () => {
    setIsVisible(true);
  };

  const hideArea = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={cn(
        "relative h-[1rem] lg:h-[1.5rem] only:h-[8rem] lg:only:h-[8rem] transition-[padding,opacity] before:absolute before:border-2 before:border-dashed before:border-dark-1 before:inset-2",
        {
          "opacity-100 py-[2rem]": isVisible,
          "opacity-0": !isVisible,
        }
      )}
      onDragEnter={showArea}
      onDragLeave={hideArea}
      onDrop={() => {
        onDrop();
        hideArea();
      }}
      onDragOver={(e) => e.preventDefault()}
    />
  );
};
