import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		searchText: '',
		photos: [],
		loading: false,
		imageUrl: '',
		imageInfo: {},
		recentPhoto: [],
		favorites: []
	},
	getters: {
		cleanImages: (state) => state.photos.filter((photo) => photo.url_n)
	},
	mutations: {
		loading(state) {
			state.loading = true;
		},
		updateInput(state, searchText) {
			state.searchText = searchText;
		},
		updatePictures(state, value) {
			state.photos = value;
		},
		updateFavorites(state, value) {
			state.favorites = value;
		},
		getPictures(state, data) {
			state.photos = data.filter((photo) => photo.url_n);
			state.loading = false;
		},
		getImageUrl(state, data) {
			const sizes = data.data.sizes.size;
			const url = sizes.filter((s) => s.label === 'Large' || s.label === 'Original')[0].source;
			state.imageUrl = url;
			state.loading = false;
		},
		getImageInfo(state, data) {
			const imageInfo = data.data.photo;
			state.imageInfo = imageInfo;
			state.loading = false;
		},
		getRecentPhoto(state, data) {
			console.log('recent', data);
			state.recentPhoto = data.data.photos.photo;
			state.loading = false;
		}
	},
	actions: {
		getPictures({ commit }, text) {
			return axios({
				method: 'get',
				url: 'https://api.flickr.com/services/rest',
				params: {
					api_key: '1bf71de06a011be4e12a11d22182266f',
					format: 'json',
					nojsoncallback: 1,
					method: `flickr.photos.search`,
					text: text === '' ? 'popular' : text,
					extras: 'url_n, owner_name, description, date_taken, views',
					page: 1,
					per_page: 30
				}
			}).then((response) => commit('getPictures', response.data.photos.photo));
		},
		getImageUrl({ commit }, id) {
			return axios({
				method: 'get',
				url: 'https://api.flickr.com/services/rest',
				params: {
					api_key: '1bf71de06a011be4e12a11d22182266f',
					format: 'json',
					nojsoncallback: 1,
					method: `flickr.photos.getSizes`,
					photo_id: id
				}
			}).then((response) => commit('getImageUrl', response));
		},
		getImageInfo({ commit }, id) {
			return axios({
				method: 'get',
				url: 'https://api.flickr.com/services/rest',
				params: {
					api_key: '1bf71de06a011be4e12a11d22182266f',
					format: 'json',
					nojsoncallback: 1,
					method: `flickr.photos.getInfo`,
					photo_id: id
				}
			}).then((response) => commit('getImageInfo', response));
		},
		getRecentPhoto({ commit }) {
			return axios({
				method: 'get',
				url: 'https://api.flickr.com/services/rest',
				params: {
					api_key: '1bf71de06a011be4e12a11d22182266f',
					format: 'json',
					nojsoncallback: 1,
					method: `flickr.photos.getRecent`,
					extras: 'url_n, owner_name, description, date_taken, views',
					page: 1,
					per_page: 3
				}
			}).then((response) => commit('getRecentPhoto', response));
		}
	}
});
