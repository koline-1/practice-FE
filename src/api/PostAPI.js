import api from "./api";

export class PostAPI {
    static async getPostList() {
        const response = await api.get("/post/list");
        return response.data.data;
    }

    static async getPostById(id) {
        const response = await api.get(`/post/${id}`);
        return response.data.data;
    }

    static async createPost(post) {
        const response = await api.post("/post", post);
        return response.data.data;
    }
    
    static async updatePost(post) {
        const response = await api.patch("/post", post);
        return response.data.data;
    }

    static async deletePost(id) {
        const response = await api.delete(`/post/${id}`);
        return response.data.data;
    }
}