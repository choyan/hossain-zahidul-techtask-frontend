import { API } from 'utils';

export async function getAllRecipies(args) {
    const res = await API.get(`/recipes?ingredients=${args}`);
    return res.data;
}