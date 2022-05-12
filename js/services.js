const API = "https://625bc0d450128c5702070768.mockapi.io/api/activity";
export default class Services {
  fetchData() {
    return axios({
      url: API,
      method: "GET",
    });
  }
  addData(data) {
    return axios({
      url: API,
      method: "POST",
      data,
    });
  }
  deleteData(id) {
    return axios({
      url: `${API}/${id}`,
      method: "DELETE",
    });
  }
  getDataById(id) {
    return axios({
      url: `${API}/${id}`,
      method: "GET",
    });
  }
  updateData(activity) {
    return axios({
      url: `${API}/${activity.id}`,
      method: "PUT",
      data: activity,
    });
  }
}
const service = new Services();
export const { fetchData, addData, deleteData, getDataById, updateData } =
  service;
