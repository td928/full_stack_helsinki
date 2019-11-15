import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    /*
    const nonExisting = {
        id:10000,
        content: 'This person is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        import: true,
    }*/
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)

    console.log(request)
    return request.then(response => response.data)
}

export default { getAll, create, update , remove}