"use client";

import { ChevronUpIcon } from "@radix-ui/react-icons";
import * as Toggle from "@radix-ui/react-toggle";
import { useEffect, useState } from "react";

interface PillProps {
  hasTopIcon?: boolean;
  content: number | string;
}

interface Colors {
  bgColor: string;
  iconColor: string;
  contentColor: string;
}

type State = "default" | "hover" | "active";

export default function Pill(props: PillProps) {
  const { content, hasTopIcon = false } = props;

  const [active, setActive] = useState(false);
  const [colors, setColors] = useState({
    bgColor: "bg-gray-2",
    iconColor: "text-blue",
    contentColor: "text-dark-1",
  });
  const [width, setWidth] = useState("");

  useEffect(() => {
    if (hasTopIcon) {
      setWidth("w-[2.5rem]");
    }
  }, [hasTopIcon]);

  const updateColors = (state?: State) => {
    switch (state) {
      case "hover":
        if (active) {
          return;
        }
        setColors({
          bgColor: "bg-[#CFD7FF]",
          iconColor: "text-blue",
          contentColor: "text-dark-1",
        });
        break;
      case "active":
        setColors({
          bgColor: "bg-blue",
          iconColor: "text-white",
          contentColor: "text-white",
        });
        break;
      default:
        if (active) {
          return;
        }
        setColors({
          bgColor: "bg-[#F2F4FE]",
          iconColor: "text-blue",
          contentColor: "text-dark-1",
        });
        return;
    }
  };

  const handleClick = () => {
    if (!active) {
      updateColors("active");
      setActive(true);
    } else {
      updateColors("hover");
      setActive(false);
    }
  };

  return (
    <Toggle.Root
      className={`flex flex-col items-center ${width} ${colors.bgColor} px-[1rem] py-[0.375rem] text-dark-1 rounded-[0.625rem]`}
      onMouseEnter={() => updateColors("hover")}
      onMouseLeave={() => updateColors()}
      onClick={handleClick}
    >
      {hasTopIcon && (
        <ChevronUpIcon fontWeight={700} className={`${colors.iconColor}`} />
      )}
      <p
        className={`${colors.contentColor} font-bold text-[13px] leading-[19px] tracking-[-0.18px]`}
      >
        {content}
      </p>
    </Toggle.Root>
  );
}
