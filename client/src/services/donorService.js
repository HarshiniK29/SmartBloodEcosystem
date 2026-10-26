import api from "../api/axios";

export const getDonors = async () => {
  const res = await api.get(
    "/donors"
  );
  return res.data;
};

export const addDonor = async (
  data
) => {
  const res = await api.post(
    "/donors",
    data
  );
  return res.data;
};

export const updateDonor = async (
  id,
  data
) => {
  const res = await api.put(
    `/donors/${id}`,
    data
  );
  return res.data;
};

export const deleteDonor = async (
  id
) => {
  const res = await api.delete(
    `/donors/${id}`
  );
  return res.data;
};
