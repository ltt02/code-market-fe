import createApiClient from "./api.service";
class ApplicationService {
    constructor(baseUrl = "http://localhost:8080/applications") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get()).data;
    }
    async create(data) {
        return (await this.api.post(data)).data;
    }
    async deleteAll() {
        return (await this.api.delete()).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new ApplicationService();