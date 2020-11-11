import axios from "axios";

export default {
  getClients: async () => {
    return await axios.get("/api/clients_cambridge");
  },

  addClient: (newClient) => {
    return axios.post("/api/clients_cambridge", newClient);
  },

  getClient: (id) => {
    return axios.get("/auth/api/clients_cambridge/" + id);
  },

  updateClient: (id, data) => {
    return axios.put("/api/clients_cambridge/" + id, data);
  },

  deleteClient: (id) => {
    return axios.delete("/api/clients_cambridge/" + id);
  },

  //Pets
  addPet: (ClientId, newPet) => {
    return axios.post("/api/pets_cambridge/" + ClientId, newPet);
  },
  updatePet: (id, data) => {
    return axios.put("/api/pets_cambridge/" + id, data);
  },

  getPets: async () => {
    return await axios.get("/api/pets_cambridge");
  },

  getPet: (id) => {
    return axios.get("/auth/api/pets_cambridge/" + id);
  },

  deletePet: (id) => {
    return axios.delete("/api/pets_cambridge/" + id);
  },

  //Comments
  getOneComment: (id) => {
    return axios.get("/api/comments_cambridge/" + id);
  },

  addComment: (PetId, newComment) => {
    return axios.post("/api/comments_cambridge/" + PetId, newComment);
  },

  deleteComment: (id) => {
    return axios.delete("/api/comments_cambridge/" + id);
  },

  updateComment: (id, data) => {
    return axios.put("/api/comments_cambridge/" + id, data);
  },
};
