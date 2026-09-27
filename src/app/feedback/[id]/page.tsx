"use client";

import useSWR from "swr";
import CategoryCard from "@/components/composed/CategoryCard";
import FeedbackBar from "@/components/composed/FeedbackBar";
import RoadmapCard from "@/components/composed/RoadmapCard";
import SuggestionCard from "@/components/composed/SuggestionCard";
import TitleCard from "@/components/composed/TitleCard";
import { Toggle } from "@/components/ui/toggle";
import React, { useState } from "react";
import Button from "@/components/Button";
import { ProductRequest } from "@/types";
import { Svg } from "@/components/Svg";
import Text from "@/components/Text";
import Image from "next/image";
import Link from "next/link";
import Spacer from "@/components/Spacer";
import { useProductRequestsById } from "@/hooks/useProductRequestById";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

interface CommentReply {
  content: string;
  replyingTo: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
}

interface Comment {
  id: number;
  user: {
    image: string;
    name: string;
    username: string;
  };
  content: string;
  replies?: CommentReply[];
}

const ReplyBox: React.FC = () => {
  return (
    <div className="flex gap-[1rem]">
      <Textarea className="rounded-[0.3125rem] text-dark-1" maxLength={250} />
      <Button color="purple" text="Post Reply" className="shrink-0" />
    </div>
  );
};

const CommentReply: React.FC<{
  commentReply: CommentReply;
  numberOfCommentReplies: number;
  commentReplyIndex: number;
}> = ({ commentReply, commentReplyIndex, numberOfCommentReplies }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <React.Fragment key={commentReplyIndex}>
      <div className="flex justify-start">
        {/* line */}
        {numberOfCommentReplies > commentReplyIndex + 1 ? (
          <div className="h-[100%] w-[1px] shrink-0 bg-gray-3/[.1] ml-0 md:ml-[20px]"></div>
        ) : (
          <div className="h-[20px] w-[1px] shrink-0 bg-gray-3/[.1] ml-0 md:ml-[20px]"></div>
        )}
        {/* content */}
        <div className="flex flex-col gap-[16px] pl-[24px]">
          <div className="flex gap-[16px] md:gap-[32px] w-full">
            {/* avatar */}
            <div className="h-[40px] w-[40px] rounded-full bg-red shrink-0"></div>
            <div className="flex w-full justify-between">
              {/* Name and username */}
              <div className="flex flex-col justify-center">
                <p className="text-gray-3 font-bold text-[13px] leading-[19px] sm:text-[14px] sm:leading-[20px]">
                  {commentReply.user.name}
                </p>
                <p className="text-gray-3 text-[13px] leading-[19px] sm:text-[14px] sm:leading-[20px]">
                  {commentReply.user.username}
                </p>
              </div>
              {/* reply button */}
              <Button
                as="link"
                text="Reply"
                className="text-blue"
                onClick={() => setShowReplyBox(!showReplyBox)}
              />
            </div>
          </div>
          <div className="flex w-full gap-[32px]">
            {/* Spacer */}
            <div className=" h-[40px] w-[40px] shrink-0 hidden md:inline-block"></div>
            <div className="flex flex-col gap-[1.5rem]">
              <p className="text-gray-3 text-[13px] leading-[19px] sm:text-[15px] sm:leading-[22px]">
                <span className="text-purple font-bold">
                  @{commentReply?.replyingTo}{" "}
                </span>
                {commentReply.content}
              </p>
              {showReplyBox && <ReplyBox />}
            </div>
          </div>
        </div>
      </div>
      {/* only render if it's not the last item on the list */}
      {numberOfCommentReplies > commentReplyIndex + 1 && (
        <Spacer
          axis="vertical"
          size={24}
          className="bg-gray-3/[.1] ml-0 md:ml-[20px]"
        />
      )}
    </React.Fragment>
  );
};

