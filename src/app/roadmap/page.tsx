"use client";

import {
  Dispatch,
  DragEventHandler,
  RefObject,
  SetStateAction,
  useRef,
  useState,
  Fragment,
  useEffect,
} from "react";
import { ProductRequest, Status } from "@/types";
import { Svg } from "@/components/Svg";
import Button from "@/components/Button";
import Link from "next/link";
import { Toggle } from "@/components/ui/toggle";
import Spacer from "@/components/Spacer";
import { useRouter } from "next/navigation";
import { useProductRequests } from "@/hooks/useProductRequests";
import { cn } from "@/lib/utils";
import { DropArea } from "@/components/DropArea";
import { flushSync } from "react-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CardProps = Pick<
  ProductRequest,
  "id" | "title" | "description" | "status" | "upvotes" | "category"
> & {
  noOfComments: number;
  draggingCard: number | null;
  setDraggingCard: Dispatch<SetStateAction<number | null>>;
};

const Card: React.FC<CardProps> = ({
  status,
  title,
  description,
  upvotes,
  noOfComments,
  category,
  id,
  draggingCard,
  setDraggingCard,
}) => {
  return (
    <div
      className={cn(
        `cursor-grab active:cursor-grabbing active:animate-pulse flex flex-col rounded-[0.3125rem] border-t-[0.375rem] pt-[1.25rem] pb-[1.5rem] px-[1.25rem] bg-white`,
        {
          "border-t-orange": status === Status.PLANNED,
          "border-t-purple": status === Status.INPROGRESS,
          "border-t-cyan": status === Status.LIVE,
        }
      )}
      draggable
      onDragStart={() => setDraggingCard(id)}
      onDragEnd={() => setDraggingCard(null)}
      style={{ viewTransitionName: `card-${id}` }}
    >
      {/* status */}
      <div className="flex gap-[1rem] items-center">
        <div
          className={cn(`w-[0.5rem] h-[0.5rem] rounded-full`, {
            "bg-orange": status === Status.PLANNED,
            "bg-purple": status === Status.INPROGRESS,
            "bg-cyan": status === Status.LIVE,
          })}
        ></div>
        <p className="font-normal text-gray-3 text-[0.8125rem] leading-[1.1875rem] lg:text-[1rem] lg:leading-[1.4375rem] tracking-[0rem] capitalize">
          {status}
        </p>
      </div>
      <Spacer axis="vertical" size={14} />
      {/* title and description */}
      <div className="flex flex-col gap-[0.5625rem]">
        <p className="font-bold text-dark-1 text-[0.8125rem] leading-[1.1875rem] tracking-[-0.01125rem] lg:text-[1.125rem] lg:leading-[1.4375rem] lg:tracking-[-0.015625rem]">
          {title}
        </p>
        <p className="font-normal text-gray-3 text-[0.8125rem] leading-[1.1875rem] lg:text-[1rem] lg:leading-[1.4375rem] tracking-[0rem]">
          {description}
        </p>
      </div>
      <Spacer axis="vertical" size={24} />
      {/* category */}
      <p className="font-semibold text-[0.8125rem] leading-[1.1875rem] tracking-[0px] bg-gray-2 text-blue hover:bg-[#CFD7FF] hover:text-blue data-[state=on]:bg-blue data-[state=on]:text-white rounded-[0.625rem] px-[1rem] py-[0.375rem] self-start capitalize">
        {category}
      </p>
      <Spacer axis="vertical" size={16} />
      {/* upvote and comments */}
      <div className="flex justify-between">
        <Toggle className="flex h-auto self-start gap-[0.5rem] bg-gray-2 [&>p]:text-dark-1 [&>svg]:stroke-blue hover:bg-[#CFD7FF] data-[state=on]:bg-blue [&>p]:data-[state=on]:text-white [&>svg]:data-[state=on]:stroke-white font-semibold rounded-[0.625rem] pl-[16px] pr-[13px] py-[7px]">
          {/* <ChevronUp /> */}
          <Svg name="up-arrow" className="shrink-0" />
          <p className="font-bold text-[0.8125rem] leading-[1.1875rem] tracking-[-0.01125rem]">
            {upvotes}
          </p>
        </Toggle>
        <div className="flex gap-[0.5rem] text-dark-1 items-center">
          <Svg name="comments" />
          <p className="font-bold text-[1rem] leading-[1.4375rem] tracking-[0.01375rem]">
            {noOfComments}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Roadmap() {
  const { data, error, isLoading } = useProductRequests();

  const [draggingCard, setDraggingCard] = useState<number | null>(null);

  const [requests, setRequests] = useState<ProductRequest[]>([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setRequests(data?.productRequests);
    }
  }, [isLoading, data, error]);

  const router = useRouter();
  const planned: ProductRequest[] = requests?.filter(
    (item: ProductRequest) => item.status === Status.PLANNED
  );
  const inProgress: ProductRequest[] = requests?.filter(
    (item: ProductRequest) => item.status === Status.INPROGRESS
  );
  const live: ProductRequest[] = requests?.filter(
    (item: ProductRequest) => item.status === Status.LIVE
  );

  const moveToColumn = (
    column: Status,
    index: number,
    selectedItem: ProductRequest
  ) => {};

  const onDrop = (column: Status, index: number) => {
    if (!draggingCard) return;

    const draggedItem: ProductRequest = requests?.find(
      (item: ProductRequest) => item.id === draggingCard
    ) as ProductRequest;
    let newInProgress = inProgress; //doesn't make a copy, just for clean code
    let newLive = live;
    let newPlanned = planned;
    switch (column) {
      case Status.PLANNED:
        if (draggedItem.status === column) return;

        if (draggedItem.status === Status.INPROGRESS) {
          newInProgress = inProgress.filter(
            (item: ProductRequest) => item.id !== draggedItem.id
          );
        }

        if (draggedItem.status === Status.LIVE) {
          newLive = live.filter(
            (item: ProductRequest) => item.id !== draggedItem.id
          );
        }

        newPlanned.splice(index, 0, {
          ...draggedItem,
          status: Status.PLANNED,
        });

        // document.startViewTransition(() => {
        //   flushSync(() => {
        //     setRequests([...newPlanned, ...newInProgress, ...newLive]);
        //   });
        // });

        return setRequests([...newPlanned, ...newInProgress, ...newLive]);

      case Status.INPROGRESS:
        if (draggedItem.status === column) return;

        if (draggedItem.status === Status.PLANNED) {
          newPlanned = planned.filter(
            (item: ProductRequest) => item.id !== draggedItem.id
          );
        }

        if (draggedItem.status === Status.LIVE) {
          newLive = live.filter(
            (item: ProductRequest) => item.id !== draggedItem.id
          );
        }

        newInProgress.splice(index, 0, {
          ...draggedItem,
          status: Status.INPROGRESS,
        });

        // document.startViewTransition(() => {
        //   flushSync(() => {
        //     setRequests([...newPlanned, ...newInProgress, ...newLive]);
        //   });
        // });

        return setRequests([...newPlanned, ...newInProgress, ...newLive]);

      case Status.LIVE:
        console.log("gre", draggedItem.status);
        if (draggedItem.status === column) return;

        if (draggedItem.status === Status.PLANNED) {
          newPlanned = planned.filter(
            (item: ProductRequest) => item.id !== draggedItem.id
          );
        }

        if (draggedItem.status === Status.INPROGRESS) {
          newInProgress = inProgress.filter(
            (item: ProductRequest) => item.id !== draggedItem.id
          );
        }

        newLive.splice(index, 0, {
          ...draggedItem,
          status: Status.LIVE,
        });

        // document.startViewTransition(() => {
        //   flushSync(() => {
        //     setRequests([...newPlanned, ...newInProgress, ...newLive]);
        //   });
        // });

        return setRequests([...newPlanned, ...newInProgress, ...newLive]);

      default:
        return [];
    }
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>an error occurred</div>;
  }
  return (
    <div className="flex justify-center bg-gray-1 pb-[55px] md:pt-[3.5rem] lg:pt-[4.875rem] md:pb-[8rem] h-full">
      <div className="px-0 lg:w-[1110px] md:w-[689px] w-full flex gap-[1.875rem] lg:flex-row lg:px-[3rem] flex-col">
        <div className="flex flex-col md:gap-[3rem] w-full">
          {/* Topbar Section */}
          <section className="flex items-center bg-dark-1 w-full md:rounded-[0.625rem] px-[1.5rem] md:px-[2rem] py-[1.6875rem] justify-between">
            <div className="flex flex-col gap-[0.25rem]">
              <Link
                onClick={() => router.back()}
                href={""}
                className="flex items-center gap-[16px]"
              >
                <Svg name="left-arrow" className="stroke-white" />
                <p className="font-bold text-[0.8125rem] leading-[1.1875rem] text-white">
                  Go Back
                </p>
              </Link>
              <h1 className="font-bold text-white text-[1.125rem] tracking-[0.015625rem] leading-[1.625rem] md:text-[1.5rem] md:tracking-[-0.020625rem] md:leading-[2.1875rem]">
                Roadmap
              </h1>
            </div>
            <Button text="+ Add Feedback" />
          </section>
          {/* Lanes */}
          <section className="hidden md:flex gap-[0.625rem]">
            {/* full lane */}
            <div className="flex flex-col gap-[1.5rem] w-full">
              {/* title and subtitle */}
              <div className="flex flex-col gap-[0.25rem]">
                <p className="font-bold text-dark-1 text-[0.875rem] leading-[1.25rem] tracking-[-0.011875rem] lg:text-[1.125rem] lg:leading-[1.4375rem] lg:tracking-[-0.015625rem]">
                  {`Planned (${planned.length || 0})`}
                </p>
                <p className="font-normal text-gray-3 text-[0.875rem] leading-[1.25rem] lg:text-[1rem] lg:leading-[1.4375rem] tracking-[0rem]">
                  Ideas prioritized for research
                </p>
              </div>
              {/* Card lane */}
              <div className="flex flex-col">
                <DropArea onDrop={() => onDrop(Status.PLANNED, 0)} />
                {planned.map((item: ProductRequest, index: number) => (
                  <Fragment key={item.id}>
                    <Card
                      draggingCard={draggingCard}
                      setDraggingCard={setDraggingCard}
                      status={item.status}
                      noOfComments={item.comments?.length || 0}
                      category={item.category}
                      description={item.description}
                      id={item.id}
                      title={item.title}
                      upvotes={item.upvotes}
                    />
                    <DropArea
                      onDrop={() => onDrop(Status.PLANNED, index + 1)}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
            {/* full lane */}
            <div className="flex flex-col gap-[1.5rem] w-full">
              {/* title and subtitle */}
              <div className="flex flex-col gap-[0.25rem]">
                <p className="font-bold text-dark-1 text-[0.875rem] leading-[1.25rem] tracking-[-0.011875rem] lg:text-[1.125rem] lg:leading-[1.4375rem] lg:tracking-[-0.015625rem]">
                  {`In-Progress (${inProgress.length || 0})`}
                </p>
                <p className="font-normal text-gray-3 text-[0.875rem] leading-[1.25rem] lg:text-[1rem] lg:leading-[1.4375rem] tracking-[0rem]">
                  Currently being developed
                </p>
              </div>
              {/* Card lane */}
              <div className="flex flex-col">
                <DropArea onDrop={() => onDrop(Status.INPROGRESS, 0)} />
                {inProgress.map((item: ProductRequest, index: number) => (
                  <Fragment key={item.id}>
                    <Card
                      draggingCard={draggingCard}
                      setDraggingCard={setDraggingCard}
                      status={item.status}
                      noOfComments={item.comments?.length || 0}
                      category={item.category}
                      description={item.description}
                      id={item.id}
                      title={item.title}
                      upvotes={item.upvotes}
                    />
                    <DropArea
                      onDrop={() => onDrop(Status.INPROGRESS, index + 1)}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
            {/* full lane */}
            <div className="flex flex-col gap-[1.5rem] w-full">
              {/* title and subtitle */}
              <div className="flex flex-col gap-[0.25rem]">
                <p className="font-bold text-dark-1 text-[0.875rem] leading-[1.25rem] tracking-[-0.011875rem] lg:text-[1.125rem] lg:leading-[1.4375rem] lg:tracking-[-0.015625rem]">
                  {`Live (${live.length || 0})`}
                </p>
                <p className="font-normal text-gray-3 text-[0.875rem] leading-[1.25rem] lg:text-[1rem] lg:leading-[1.4375rem] tracking-[0rem]">
                  Released features
                </p>
              </div>
              {/* Card lane */}
              <div className="flex flex-col">
                <DropArea onDrop={() => onDrop(Status.LIVE, 0)} />
                {live.map((item: ProductRequest, index: number) => (
                  <Fragment key={item.id}>
                    <Card
                      draggingCard={draggingCard}
                      setDraggingCard={setDraggingCard}
                      status={item.status}
                      noOfComments={item.comments?.length || 0}
                      category={item.category}
                      description={item.description}
                      id={item.id}
                      title={item.title}
                      upvotes={item.upvotes}
                    />
                    <DropArea onDrop={() => onDrop(Status.LIVE, index + 1)} />
                  </Fragment>
                ))}
              </div>
            </div>
          </section>
          {/* Mobile Lanes */}
          <section className="flex md:hidden">
            <Tabs defaultValue="Planned" className="w-full text-dark-1">
              <TabsList className="flex h-auto w-full p-0 justify-around font-bold text-[0.8125rem] tracking-[0.001125rem] leading-[1.1875rem] text-dark-1/[0.4]">
                <TabsTrigger
                  className="w-full data-[state=active]:text-dark-1 border-b-[0.25rem] data-[state=active]:border-b-purple data-[state=active]:shadow-none m-0 p-[1.25rem] rounded-none"
                  value="Planned"
                >
                  {`Planned (${planned.length || 0})`}
                </TabsTrigger>
                <TabsTrigger
                  className="w-full data-[state=active]:text-dark-1 border-b-[0.25rem] data-[state=active]:border-b-purple data-[state=active]:shadow-none m-0 p-[1.25rem] rounded-none"
                  value="In-Progress"
                >
                  {`In-Progress (${inProgress.length || 0})`}
                </TabsTrigger>
                <TabsTrigger
                  className="w-full data-[state=active]:text-dark-1 border-b-[0.25rem] data-[state=active]:border-b-purple data-[state=active]:shadow-none m-0 p-[1.25rem] rounded-none"
                  value="Live"
                >
                  {`Live (${live.length || 0})`}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Planned">
                {/* full lane */}
                <div className="flex flex-col gap-[1.5rem] w-full px-[1.5rem] py-[1.5rem]">
                  {/* title and subtitle */}
                  <div className="flex flex-col gap-[0.25rem]">
                    <p className="font-bold text-dark-1 text-[1.125rem] leading-[1.4375rem] tracking-[-0.015625rem]">
                      {`Planned (${planned.length || 0})`}
                    </p>
                    <p className="font-normal text-gray-3 text-[0.875rem] leading-[1.25rem] tracking-[0rem]">
                      Ideas prioritized for research
                    </p>
                  </div>
                  {/* Card lane */}
                  <div className="flex flex-col">
                    {planned.map((item: ProductRequest, index: number) => (
                      <Fragment key={item.id}>
                        <Card
                          draggingCard={draggingCard}
                          setDraggingCard={setDraggingCard}
                          status={item.status}
                          noOfComments={item.comments?.length || 0}
                          category={item.category}
                          description={item.description}
                          id={item.id}
                          title={item.title}
                          upvotes={item.upvotes}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="In-Progress">
                {/* full lane */}
                <div className="flex flex-col gap-[1.5rem] w-full px-[1.5rem] py-[1.5rem]">
                  {/* title and subtitle */}
                  <div className="flex flex-col gap-[0.25rem]">
                    <p className="font-bold text-dark-1 text-[1.125rem] leading-[1.4375rem] tracking-[-0.015625rem]">
                      {`In-Progress (${inProgress.length || 0})`}
                    </p>
                    <p className="font-normal text-gray-3 text-[0.875rem] leading-[1.25rem] tracking-[0rem]">
                      Features currently being developed
                    </p>
                  </div>
                  {/* Card lane */}
                  <div className="flex flex-col">
                    {inProgress.map((item: ProductRequest, index: number) => (
                      <Fragment key={item.id}>
                        <Card
                          draggingCard={draggingCard}
                          setDraggingCard={setDraggingCard}
                          status={item.status}
                          noOfComments={item.comments?.length || 0}
                          category={item.category}
                          description={item.description}
                          id={item.id}
                          title={item.title}
                          upvotes={item.upvotes}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="Live">
                {/* full lane */}
                <div className="flex flex-col gap-[1.5rem] w-full px-[1.5rem] py-[1.5rem]">
                  {/* title and subtitle */}
                  <div className="flex flex-col gap-[0.25rem]">
                    <p className="font-bold text-dark-1 text-[1.125rem] leading-[1.4375rem] tracking-[-0.015625rem]">
                      {`Live (${live.length || 0})`}
                    </p>
                    <p className="font-normal text-gray-3 text-[0.875rem] leading-[1.25rem] tracking-[0rem]">
                      Released features
                    </p>
                  </div>
                  {/* Card lane */}
                  <div className="flex flex-col">
                    {live.map((item: ProductRequest, index: number) => (
                      <Fragment key={item.id}>
                        <Card
                          draggingCard={draggingCard}
                          setDraggingCard={setDraggingCard}
                          status={item.status}
                          noOfComments={item.comments?.length || 0}
                          category={item.category}
                          description={item.description}
                          id={item.id}
                          title={item.title}
                          upvotes={item.upvotes}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </div>
  );
}
