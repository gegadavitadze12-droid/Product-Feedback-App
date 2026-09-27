import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Svg } from "../Svg";
import { useState } from "react";

const gradient = `bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E84D70] from 0% via-[#A337F6] via-55% to-[#28A7ED] to-100%`;

interface TitleCardProps {
  open: boolean;
  handleClick: (e: React.SyntheticEvent, isOpened: boolean) => void;
}

export default function TitleCard(props: TitleCardProps) {
  const { open, handleClick } = props;

  return (
    <div
      className={`flex relative lg:min-h-[8.5625rem] md:h-full h-[4.5rem] w-full shrink-0 md:rounded-[0.625rem] px-[1.5rem] py-[1rem] grow md:basis-0 overflow-hidden ${gradient}`}
    >
      <div className="bg-[#FAB57A] absolute rounded-full h-[12rem] w-[12rem] blur-2xl right-[-60%] bottom-[-70%]"></div>
      <div className="bg-[#7AD8FA] absolute rounded-full h-[12rem] w-[12rem] blur-2xl left-[-50%] top-[-70%]"></div>
      <div className="relative flex flex-row  w-full justify-between md:absolute md:bottom-[1.5rem]">
        <span>
          <h2 className="text-white text-[0.9375rem] leading-[1.375rem] font-medium md:font-bold md:text-[1.25rem] md:tracking-[-0.01375em] md:leading-[1.8125rem]">
            Frontend Mentor
          </h2>
          <p className="text-[0.8125rem] leading-[1.1875rem] font-medium text-white/[.75] md:font-normal md:text-[0.9375rem] md:leading-[1.375rem]">
            Feedback Board
          </p>
        </span>
        <span className="md:hidden">
          <Button
            onClick={(e) => handleClick(e, open)}
            className="bg-transparent active:bg-transparent focus:bg-transparent hover:bg-transparent p-0"
          >
            <Svg name={open ? "close" : "hamburger"} />
          </Button>
        </span>
      </div>
    </div>
  );
}
