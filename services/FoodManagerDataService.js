import http from "./http-common";

const getAll = () => {
    return http.get("/myfood");
};

const get = id => {
    return http.get(`/myfood/${id}`);
};

const create = data => {
    return http.post("/myfood", data);
};

const update = (id, data) => {
    return http.put(`/myfood/${id}`, data);
};

const updateUseThisWeek = (id, newValue) => {
    return http.patch(`/myfood/${id}/${newValue}`);
};

const remove = id => {
    return http.delete(`/myfood/${id}`);
};

const removeAll = () => {
    return http.delete(`/myfood`);
};

const findByName = name => {
    return http.get(`/myfood?name=${name}`);
};

const FoodManagerDataService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName,
    updateUseThisWeek
};

export default FoodManagerDataService;