import api from "./api";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch users ${id}:`, error);
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>("/posts");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  try {
    const response = await api.post<Post>("/posts", post);
    return response.data;
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};

export const updatePost = async (
  id: number,
  post: Partial<Post>,
): Promise<Post> => {
  try {
    const response = await api.put<Post>(`/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error(`Failed to update post ${id}:`, error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error(`Failed to delete post ${id}:`, error);
    throw error;
  }
};
