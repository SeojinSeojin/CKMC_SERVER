import WorkData from './Work';

export default interface AuthorData {
  name: string;
  number: string;
  projectClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  nickName: string;
  contact: string;
  work: WorkData;
}
