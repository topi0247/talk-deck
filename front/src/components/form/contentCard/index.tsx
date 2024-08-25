"use client";

import { FormCard } from "@/components/form";
import { Button, InputLabel, Textarea, TextInput } from "@mantine/core";

export default function FormContentCard({
  index,
  title,
  content,
  handleTitleChange,
  handleContentChange,
  handleDelete,
}: {
  index: number;
  title: string;
  content: string;
  handleTitleChange: (index: number, value: string) => void;
  handleContentChange: (index: number, value: string) => void;
  handleDelete: (index: number) => void;
}) {
  return (
    <FormCard>
      <InputLabel>
        内容<span className="text-red-600">*</span>
      </InputLabel>
      {title.length > 36 && (
        <p className="text-sm text-red-600">36文字以内で記入してください</p>
      )}
      <TextInput
        name={`card[${index}].title`}
        value={title}
        onChange={(event) =>
          handleTitleChange(index, event.currentTarget.value)
        }
      />
      <InputLabel>コメント</InputLabel>
      {content.length > 50 && (
        <p className="text-sm text-red-600">50文字以内で記入してください</p>
      )}
      <Textarea
        name={`card[${index}].description`}
        value={content}
        onChange={(event) =>
          handleContentChange(index, event.currentTarget.value)
        }
      />
      {index > 0 ? (
        <div className="w-full flex justify-center items-center mt-8">
          <Button type="button" onClick={() => handleDelete(index)} color="red">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </div>
      ) : (
        <div className="my-16" />
      )}
    </FormCard>
  );
}
