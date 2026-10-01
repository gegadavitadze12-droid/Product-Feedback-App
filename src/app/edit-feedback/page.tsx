"use client";

import Button from "@/components/Button";
import Spacer from "@/components/Spacer";
import { Svg } from "@/components/Svg";
import { categories } from "@/components/composed/CategoryCard";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { useProductRequestsById } from "@/hooks/useProductRequestById";

import {
  getStoredProductRequests,
  saveProductRequests,
} from "@/hooks/useProductRequests";

import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Fragment } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";

import { useQueryClient } from "react-query";

const statusOptions = [
  "planned",
  "in-progress",
  "live",
  "suggestion",
];

const editFeedbackSchema = z.object({
  feedbackTitle: z.string().min(1, "Can't be empty"),

  category: z.string(),

  updateStatus: z.string(),

  feedbackDetail: z
    .string()
    .min(1, "Can't be empty")
    .max(150, "Please shorten the description"),
});

export default function EditFeedback() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "1";

  const {
    data,
    error,
    isLoading,
  } = useProductRequestsById(id);

  const router = useRouter();

  const queryClient = useQueryClient();

  const form = useForm<
    z.infer<typeof editFeedbackSchema>
  >({
    resolver: zodResolver(editFeedbackSchema),

    values: {
      feedbackTitle: data?.title || "",

      category: data?.category || "feature",

      updateStatus: data?.status || "suggestion",

      feedbackDetail: data?.description || "",
    },
  });

  const onSubmit = (
    values: z.infer<typeof editFeedbackSchema>
  ) => {
    const currentData = queryClient.getQueryData<{
      productRequests: any[];
    }>(["productRequest"]);

    let productRequests =
      currentData?.productRequests || [];

    if (productRequests.length === 0) {
      productRequests =
        getStoredProductRequests() || [];
    }

    const updatedRequests = productRequests.map(
      (item) => {
        if (item.id.toString() !== id) {
          return item;
        }

        return {
          ...item,

          title: values.feedbackTitle,

          category: values.category,

          status: values.updateStatus,

          description: values.feedbackDetail,
        };
      }
    );

    saveProductRequests(updatedRequests);

    queryClient.setQueryData(["productRequest"], {
      ...(currentData || {}),
      productRequests: updatedRequests,
    });

    router.push(`/feedback/${id}`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) {
      return;
    }

    const currentData = queryClient.getQueryData<{
      productRequests: any[];
    }>(["productRequest"]);

    let productRequests =
      currentData?.productRequests || [];

    if (productRequests.length === 0) {
      productRequests =
        getStoredProductRequests() || [];
    }

    const updatedRequests =
      productRequests.filter(
        (item) => item.id.toString() !== id
      );

    saveProductRequests(updatedRequests);

    queryClient.setQueryData(["productRequest"], {
      ...(currentData || {}),
      productRequests: updatedRequests,
    });

    router.push("/");
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Failed to load
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Feedback not found
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-1 pb-[55px] pt-[2.125rem] md:pt-[5.875rem] md:pb-[8rem] h-full">

      <div className="flex flex-col items-center px-[1.5rem] md:px-0 md:w-[540px] w-full gap-[55px]">

        <div className="flex w-full">

          <Link
            href={""}
            onClick={() => router.back()}
            className="flex items-center gap-[16px]"
          >

            <Svg
              name="left-arrow"
              className="stroke-blue"
            />

            <p className="font-bold text-[0.8125rem] leading-[1.1875rem] text-gray-3">
              Go Back
            </p>

          </Link>

        </div>

        <div className="relative w-full px-[24px] pb-[24px] md:pb-[40px] pt-[52px] md:pt-[52px] rounded-[10px] bg-white">

          <Svg
            name="new-feedback"
            className="absolute top-[-28px]"
          />

          <h1 className="font-bold text-[1.125rem] md:text-[1.5rem] leading-[1.625rem] md:leading-[2.1875rem] tracking-[-0.25px] md:tracking-[-0.33px] text-dark-1">
            Editing '{data.title}'
          </h1>

          <Spacer
            axis="vertical"
            size={40}
          />

          <Form {...form}>

            <form
              className="flex flex-col gap-[1.5rem]"
              onSubmit={form.handleSubmit(
                onSubmit
              )}
            >

              <FormField
                control={form.control}
                name="feedbackTitle"
                render={({
                  field,
                  fieldState,
                }) => (
                  <FormItem>

                    <FormLabel className="text-dark-1 font-bold text-[0.8125rem] leading-[1.1875rem] tracking-[0.01125rem] md:text-[0.875rem] md:leading-[1.25rem] md:tracking-[-0.011875rem]">
                      Feedback Title
                    </FormLabel>

                    <Spacer
                      axis="vertical"
                      size={2}
                    />

                    <FormDescription className="text-gray-3 font-normal text-[0.8125rem] leading-[1.1875rem] tracking-[0rem] md:text-[0.875rem] md:leading-[1.25rem] m-0">
                      Add a short, descriptive headline
                    </FormDescription>

                    <Spacer
                      axis="vertical"
                      size={16}
                    />

                    <FormControl>

                      <Input
                        className={cn(
                          `bg-gray-1 text-dark-1 text-[0.9375rem] leading-[1.375rem] tracking-[0px] rounded-[5px] py-[0.8125rem] px-[1.5rem]`,
                          {
                            "focus:ring-red":
                              fieldState.error,
                          }
                        )}
                        {...field}
                      />

                    </FormControl>

                    <Spacer
                      axis="vertical"
                      size={4}
                    />

                    <FormMessage className="text-red font-normal text-[0.8125rem] leading-[1.1875rem] md:text-[0.875rem] md:leading-[1.25rem]" />

                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel className="text-dark-1 font-bold text-[0.8125rem] leading-[1.1875rem] md:text-[0.875rem] md:leading-[1.25rem]">
                      Category
                    </FormLabel>

                    <Spacer
                      axis="vertical"
                      size={2}
                    />

                    <FormDescription className="text-gray-3 font-normal text-[0.8125rem] leading-[1.1875rem]">
                      Choose a category for your feedback
                    </FormDescription>

                    <Spacer
                      axis="vertical"
                      size={16}
                    />

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >

                      <FormControl>

                        <SelectTrigger
                          aria-labelledby="sort-label"
                          className="rounded-[0.3125rem] px-[1.5rem] bg-gray-1 text-dark-1 text-[0.875rem] leading-[1.25rem] capitalize [&>svg]:stroke-blue"
                        >

                          <SelectValue />

                        </SelectTrigger>

                      </FormControl>

                      <SelectContent className="text-[1rem] leading-[1.4375rem] mt-[1rem] capitalize">

                        <SelectGroup>

                          {categories
                            .filter(
                              (item) =>
                                item !== "all"
                            )
                            .map(
                              (
                                item,
                                index,
                                arr
                              ) => (
                                <Fragment
                                  key={item}
                                >

                                  <SelectItem
                                    className="px-[1.5rem]"
                                    value={item}
                                  >
                                    {item}
                                  </SelectItem>

                                  {arr.length >
                                    index + 1 && (
                                    <SelectSeparator />
                                  )}

                                </Fragment>
                              )
                            )}

                        </SelectGroup>

                      </SelectContent>

                    </Select>

                    <Spacer
                      axis="vertical"
                      size={4}
                    />

                    <FormMessage className="text-red" />

                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="updateStatus"
                render={({ field }) => (
                  <FormItem>

                    <FormLabel className="text-dark-1 font-bold text-[0.8125rem] leading-[1.1875rem] md:text-[0.875rem] md:leading-[1.25rem]">
                      Update Status
                    </FormLabel>

                    <Spacer
                      axis="vertical"
                      size={2}
                    />

                    <FormDescription className="text-gray-3">
                      Change feature state
                    </FormDescription>

                    <Spacer
                      axis="vertical"
                      size={16}
                    />

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >

                      <FormControl>

                        <SelectTrigger
                          aria-labelledby="sort-label"
                          className="rounded-[0.3125rem] px-[1.5rem] bg-gray-1 text-dark-1 text-[0.875rem] leading-[1.25rem] capitalize [&>svg]:stroke-blue"
                        >

                          <SelectValue />

                        </SelectTrigger>

                      </FormControl>

                      <SelectContent className="text-[1rem] leading-[1.4375rem] mt-[1rem] capitalize">

                        <SelectGroup>

                          {statusOptions.map(
                            (
                              item,
                              index,
                              arr
                            ) => (
                              <Fragment
                                key={item}
                              >

                                <SelectItem
                                  className="px-[1.5rem]"
                                  value={item}
                                >
                                  {item}
                                </SelectItem>

                                {arr.length >
                                  index + 1 && (
                                  <SelectSeparator />
                                )}

                              </Fragment>
                            )
                          )}

                        </SelectGroup>

                      </SelectContent>

                    </Select>

                    <Spacer
                      axis="vertical"
                      size={4}
                    />

                    <FormMessage className="text-red" />

                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="feedbackDetail"
                render={({
                  field,
                  fieldState,
                }) => (
                  <FormItem>

                    <FormLabel className="text-dark-1 font-bold text-[0.8125rem] leading-[1.1875rem] md:text-[0.875rem] md:leading-[1.25rem]">
                      Feedback Detail
                    </FormLabel>

                    <Spacer
                      axis="vertical"
                      size={2}
                    />

                    <FormDescription className="text-gray-3">
                      Add a short, descriptive headline
                    </FormDescription>

                    <Spacer
                      axis="vertical"
                      size={16}
                    />

                    <FormControl>

                      <Textarea
                        className={cn(
                          `bg-gray-1 text-dark-1 text-[0.9375rem] leading-[1.375rem] tracking-[0px] rounded-[5px] py-[0.8125rem] px-[1.5rem]`,
                          {
                            "focus:ring-red":
                              fieldState.error,
                          }
                        )}
                        {...field}
                      />

                    </FormControl>

                    <Spacer
                      axis="vertical"
                      size={4}
                    />

                    <FormMessage className="text-red" />

                  </FormItem>
                )}
              />

              <div className="flex flex-col-reverse sm:flex-row w-full sm:justify-between pt-[1rem] gap-[1rem] sm:pt-[0.5rem]">

                <Button
                  color="red"
                  text="Delete"
                  onClick={handleDelete}
                />

                <div className="flex flex-col-reverse sm:flex-row gap-[1rem]">

                  <Button
                    color="dark-1"
                    text="Cancel"
                    onClick={() =>
                      router.back()
                    }
                  />

                  <Button
                    type="submit"
                    color="purple"
                    text="Save changes"
                  />

                </div>

              </div>

            </form>

          </Form>

        </div>

      </div>

    </div>
  );
}