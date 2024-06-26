export default interface Post {
    authorName: string;
    comments: string[]; 
    creationDate: string; 
    description: string;
    like: Like[]; 
    title: string;
    type: string;
    userId: string;
    _id: string;
    language: string | undefined;
  }

  export interface Like {
    userId: string;
    emojiIndex: number;
}
