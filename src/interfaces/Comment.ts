export default interface Comment {
  postId: string;
  parentId?: string;
  author: string;
  created: Date;
  content: string;
}
