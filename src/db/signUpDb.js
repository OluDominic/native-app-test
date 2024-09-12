import {openDatabase} from 'react-native-sqlite-storage';

export const signUpDb = async () => {
    return openDatabase({name: 'sign-up.db', location: 'default'});
}