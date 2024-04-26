import { Button } from "@/components/ui/button";

import movies from "@/data/dummyData.json";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section>
        <h3 className="text-4xl">Toatal Movies {movies.length}</h3>
      </section>
    </main>
  );
}
