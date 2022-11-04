import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import iconCheckImg from "../assets/icon-check.svg";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import { Form } from "../components/Form";
import { api } from "../lib/axios";

interface HomeProps {
  poolCount: number;
  gessCount: number;
  userCount: number;
}

export default function Home({ poolCount, gessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    if (!poolTitle) {
      alert("Preecha o nome do bolão");
      return;
    }

    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      setPoolTitle("");

      alert("Sucesso, código na área de transferência.");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>NLW Copa</title>
      </Head>

      <div className="max-w-[1124px] h-screen mx-auto gap-28 grid grid-cols-2 items-center p-6">
        <main>
          <Image src={logoImg} alt="Logo NLW Copa" />

          <h1 className="mt-14 text-gray-100 text-5xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className="mt-10 flex items-center gap-2">
            <Image src={usersAvatarExampleImg} alt="" />

            <strong className="text-gray-100 text-xl">
              <span className="text-ignite-500"> +{userCount}</span> pessoas já
              estão usando
            </strong>
          </div>

          <Form
            createPool={createPool}
            poolTitle={poolTitle}
            setPoolTitle={setPoolTitle}
          />

          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Apśo criar seu bilão, você reveberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex  items-center justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />

              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>

            <div className="w-px h-14 bg-gray-600" />

            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />

              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{gessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>

        <Image
          src={appPreviewImg}
          alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
          quality={100}
          className="md:w-[350px]"
        />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, gessCountResponse, usersCountResponse] =
    await Promise.all([
      api.get("/pools/count"),
      api.get("/guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      gessCount: gessCountResponse.data.count,
      userCount: usersCountResponse.data.count,
    },
    revalidate: 10 * 60, // 10 minutes
  };
};
