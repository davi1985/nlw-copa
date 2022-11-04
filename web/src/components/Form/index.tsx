import { FormEvent } from "react";

type FormProps = {
  poolTitle: string;
  setPoolTitle: (arg: string) => void;
  createPool: (event: FormEvent) => Promise<void>;
};

export const Form = ({ createPool, poolTitle, setPoolTitle }: FormProps) => {
  return (
    <form action="" onSubmit={createPool} className="mt-10 flex gap-2">
      <input
        className="flex-1 px-6 py-4 rounded bg-gray-800 border text-gray-100 border-gray-600 text-sm"
        type="text"
        placeholder="Qual nome do seu bolão ?"
        value={poolTitle}
        onChange={(event) => setPoolTitle(event.target.value)}
      />

      <button
        className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
        type="submit"
      >
        Criar meu bolão
      </button>
    </form>
  );
};
