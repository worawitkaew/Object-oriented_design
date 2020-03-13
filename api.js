import axios from 'axios';

export function q() {
    return axios.get('https://mheanmaa.azurewebsites.net/api/dog/5e6773287320224c3c613d79')
}
