import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

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
                    <div className="flex items-center justify-center mt-5">
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

              <DialogContent className="bg-black max-w-4xl">
                <section className="grid grid-cols-2 my-5">
                  <div className="flex justify-center items-center">
                    <div className="relative w-[300px] h-[500px]">
                      <Image
                        alt="Movie poster"
                        src={movie?.moviemainphotos[0]}
                        className="object-cover"
                        fill
                      />
                    </div>
                  </div>

                  <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm bg-secondary">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Title</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {movie.movietitle}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">
                          Available Language
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          <div className="flex gap-2 flex-wrap">
                            {movie.movielanguages.map((lang) => (
                              <p key={lang}>{lang},</p>
                            ))}
                          </div>
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">
                          Available Country
                        </dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          <div className="flex gap-2 flex-wrap">
                            {movie.moviecountries.map((country) => (
                              <p key={country}>{country},</p>
                            ))}
                          </div>
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Genre</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          <div className="flex gap-2 flex-wrap">
                            {movie.moviegenres.map((genre) => (
                              <p key={genre}>{genre},</p>
                            ))}
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </section>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </section>
    </main>
  );
}
