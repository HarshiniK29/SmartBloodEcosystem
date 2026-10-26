import api from "../api/axios";

export const getRequests = async () => {
  const res = await api.get("/emergency");
  return res.data;
};

export const addRequest = async (data) => {
  const res = await api.post(
    "/emergency",
    data
  );

  return res.data;
};

export const findDonors = async (
  requestId
) => {
  const res = await api.get(
    `/emergency/match/${requestId}`
  );

  return res.data;
};

export const updateStatus =
  async (id, status) => {
    const res = await api.put(
      `/emergency/status/${id}`,
      {
        status,
      }
    );

    return res.data;
  };