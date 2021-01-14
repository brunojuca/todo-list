/**
 * Simple CRUD for learning
 */
class CRUD {
    /** LocalStorage prefix */
    prefix = 'crud_'
    /** Default timeout simulating AJAX */
    timeout = 200

    /**
     * Promise Timeout
     * @param {Number} [time=200] time to wait
     */
    setTimeout = (time = this.timeout) => new Promise(resolve => setTimeout(resolve, time))
    
    /**
     * Downloads the table
     * @param {String} table name
     * @returns {Object} table object, with counter and table name
     */
    async download(table) {
        await this.setTimeout()

        const item = localStorage.getItem(this.prefix + table)
        return item ? JSON.parse(item) : { table, counter: 0, items: [] };
    }

    /**
     * Persists a table
     * @param {String} table name
     * @param {Object} data table object
     */
    async upload(table, data) {
        await this.setTimeout()

        localStorage.setItem(this.prefix + table, JSON.stringify(data))
    }

    /**
     * Gets all items from table
     * @param {String} table name
     * @returns {[Object]} array of items
     */
    async get(table) {
        const { items } = await this.download(table)
        return items
    }

    /**
     * Gets one item of a table
     * @param {String} table name
     * @param {Number} id item ID
     * @returns {Object} item found
     */
    async getSingle(table, id) {
        const { items } = await this.download(table)
        return items.find(item => item.id === id)
    }

    /**
     * Add an item to the table
     * @param {String} table name
     * @param {Object} data item
     * @returns {Object} item inserted
     */
    async post(table, data) {
        let { items, counter, ...entry } = await this.download(table);
        data = { ...data, id: counter }
        items.push(data)
        counter++
        await this.upload(table, { ...entry, counter, items, })
        return data
    }

    /**
     * Updates an item
     * @param {String} table name
     * @param {Object} data Object containing id and fields to be updated
     * @returns {Object} updated item
     */
    async put(table, data) {

        const { items = [], ...entry } = await this.download(table)
        const i = items.findIndex(item => item.id === data.id)
        items[i] = { ...items[i], ...data }
        await this.upload(table, { ...entry, items })
        return items[i]
    }

    /**
     * Deletes an item
     * @param {String} table name
     * @param {Object} id item ID
     * @returns {Object} item removed
     */
    async delete(table, id) {
        const { items = [], ...entry } = await this.download(table)
        const i = items.findIndex(item => item.id === id)
        const [removed] = items.splice(i, 1);
        await this.upload(table, { ...entry, items })
        return removed
    }

    /**
     * Drops an table
     * @param {String} table name
     */
    drop(table) {
        localStorage.removeItem(table)
    }

    /**
     * Clears the database.
     */
    clear() {
        localStorage.clear()
    }
}

export default CRUD;