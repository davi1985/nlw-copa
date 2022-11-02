import { GetServerSideProps } from "next";

interface HomeProps {
  count: number;
}

export default function Home({ count }: HomeProps) {
  return <h1>Hello World {count}</h1>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count");
  const data = await response.json();

  return {
    props: {
      count: data.count,
    },
  };
};
