export default interface Post {
    authorName: string;
    content: string
    like: Like[]
    comments: any[]
    creationDate : Date
    username: string
    hubname: string | undefined
  }

  export interface Like {
    username: string;
    emojiIndex: number;
}