const Comment: React.FC<{
  comment: Comment;
  numberOfComments: number;
  commentIndex: number;
}> = ({ comment, numberOfComments, commentIndex }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  return (
    <React.Fragment>
      <div className="flex flex-col gap-[17px]">
        <div className="flex gap-[16px] md:gap-[32px] w-full">
          {/* avatar */}
          <div className="h-[40px] w-[40px] rounded-full bg-red shrink-0"></div>
          <div className="flex w-full justify-between">
            {/* Name and username */}
            <div className="flex flex-col justify-center">
              <p className="text-gray-3 font-bold text-[13px] leading-[19px] sm:text-[14px] sm:leading-[20px]">
                {comment.user.name}
              </p>
              <p className="text-gray-3 text-[13px] leading-[19px] sm:text-[14px] sm:leading-[20px]">
                {comment.user.username}
              </p>
            </div>
            {/* reply button */}
            <Button
              as="link"
              text="Reply"
              className="text-blue"
              onClick={() => setShowReplyBox(!showReplyBox)}
            />
          </div>
        </div>
        <div className="flex w-full">
          {/* Line */}
          {comment.replies ? (
            <div className="hidden md:block h-[100%] w-[1px] shrink-0 bg-gray-3/[.1] ml-0 md:ml-[20px]"></div>
          ) : (
            <div className="hidden md:block h-[100%] w-[1px] shrink-0 ml-0 md:ml-[20px]"></div>
          )}
          {/* invisible 40px box */}
          <div className=" h-[40px] w-[40px] shrink-0 hidden md:inline-block"></div>
          {/* Spacer */}
          <div className="hidden md:block w-[11px] shrink-0"></div>
          <div className="flex flex-col gap-[1.5rem]">
            <p className="text-gray-3 text-[0.8125rem] leading-[1.1875rem] sm:text-[0.9375rem] sm:leading-[1.375rem]">
              {comment.content}
            </p>
            {showReplyBox && <ReplyBox />}
          </div>
        </div>
      </div>
      {comment.replies && (
        <div className="flex flex-col">
          <Spacer
            axis="vertical"
            size={24}
            className="bg:transparent md:bg-gray-3/[.1] ml-0 md:ml-[20px]"
          />
          {comment.replies?.map((reply: CommentReply, replyIndex: number) => (
            <CommentReply
              key={replyIndex}
              commentReply={reply}
              commentReplyIndex={replyIndex}
              numberOfCommentReplies={comment?.replies?.length || 0}
            />
          ))}
        </div>
      )}
      {numberOfComments > commentIndex + 1 && (
        <div className="h-[1px] w-full bg-[#8C92B3]/[.25] my-[32px]" />
      )}
    </React.Fragment>
  );
};

export default function Feedback({ params }: { params: { id: string } }) {
  const [newCommentValue, setNewCommentValue] = useState("");
  const router = useRouter();
  const { data, error, isLoading } = useProductRequestsById(params.id);
  //Handle the error state
  if (error) {
    return <div>Failed to load</div>;
  }
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center bg-gray-1 pb-[55px] pt-[2.125rem] md:pt-[5.875rem] md:pb-[8rem] h-full">
      <div className="flex flex-col items-center px-[1.5rem] md:px-0 w-full md:w-[689px] lg:w-[730px] gap-[1.5rem]">
        <div className="flex justify-between w-full">
          <Link
            href={""}
            className="flex items-center gap-[16px]"
            onClick={() => router.back()}
          >
            <Svg name="left-arrow" className="stroke-blue" />
            <p className="font-bold text-[0.8125rem] leading-[1.1875rem] text-gray-3">
              Go Back
            </p>
          </Link>
          <Button
            text="Edit Feedback"
            color="blue"
            onClick={() =>
              router.push(
                `/edit-feedback?${new URLSearchParams({ id: params.id })}`
              )
            }
          />
        </div>
        <div className="w-full">
          <SuggestionCard key={data.id} suggestion={data} />
        </div>
        <div className="flex flex-col bg-white px-[2rem] py-[1.75rem] rounded-[0.625rem] justify-between w-full">
          {/* Title */}
          <h3 className="font-bold text-[1.125rem] tracking-[-0.01375em] leading-[1.625rem] text-dark-1">
            {data?.comments?.length || 0} Comments
          </h3>
          <Spacer axis="vertical" size={28} />
          {/* Comment */}
          <div className="flex flex-col">
            {data.comments &&
              data.comments.map((comment: any, index: number) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  commentIndex={index}
                  numberOfComments={data.comments!.length}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col bg-white px-[2rem] py-[1.75rem] rounded-[0.625rem] justify-between w-full">
          {/* Title */}
          <h3 className="font-bold text-[1.125rem] tracking-[-0.01375em] leading-[1.625rem] text-dark-1">
            Add Comment
          </h3>
          <Spacer axis="vertical" size={24} />
          {/* Comment */}
          <div className="flex flex-col gap-[1rem]">
            <Textarea
              className="rounded-[0.3125rem] text-dark-1"
              maxLength={250}
              value={newCommentValue}
              onChange={(e) => setNewCommentValue(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <p className="font-normal text-gray-3 text-[0.9375rem] leading-[1.375rem] tracking-[0rem]">
                {250 - newCommentValue.length} characters left
              </p>
              <Button text="Post Comment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
