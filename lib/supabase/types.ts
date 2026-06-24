export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  meta_description: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type PostInsert = Omit<Post, "id" | "created_at" | "updated_at">;
export type PostUpdate = Partial<PostInsert>;

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: PostInsert;
        Update: PostUpdate;
        Relationships: {
          foreignKeyName: string;
          columns: string[];
          isOneToOne?: boolean;
          referencedRelation: string;
          referencedColumns: string[];
        }[];
      };
    };
    Views: Record<string, {
      Row: Record<string, unknown>;
      Relationships: {
        foreignKeyName: string;
        columns: string[];
        isOneToOne?: boolean;
        referencedRelation: string;
        referencedColumns: string[];
      }[];
    }>;
    Functions: Record<string, {
      Args: Record<string, unknown>;
      Returns: unknown;
    }>;
  };
}
