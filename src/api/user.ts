import { apiClient } from "./client";

const baseUrl = "/api/v1/users";

export const userApi = {
  register: async (data: {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }) => {
    const response = await apiClient.post(`${baseUrl}/register`, data);
    return response.data;
  },
};
