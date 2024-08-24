"use client";

import { FormCard, FormContentCard } from "@/components/form";
import { ICard } from "@/types";
import { Box, Button, TagsInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

export default function New() {
  const [tags, setTags] = useState<string[]>([]);
  const [contentCards, setContentCards] = useState<ICard[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      setTags(["タグ1", "タグ2", "タグ3"]);
    };
    fetchTags();

    const fetchContentCards = async () => {
      setContentCards([
        {
          index: 0,
          title: "",
          content: "",
        },
      ]);
    };
    fetchContentCards();
  }, []);

  const form = useForm({
    initialValues: {
      situation: "",
      target: ["", "", ""],
      card: [{ title: "", content: "" }],
    },
    validate: {
      situation: (value) => {
        if (value.length < 1) {
          return "シチュエーション名は必須です";
        } else if (value.length > 36) {
          return "36文字以内で入力してください";
        }
      },
      target: (value) => {
        if (value.length < 1 || value[0] === "") {
          return "ターゲットは必須です";
        }
        if (value[0].length > 9 || value[1].length > 9 || value[2].length > 9) {
          return "9文字以内で入力してください";
        }
      },
      card: (value) => {
        if (value.length < 1 || value[0].title === "") {
          return "タイトルは必須です";
        }
        for (const card of value) {
          if (card.title.length > 36) {
            return "36文字以内で入力してください";
          }
          if (card.content.length > 144) {
            return "144文字以内で入力してください";
          }
        }
      },
    },
  });

  const handleSubmit = async () => {
    const { situation, target, card } = form.getValues();
    console.log(situation, target, card);
  };

  const handleAddCard = () => {
    setContentCards((prev) => [
      ...prev,
      {
        index: prev.length,
        title: "",
        content: "",
      },
    ]);
  };

  const handleTitleChange = (index: number, value: string) => {
    const newContentCards = contentCards.map((card) => {
      if (card.index === index) {
        return { ...card, title: value };
      }
      return card;
    });
    setContentCards(newContentCards);
  };

  const handleContentChange = (index: number, value: string) => {
    const newContentCards = contentCards.map((card) => {
      if (card.index === index) {
        return { ...card, content: value };
      }
      return card;
    });
    setContentCards(newContentCards);
  };

  const handleDelete = (index: number) => {
    const newContentCards = contentCards.filter((card) => card.index !== index);
    const reIndexedCards = newContentCards.map((card, i) => {
      return { ...card, index: i };
    });
    setContentCards(reIndexedCards);
  };

  return (
    <article>
      <h2 className="text-3xl text-center text-white mb-4">新規作成</h2>
      <Box className="flex justify-center items-center">
        <form
          className="flex flex-col justify-center items-start gap-4"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <FormCard>
            <TextInput
              label="シチュエーション名"
              withAsterisk
              name="situation"
            />
            <TagsInput
              label="ターゲット"
              name="target1"
              withAsterisk
              data={tags}
              placeholder="9文字まで"
            />
            <span></span>
            <hr />
            <TagsInput data={tags} placeholder="9文字まで" />
            <TagsInput data={tags} placeholder="9文字まで" />
          </FormCard>

          {contentCards.map((card) => {
            return (
              <FormContentCard
                key={card.index}
                index={card.index}
                title={card.title}
                content={card.content}
                handleTitleChange={handleTitleChange}
                handleContentChange={handleContentChange}
                handleDelete={handleDelete}
              />
            );
          })}
          <div className="flex justify-center items-center w-full">
            <Button type="button" color="green" onClick={handleAddCard}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
          <div className="w-full flex justify-center items-center">
            <Button type="submit" color="yellow">
              <span className="text-black">作成</span>
            </Button>
          </div>
        </form>
      </Box>
    </article>
  );
}
