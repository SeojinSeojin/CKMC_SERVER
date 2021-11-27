import AuthorData from './Author';

export default interface UserData {
  studentNumber: string;
  loginId: string;
  password: string;
  author: AuthorData;
}
