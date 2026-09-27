import { Toggle } from "@/components/ui/toggle";
import { ChevronUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import Text from "@/components/Text";
import { ProductRequest } from "@/types";
import { Svg } from "../Svg";

export default function SuggestionCard(props: { suggestion: ProductRequest }) {
  const { suggestion } = props;
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col sm:flex-row bg-white px-[2rem] py-[1.75rem] rounded-[0.625rem] justify-between gap-[1rem] sm:gap-0">
      <div className="flex gap-[2.5rem]">
        <Toggle
          onClick={(e) => e.stopPropagation()}
          className="hidden sm:flex flex-col h-auto self-start gap-[0.5rem] bg-gray-2 [&>p]:text-dark-1 [&>svg]:stroke-blue hover:bg-[#CFD7FF] data-[state=on]:bg-blue [&>p]:data-[state=on]:text-white [&>svg]:data-[state=on]:stroke-white font-semibold rounded-[0.625rem] px-[0.6875rem] pb-[0.5rem] pt-[0.875rem]"
        >
          {/* <ChevronUp /> */}
          <Svg name="up-arrow" className="shrink-0" />
          <p className="font-bold text-[0.8125rem] leading-[1.1875rem] tracking-[-0.01125rem]">
            {count | suggestion.upvotes}
          </p>
        </Toggle>
        <div className="flex flex-col gap-[0.75rem] ">
          <div className="flex flex-col gap-[0.25rem] ">
            <h3 className="font-bold text-[1.125rem] tracking-[-0.01375em] leading-[1.625rem] text-dark-1">
              {suggestion.title}
            </h3>
            <p className="font-normal text-[1rem] leading-[1.4375rem] text-gray-3">
              {suggestion.description}
            </p>
          </div>
          <div className="bg-gray-2 text-blue font-semibold rounded-[0.625rem] px-[1rem] py-[0.375rem] self-start capitalize">
            <Text as="Body 3" content={suggestion.category} />
          </div>
        </div>
      </div>
      <div className="hidden sm:flex gap-[0.5rem] text-dark-1 self-center items-center">
        <Svg name="comments" />
        <p className="font-bold text-[1rem] leading-[1.4375rem] tracking-[0.01375rem]">
          {suggestion.comments?.length | 0}
        </p>
      </div>
      <section className="flex sm:hidden justify-between">
        <Toggle className="flex h-auto self-start gap-[0.5rem] bg-gray-2 [&>p]:text-dark-1 [&>svg]:stroke-blue hover:bg-[#CFD7FF] data-[state=on]:bg-blue [&>p]:data-[state=on]:text-white [&>svg]:data-[state=on]:stroke-white font-semibold rounded-[0.625rem] pl-[16px] pr-[13px] py-[7px]">
          {/* <ChevronUp /> */}
          <Svg name="up-arrow" className="shrink-0" />
          <p className="font-bold text-[0.8125rem] leading-[1.1875rem] tracking-[-0.01125rem]">
            {count | suggestion.upvotes}
          </p>
        </Toggle>
        <div className="flex gap-[0.5rem] text-dark-1 self-center items-center">
          <Svg name="comments" />
          <p className="font-bold text-[1rem] leading-[1.4375rem] tracking-[0.01375rem]">
            {suggestion.comments?.length | 0}
          </p>
        </div>
      </section>
    </div>
  );
}
