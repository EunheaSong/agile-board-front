import { apiClient } from "./client";

// 인증 관련 API

const baseUrl = "/api/v1/auth";

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post(`${baseUrl}/login`, credentials);
    return response.data;
  },
};
