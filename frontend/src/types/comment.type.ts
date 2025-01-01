import {UserInfoResponseType} from './user-info-response.type';


export interface CommentType {
  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  user: UserInfoResponseType
}
