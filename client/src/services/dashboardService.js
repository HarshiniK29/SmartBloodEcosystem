import api from "../api/axios";

export const getDashboardStats =
  async () => {
    const res =
      await api.get(
        "/dashboard/stats"
      );

    return res.data;
  };
export const getPublicStats =
  async () => {
    const res =
      await api.get(
        "/dashboard/public-stats"
      );

    return res.data;
  };