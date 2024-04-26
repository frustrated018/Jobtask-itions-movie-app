"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import movies from "@/data/dummyData.json";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  //! Filter out movies with empty 'moviemainphotos' array
  const filteredMovies = movies.filter(
    (movie) => movie.moviemainphotos.length > 0
  );

  //! Search system
  const [category, setCategory] = useState("");
  const [finishedMovies, setFinishedMovies] = useState(filteredMovies);

  //! Search system

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get("keyword") as string;

    if (!category || !keyword) {
      toast.error("Please enter both a category and a keyword.");
      return;
    }

    const newKeyword = keyword.toLocaleLowerCase();
    
    // Utility function to convert an array of strings to lowercase
    const convertToLowerCase = (arr: string[]) =>
      arr.map((item) => item.toLowerCase());

    const filteredMoviesBySearch = filteredMovies.filter((movie) => {
      const lowercaseKeyword = newKeyword.toLowerCase();

      if (category === "Genre") {
        return convertToLowerCase(movie.moviegenres).includes(lowercaseKeyword);
      } else if (category === "Country") {
        return convertToLowerCase(movie.moviecountries).includes(
          lowercaseKeyword
        );
      } else if (category === "Language") {
        return convertToLowerCase(movie.movielanguages).includes(
          lowercaseKeyword
        );
      }
    });
    setFinishedMovies(filteredMoviesBySearch);
  };

  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-3.5 border-b">
        <h3 className="text-4xl font-semibold">Movies</h3>
        <h5>
          Created by <span>github link</span>
        </h5>
      </nav>

      {/* Filter section */}

      <h4 className="text-center pt-5 text-xl">
        Select the categroy for the search. Click the cards to see the movie
        details.
      </h4>
      <section className="flex justify-center items-center gap-10 px-5 py-5 w-full">
        <div>
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Country">Country</SelectItem>
              <SelectItem value="Genre">Genre</SelectItem>
              <SelectItem value="Language">Language</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <form
          className="flex w-full max-w-sm items-center space-x-2"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="keyword"
            placeholder="Search by Genre, Country, Language"
          />
          <Button type="submit" className="gap-1">
            Search
            <MagnifyingGlassIcon className="h-5 w-5" />
          </Button>
        </form>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10 pt-5 px-5">
        {finishedMovies.map((movie, index) => (
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
                        <dt className="font-medium">Title</dt>
                        <dd className="sm:col-span-2">{movie.movietitle}</dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium">Available Language</dt>
                        <dd className="sm:col-span-2">
                          <div className="flex gap-2 flex-wrap">
                            {movie.movielanguages.map((lang) => (
                              <p key={lang}>{lang},</p>
                            ))}
                          </div>
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium">Available Country</dt>
                        <dd className="sm:col-span-2">
                          <div className="flex gap-2 flex-wrap">
                            {movie.moviecountries.map((country) => (
                              <p key={country}>{country},</p>
                            ))}
                          </div>
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium">Genre</dt>
                        <dd className="sm:col-span-2">
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
