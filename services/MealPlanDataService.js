import http from "./http-common";

const getAll = () => {
    return http.get("/mymealplan");
};

const get = (day, time) => {
    return http.get(`/mymealplan/${day}/${time}`);
};

const create = data => {
    return http.post("/mymealplan", data);
};

const update = (id, data) => {
    return http.put(`/mymealplan/${id}`, data);
};

const remove = id => {
    return http.delete(`/mymealplan/${id}`);
};

const removeAll = () => {
    return http.delete(`/mymealplan`);
};

const MealPlanDataService = {
    getAll,
    get,
    create,
    update,
    removeAll,
    remove
};

export default MealPlanDataService;