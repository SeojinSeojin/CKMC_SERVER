import CommentData from './Comment';
import PageData from './Page';

export default interface EpisodeData {
  workTitle: string;
  viewMethod: number;
  title: string;
  thumbnail: string;
  description: string;
  isForNineteen: boolean;
  link?: string;
  pages?: PageData[];
  comments: CommentData[];
}
