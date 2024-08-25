"use client";

import { Button, Container, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function MyPage() {
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

  return (
    <article className="w-full md:mb-32">
      <Container className="md:w-96">
        <h2 className="text-3xl text-center text-white">マイページ</h2>
        <section className="bg-white rounded p-8 my-8">
          <dl className="flex flex-col justify-center items-start">
            <div>
              <dt>ユーザー名</dt>
              <dd className="ml-4">ユーザー名</dd>
            </div>
          </dl>
          <hr className="my-8" />
          <form>
            <h3>ユーザー名変更</h3>
            <TextInput
              placeholder="新しいユーザー名"
              withAsterisk
              {...form.getInputProps("username")}
            />
            <div className="w-full flex justify-center items-center mt-4">
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
