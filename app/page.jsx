import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      {" "}
      <h1>welcome</h1> <Link href="/properties">go to properties</Link>
    </div>
  );
};

export default HomePage;
