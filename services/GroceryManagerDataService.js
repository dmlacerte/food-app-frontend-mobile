import http from "./http-common";

const getAll = () => {
    return http.get("/mygrocery");
};

const get = id => {
    return http.get(`/mygrocery/${id}`);
};

const create = data => {
    return http.post("/mygrocery", data);
};

const update = (id, data) => {
    return http.put(`/mygrocery/${id}`, data);
};

const remove = id => {
    return http.delete(`/mygrocery/${id}`);
};

const GroceryManagerDataService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default GroceryManagerDataService;