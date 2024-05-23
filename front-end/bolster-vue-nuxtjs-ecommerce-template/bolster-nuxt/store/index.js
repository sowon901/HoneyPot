// axios
import axios from 'axios';
import apiClient from '../api/apiClient';

const state = () => ({
    cart: [],
    totalAmount: 0,
    totalQuantity: 0,
    orders: [],
    authUser: null,
    serialNumber: null,
    formError: null,
    isLoggedIn: false,
});

export const totals = (paylodArr) => {
    const totalAmount = paylodArr.map(cartArr => {
        return cartArr.price * cartArr.quantity
    }).reduce((a, b) => a + b, 0);

    const totalQuantity = paylodArr.map(cartArr => {
        return cartArr.quantity;
    }).reduce((a, b) => a + b, 0);

    return {
        amount: totalAmount.toFixed(2),
        qty: totalQuantity
    }
};
const mutations = {
    'SET_USER'(state, user) {
        state.authUser = user
    },
    'GET_ORDER'(state, payload){
        state.orders = payload
    },
    'GET_CART'(state, payload){
        state.cart = payload
        state.totalAmount = totals(payload).amount
        state.totalQuantity = totals(payload).qty
    },
    'ADD_TO_CART'(state, payload){
        state.cart = [...state.cart, ...payload]
        state.totalAmount = totals(state.cart).amount
        state.totalQuantity = totals(state.cart).qty
    },
    'DELETE_CART'(state, id){
        const currentCartToDelete = state.cart
        const indexToDelete = currentCartToDelete.findIndex(cart => {
            return cart.id == id
        })

        state.cart = [...currentCartToDelete.slice(0, indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)]
        state.totalAmount = totals(state.cart).amount
        state.totalQuantity = totals(state.cart).qty
    },
    'UPDATE_CART'(state, payload){
        state.cart = payload

        state.totalAmount = totals(payload).amount
        state.totalQuantity = totals(payload).qty
    }, 
    'CART_EMPTY'(state){
        state.cart = []
        state.totalAmount = 0
        state.totalQuantity = 0
    },
    'SET_SERIAL_NUMBER'(state, serialNumber) {
        state.serialNumber = serialNumber;
    },
    'SET_FORM_ERROR'(state, error) {
        state.formError = error;
    },
    'SET_IS_LOGGED_IN'(state, status) {
        state.isLoggedIn = status;
    }
};

const actions = {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit({ commit }, {req}){
        if(req.session && req.session.authUser){
            commit('SET_USER', req.session.authUser)
        }
    },
    async login ({ commit }, {username, password}) {
        try {
            const { data } = await axios.post('/api/login', {username, password})
            commit('SET_USER', data)
        } catch (error) {
            if(error.response && error.response.status === 401){
                throw new Error('Wrong credentials!')
            }
            throw error
        }
    },

    async logout({ commit }) {
        await axios.post('/api/logout')
        commit('SET_USER', null)
    },

    addToCart({ commit }, payload){
        commit('ADD_TO_CART', payload)
    },

    deleteCart({ commit }, id){
        commit('DELETE_CART', id)
    },

    updateCart({ commit }, payload){
        // console.log(payload.unit)
        const currentCartToUpdate = payload.cart
        const indexToUpdate = currentCartToUpdate.findIndex(cart => {
            return cart.id == payload.id
        })

        const newCart = {
            ...currentCartToUpdate[indexToUpdate],
            quantity: currentCartToUpdate[indexToUpdate].quantity + payload.unit
        }

        // console.log(newCart)

        const cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCart, ...currentCartToUpdate.slice(indexToUpdate + 1)]
        commit('UPDATE_CART', cartUpdate)
    }, 
    cartEmpty({commit}){
        commit('CART_EMPTY')
    },
    async refreshAccessToken({ commit }) {
        const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');
        try {
            const response = await apiClient.post('/auth/refresh', { refreshToken });
            const newAccessToken = response.data.accessToken;
            const newAccessTokenExpiration = response.data.accessTokenExpiration;

            sessionStorage.setItem('JWT_TOKEN', newAccessToken);
            sessionStorage.setItem('ACCESS_TOKEN_EXPIRATION', newAccessTokenExpiration);

            console.log('Access Token refreshed successfully:', newAccessToken);
            commit('SET_IS_LOGGED_IN', true);
        } catch (error) {
            console.error('Failed to refresh access token:', error);
            commit('SET_FORM_ERROR', 'Failed to refresh access token. Please log in again.');
            commit('SET_IS_LOGGED_IN', false);
        }
    },
    async fetchProfile({ commit }) {
        try {
            const response = await apiClient.get('/auth/user-info');
            console.log('User info fetched successfully:', response.data);
            const serialNumber = response.data.data.serialNumber;
            commit('SET_SERIAL_NUMBER', serialNumber);
            console.log(serialNumber);
        } catch (error) {
            console.error('Error fetching user info:', error);
            commit('SET_FORM_ERROR', 'Failed to fetch user information.');
        }
    }
};

const getters = {
    cart(state){
        return state.cart
    },
    totalAmount(state){
        return state.totalAmount
    },
    totalQuantity(state){
        return state.totalQuantity
    },
    getOrders(state){
        return state.orders
    },
    getDeliveryStatusInKorean: () => (status) => {
        const deliveryStatusKoreanMap = {
          PENDING: '검수중',
          SHIPPING: '배송중',
          DELIVERED: '배송완료',
          RETURNING: '반품진행중',
          CANCELLED: '반품완료'
        };
        return deliveryStatusKoreanMap[status] || '알 수 없음';
      },
      formatDate: () => (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      serialNumber(state) {
        return state.serialNumber;
    }
};

export default{
    state, mutations, actions, getters
};