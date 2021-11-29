import EpisodeData from './Episode';

export default interface WorkData {
  title: string;
  description: string;
  authorName: string;
  thumbnail: string;
  episodes: EpisodeData[];
  hashTags: Array<string>;
}
