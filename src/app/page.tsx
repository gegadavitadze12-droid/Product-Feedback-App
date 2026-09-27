"use client";

import useSWR from "swr";
import CategoryCard from "@/components/composed/CategoryCard";
import FeedbackBar from "@/components/composed/FeedbackBar";
import RoadmapCard from "@/components/composed/RoadmapCard";
import SuggestionCard from "@/components/composed/SuggestionCard";
import TitleCard from "@/components/composed/TitleCard";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { ProductRequest } from "@/types";
import { useProductRequests } from "@/hooks/useProductRequests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { Svg } from "@/components/Svg";

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const handleMenuClick = (e: React.SyntheticEvent, isOpened: boolean) => {
    setOpen(isOpened ? false : true);
  };

  const { data, error, isLoading } = useProductRequests();
  //Handle the error state
  if (error) {
    return <div>Failed to load</div>;
  }
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center bg-gray-1 pb-[55px] md:pt-[5.875rem] md:pb-[8rem] h-full  ">
      <div className="px-0 lg:w-[1110px] md:w-[700px] w-full flex gap-[1.875rem] lg:flex-row lg:px-[3rem] md:flex-col flex-col">
        {/*Left Column*/}
        <aside className="lg:w-[15.9375rem] flex lg:flex-col lg:gap-[2rem] md:gap-[0.675rem] w-full md:flex-row flex-col absolute md:relative h-full">
          <span className="md:w-[33%] lg:w-full">
            <TitleCard open={open} handleClick={handleMenuClick} />
          </span>
          <span
            className={`${
              open ? "flex" : "hidden"
            } md:flex flex-row h-full md:w-[66%] lg:w-full`}
          >
            <span className="bg-[#000]/[.30] w-full md:hidden"></span>
            <span className="bg-gray-1 pt-[1.5rem] px-[1.5rem] max-w-[70%] min-w-[271px] md:pt-0 md:px-0 md:max-w-none md:min-w-0">
              <span className="flex flex-col self-start gap-[1.5rem] md:flex-row md:gap-[0.675rem] lg:flex-col">
                <CategoryCard />
                <RoadmapCard />
              </span>
            </span>
          </span>
        </aside>
        {/* Right Column */}
        <div className="lg:w-[51.5625rem] flex flex-col gap-[1.5rem] w-full mt-[4.5rem] md:mt-0">
          <FeedbackBar />
          <div className="px-[1.5rem] md:px-0">
            {!!data.productRequests.length ? (
              // Cards
              <div className="flex flex-col gap-[1.25rem]">
                {data.productRequests.map((suggestion: ProductRequest) => (
                  <div
                    key={suggestion.id}
                    onClick={() => router.push(`/feedback/${suggestion.id}`)}
                  >
                    <SuggestionCard
                      key={suggestion.id}
                      suggestion={suggestion}
                    />
                  </div>
                ))}
              </div>
            ) : (
              // Empty state
              <div className="bg-white flex justify-center px-[1.5rem] py-[76px] md:py-[110px] rounded-[10px]">
                <div className="flex flex-col items-center max-w-[410px] gap-[3rem]">
                  <Svg name="empty-state" />
                  <div className="flex flex-col items-center gap-[1rem]">
                    <h1
                      className={`font-bold text-[1.125rem] sm:text-[1.5rem] tracking-[-0.0125em] sm:leading-[2.1875rem] text-dark-1 text-center`}
                    >
                      There is no feedback yet.
                    </h1>
                    <p
                      className={`text-gray-3 text-center font-normal text-[0.8125rem] sm:text-[1rem] sm:leading-[1.4375rem]`}
                    >
                      Got a suggestion? Found a bug that needs to be squashed?
                      We love hearing about new ideas to improve our app.
                    </p>
                  </div>
                  <Button
                    text="+ Add Feedback"
                    onClick={() => router.push("/new-feedback")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
