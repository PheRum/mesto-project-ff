import axios from 'axios';

const $axios = axios.create({
    baseURL: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
        'Authorization': '97ab1537-eb90-44cf-8971-1aba9792c57d',
        'Content-Type': 'application/json',
    },
});

$axios.interceptors.response.use(response => response, error => {
    if (error?.response?.data?.message) {
        error.message = error?.response?.data?.message;
    }

    return Promise.reject(error);
});

export const MestoAPI = {
    fetchCards() {
        return $axios.get('/cards');
    },

    storeCard({ name, link }) {
        return $axios.post('/cards', { name, link });
    },

    deleteCard(id) {
        return $axios.delete(`/cards/${id}`);
    },

    likeCard(id) {
        return $axios.put(`/cards/likes/${id}`);
    },

    unLikeCard(id) {
        return $axios.delete(`/cards/likes/${id}`);
    },

    fetchProfile() {
        return $axios.get('/users/me');
    },

    updateProfile({ name, about }) {
        return $axios.patch('/users/me', { name, about });
    },

    updateProfileAvatar(url) {
        return $axios.patch('/users/me/avatar', { avatar: url });
    },
};
