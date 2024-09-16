import axios from 'axios';
import { loginUser, registerUser } from '../../../db';

export default class AuthService {
    signInService ({ email, password }) {
        return new Promise((resolve, reject) => {
            loginUser(email, password, (user) => {
                if (user) {
                    resolve(user); // Resolve the user object
                } else {
                    reject(new Error('Invalid email or password')); // Reject if login fails
                }
            });
        });
    };

    registerService ({firstname, lastname, email, password}) {
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