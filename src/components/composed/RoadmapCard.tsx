import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RoadmapCard() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-[1.5rem] bg-white rounded-[0.625rem] px-[1.5rem] pb-[1.5rem] pt-[1.1875rem] grow basis-0">
      <div className="flex flex-row items-center justify-between">
        <Text as="H3" content="Roadmap" classes="text-dark-1" />
        <Button
          onClick={() => router.push("/roadmap")}
          className="bg-transparent hover:bg-transparent focus:bg-transparent underline text-blue p-0"
        >
          View
        </Button>
      </div>
      <div className="gap-[0.5rem]">
        <div className="flex flex-row justify-between">
          <div className="flex gap-[1rem] items-center">
            <div className="h-[0.5rem] w-[0.5rem] bg-orange rounded-full"></div>
            <Text as="Body 1" content="Planned" classes="text-dark-1" />
          </div>
          <p className="font-bold text-[1rem] leading-[1.4375rem] text-gray-3">
            0
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex gap-[1rem] items-center">
            <div className="h-[0.5rem] w-[0.5rem] bg-purple rounded-full"></div>
            <Text as="Body 1" content="In-Progress" classes="text-dark-1" />
          </div>
          <p className="font-bold text-[1rem] leading-[1.4375rem] text-gray-3">
            0
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex gap-[1rem] items-center">
            <div className="h-[0.5rem] w-[0.5rem] bg-cyan rounded-full"></div>
            <Text as="Body 1" content="Live" classes="text-dark-1" />
          </div>
          <p className="font-bold text-[1rem] leading-[1.4375rem] text-gray-3">
            0
          </p>
        </div>
      </div>
    </div>
  );
}
