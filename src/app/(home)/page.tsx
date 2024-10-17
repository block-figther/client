"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  nickname: string;
};

export default function MainPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch("http://localhost:8080/join_game", {
      method: "POST",
      body: JSON.stringify({
        nickname: data.nickname,
      }),
    });
    const authData = await response.json();
    if (response.status !== 200) {
      toast.warning(authData.title);
      return;
    }

    localStorage.setItem("token", authData.token);
    localStorage.setItem("nickname", data.nickname);

    router.push("/game");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <h1 className="flex flex-col text-5xl mb-5 text-center">
          <span className="mb-1">Join game</span>
          <span>
            <b>
              to <i className="text-fuchsia-500">FIGHT</i>
            </b>
          </span>
        </h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                placeholder="Nickname"
                required={true}
                className="mr-3"
                {...register("nickname")}
              />
              <Button type="submit" variant={"secondary"}>
                Join
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
