class Api {
    static getTransaction() {
        return fetch('data/data.json')
            .then(res => {
                return res.json();
            })
            .then(res => {
                return res.sort((b, a) => +new Date(a.createdAt) - +new Date(b.createdAt));
            })
            .catch(error => {
                return error;
            })
    }
}

export default Api;