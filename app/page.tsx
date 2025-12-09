import MainWrapper from "./components/MainWrapper";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  
  // Ambil nama dari URL (contoh: ?to=Budi)
  const rawName = (params.to as string) || "Bapak/Ibu/Saudara/i";
  const guestName = decodeURIComponent(rawName);

  // Panggil MainWrapper dan kirim namanya
  return <MainWrapper guestName={guestName} />;
}