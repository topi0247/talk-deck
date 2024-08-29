"use client";

import { Button, Container, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { Config } from "@/config";
import { userState } from "@/recoil";

export default function MyPage() {
  const [user, setUser] = useRecoilState(userState);

  const form = useForm({
    initialValues: {
      username: "",
    },
    validate: {
      username: (value: string) => {
        if (value.length < 1) {
          return "空欄は不可です";
        } else if (value.length > 10) {
          return "10文字以内で入力してください";
        }
      },
    },
  });

  const handleSubmit = async () => {
    const { username } = form.getValues();
    const result = await fetch(`${Config.API_URL}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({ name: username }),
    });
    if (!result.ok) {
      // TODO : フラッシュメッセージ
    }

    // TODO : フラッシュメッセージ
    form.reset();
    setUser({ ...user, name: username });
  };

  return (
    <article className="w-full md:mb-32">
      <Container className="md:w-96">
        <h2 className="text-center text-3xl text-white">マイページ</h2>
        <section className="my-8 rounded bg-white p-8">
          <dl className="flex flex-col items-start justify-center">
            <div>
              <dt>ユーザー名</dt>
              <dd className="ml-4">{user.name}</dd>
            </div>
          </dl>
          <hr className="my-8" />
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <h3>ユーザー名変更</h3>
            <TextInput
              placeholder="新しいユーザー名"
              withAsterisk
              {...form.getInputProps("username")}
            />
            <div className="mt-4 flex w-full items-center justify-center">
              <Button type="submit" color="yellow">
                <span className="text-black">変更</span>
              </Button>
            </div>
          </form>
        </section>
      </Container>
    </article>
  );
}
