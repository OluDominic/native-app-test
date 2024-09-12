import axios from 'axios';
import { loginUser, registerUser } from '../../../db/signInDb';

export default class AuthService {
    signInService (data) {
        const { email, password } = data
        return new Promise ((resolve, reject) => {
            loginUser(email, password, (user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject('Invalid email or password');
                }
            })
        })
    }

    registerService (data) {
        const {firstname, lastname, email, password} = data
        return new Promise ((resolve, reject) => {
            registerUser(firstname, lastname, email, password, (result) => {
                if (result) {
                    resolve('User registered successfully');
                } else {
                    reject('Registration failed');
                }
            })
        })
    }
}