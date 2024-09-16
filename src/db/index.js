import SQLite from 'react-native-sqlite-storage'
import { useEffect } from 'react';

const db = SQLite.openDatabase({
    name: 'userDB',
    location: 'default'
    },
    ()=> {},
    error => {console.log(error());}
);

export const createTables = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users (ID INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT unique, password TEXT)",
            [],
            () => {
                console.log('Table "users" created successfully or already exists.');
            },
            (tx, error) => {
                console.log('Error creating table "users": ' + error.message);
            }
        );
    });
};

export const registerUser = (firstname, lastname, email, password, callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO users (firstname, lastname, email, password) values (?, ?, ?, ?);",
            [firstname, lastname, email, password],
            (tx, result) => {
                console.log('User registered successfully!');
                callback(result)
            },
            error => {
                console.log('Error registering user: ' + error.message)
            }
        )
    })
};

export const loginUser = (email, password, callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM users WHERE email = ? AND password = ?;',
            [email, password],
            (tx, result) => {
                if (result.rows.length > 0) {
                    callback(result.rows.item(0));
                } else {
                    callback(null);
                }
            },
            (error) => {
                callback(null);
                console.error('Error logging in:', error.message || error);
            }
        );
    });
};

