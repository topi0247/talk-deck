"use client";

import { FormCard, FormContentCard } from "@/components/form";
import { Config } from "@/config";
import { ICard } from "@/types";
import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function New() {
  const [tags, setTags] = useState<string[]>([]);
  const [contentCards, setContentCards] = useState<ICard[]>([]);
  const [isTargetError, setIsTargetError] = useState(false);
  const [isContentError, setIsContentError] = useState(false);
  const router = useRouter();

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
          comment: "",
        },
      ]);
    };
    fetchContentCards();
  }, []);

  const form = useForm({
    initialValues: {
      title: "",
      target1: "",
      target2: "",
      target3: "",
      card: [{ index: 0, title: "", comment: "" }] as ICard[],
    },
    validate: {
      title: (value: string) => {
        if (value.length < 1) {
          return "シチュエーション名は必須です";
        } else if (value.length > 36) {
          return "36文字以内で入力してください";
        }
      },
      target1: (value: string) => {
        if (value.length > 9) {
          return "9文字以内で入力してください";
        }
      },
      target2: (value: string) => {
        if (value.length > 9) {
          return "9文字以内で入力してください";
        }
      },
      target3: (value: string) => {
        if (value.length > 9) {
          return "9文字以内で入力してください";
        }
      },
    },
  });

  const handleSubmit = async () => {
    const { title, target1, target2, target3 } = form.getValues();

    let isError = false;
    setIsTargetError(target1 === "" && target2 === "" && target3 === "");
    isError = target1 === "" && target2 === "" && target3 === "";

    setIsContentError(
      contentCards.length < 1 ||
        contentCards.some((c) => c.title === "" || c.comment === ""),
    );
    isError =
      contentCards.length < 1 ||
      contentCards.some((c) => c.title === "" || c.comment === "");

    if (isError) {
      return;
    }

    const body = contentCards.map((c) => {
      return {
        title: c.title,
        comment: c.comment,
      };
    });

    const situation = {
      title,
      targets: [target1, target2, target3],
      body,
    };

    const url = `${Config.API_URL}/situations`;
    const token = Cookies.get("token") || "";
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ situation }),
    });

    if (result.status !== 201) {
      alert("エラーが発生しました");
      return;
    }

    const data = await result.json();
    router.push(`/talkDeck/${data.uuid}`);
  };

  const handleAddCard = () => {
    setContentCards((prev) => [
      ...prev,
      {
        index: prev.length,
        title: "",
        comment: "",
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
        return { ...card, comment: value };
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
    <article className="md:mb-32">
      <h2 className="text-3xl text-center text-white mb-4">新規作成</h2>
      <Box className="flex justify-center items-center">
        <form
          className="flex flex-col justify-center items-center gap-4"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <FormCard>
            <TextInput
              label="シチュエーション名"
              withAsterisk
              name="title"
              {...form.getInputProps("title")}
            />
            <InputLabel>
              ターゲット<span className="text-red-400">*</span>
            </InputLabel>
            <p className="text-sm text-red-600">
              {isTargetError && "ターゲットを1つは記入してください"}
            </p>
            <Autocomplete
              withAsterisk
              name="target1"
              placeholder="9文字まで"
              data={tags}
              {...form.getInputProps("target1")}
            />
            <Autocomplete
              name="target2"
              placeholder="9文字まで"
              data={tags}
              {...form.getInputProps("target2")}
            />
            <Autocomplete
              name="target3"
              placeholder="9文字まで"
              data={tags}
              {...form.getInputProps("target3")}
            />
          </FormCard>

          {isContentError && (
            <p className="text-red-400 bg-white rounded px-2 py-1">
              カードは1つ以上作成してください
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center items-start">
            {contentCards.map((card) => {
              return (
                <FormContentCard
                  key={card.index}
                  index={card.index}
                  title={card.title}
                  comment={card.comment}
                  handleTitleChange={handleTitleChange}
                  handleContentChange={handleContentChange}
                  handleDelete={handleDelete}
                />
              );
            })}
            <div className="flex justify-center items-center w-full my-16">
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
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
