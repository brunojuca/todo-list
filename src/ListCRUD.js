import CRUD from "./CRUD";

class ListCRUD extends CRUD {
    async getList() {
        return super.get('list')
    }

    async getListItem(id) {
        return super.getSingle('list', id)
    }

    async postListItem(data) {
        return super.post('list', data)
    }

    async putListItem(data) {
        return super.put('list', data)
    }

    async deleteListItem(id) {
        return super.delete('list', id)
    }
}

export default ListCRUD;