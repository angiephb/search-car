import { city } from "@/types/city";
import { SearchInput } from "@/components/SearchInput";

export default async function Home ({ searchParams }: any) {
  const params = await searchParams;
  const query = params.query ?? "";

  const res = await fetch(`http://localhost:3000/api/cities?query=${query}`, {
    cache: "no-store",
  });
  const cities:city[] = await res.json();

  return (
    <div className="p-8 md:p-24">
      <SearchInput data={cities} />
    </div>
  );
}
