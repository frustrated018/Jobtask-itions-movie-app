import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import movies from "@/data/dummyData.json";
import Image from "next/image";

export default function Home() {
  //! Filter out movies with empty 'moviemainphotos' array
  const filteredMovies = movies.filter(
    (movie) => movie.moviemainphotos.length > 0
  );

  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-3.5 border-b">
        <h3 className="text-4xl font-semibold">Movies</h3>
        <h5>
          Created by <span>github link</span>
        </h5>
      </nav>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-10 px-5">
        {filteredMovies.map((movie, index) => (
          <div key={movie.imdbmovieid}>
            <Dialog>
              <DialogTrigger className="w-full">
                <Card className="min-h-[500px]">
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <Image
                        alt="Movie poster"
                        src={movie?.moviemainphotos[0]}
                        className="object-cover"
                        height={375}
                        width={250}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <section className="flex flex-col gap-3 w-full">
                      <h3 className="text-lg font-semibold text-left">
                        {movie.movietitle}
                      </h3>
                      <div className="flex gap-3">
                        {movie.moviegenres.map((genre) => (
                          <Badge key={genre}>{genre}</Badge>
                        ))}
                      </div>
                    </section>
                  </CardFooter>
                </Card>
              </DialogTrigger>

              <DialogContent className="bg-black">
                <DialogHeader>
                  <DialogTitle>{movie.movietitle}</DialogTitle>
                  <DialogDescription>
                    Will show the details here
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </section>
    </main>
  );
}
