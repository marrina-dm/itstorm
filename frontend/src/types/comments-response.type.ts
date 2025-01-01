import {CommentType} from "./comment.type";


export interface CommentResponse {
  allCount: number,
  comments: CommentType[]
}
