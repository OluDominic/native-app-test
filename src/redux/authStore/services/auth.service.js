import axios from 'axios';

export default class AuthService {
    signInService (data) {
        return new Promise ((resolve, reject) => {
            axios
            .post(data)
            .then((response) => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
        })
    }

    registerService (data) {
        return new Promise ((resolve, reject) => {
            axios
            .post(data)
            .then((response) => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
        })
    }
}