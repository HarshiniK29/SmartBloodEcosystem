import api from "../api/axios";

export const getPendingHospitals =
  async () => {
    const res =
      await api.get(
        "/admin/pending-hospitals"
      );

    return res.data;
  };

export const approveHospital =
  async (id) => {
    const res =
      await api.patch(
        `/admin/approve/${id}`
      );

    return res.data;
  };

export const rejectHospital =
  async (id) => {
    const res =
      await api.patch(
        `/admin/reject/${id}`
      );

    return res.data;
  };