import { API } from 'utils';

export async function getIngredients() {
    const res = await API.get('/ingredients');
    return res.data;
}