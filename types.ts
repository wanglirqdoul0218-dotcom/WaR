export enum Tab {
  HOME = 'HOME',
  MARKET = 'MARKET',
  PUBLISH = 'PUBLISH',
  MESSAGE = 'MESSAGE',
  PROFILE = 'PROFILE'
}

export enum PostType {
  SOCIAL = 'SOCIAL',
  LOST_FOUND = 'LOST_FOUND',
  TRADE = 'TRADE',
  ERRAND = 'ERRAND'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  department?: string;
  bio?: string;
  school?: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  user: User;
  type: PostType;
  category?: string;
  content: string;
  images?: string[];
  tags: string[];
  likes: number;
  comments: number;
  shares?: number;
  timestamp: string;
  isAnonymous?: boolean;
  price?: number; 
  deadline?: string; 
  viewCount?: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  unread: boolean;
  avatar: string;
  isMe?: boolean;
}

export interface NotificationItem {
  id: string;
  user: User;
  type: 'LIKE' | 'COMMENT';
  content?: string; // For comments
  sourcePostImage?: string; // Thumbnail of the post
  timestamp: string;
}