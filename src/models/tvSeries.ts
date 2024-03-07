export class TvSeries {
  id: number;
  title: string;
  rating: number;
  genres: string[];
  language: string;
  averageRuntime: number;
  officialSite: string;
  premiered: string;
  ended: string;
  image: string;
  summary: string;

  constructor(input: any) {
    this.id = input?.id;
    this.title = input?.name;
    this.rating = input?.rating?.average;
    this.genres = input?.genres;
    this.language = input?.language;
    this.averageRuntime = input?.averageRuntime;
    this.officialSite = input?.officialSite;
    this.premiered = input?.premiered;
    this.ended = input?.ended;
    this.image = input?.image?.medium;
    this.summary = input?.summary;
  }
}
