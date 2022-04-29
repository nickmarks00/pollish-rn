import axios from 'axios'
import authStorage from '../auth/storage'
import {BASE_URL} from '@env';

const base = BASE_URL;

const LoadUser = async ({uid}) => {
    const url = `http://${base}/core/users/${uid}/`

    const access = await authStorage.getAccess()
    axios.get(url, { headers: {Authorization: access} })
        .then(res => { return res.data }) 
}

export { LoadUser };