import Head from "next/head";

export function Seo(props) {
  const {
    title = "Dulces importados",
    description = "Los mejores dulces importados y exoticos aqui en Icandy",
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}