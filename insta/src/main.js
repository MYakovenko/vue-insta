import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './containers/Home.vue';
import PictureInfo from './components/pictureInfo.vue';
import { store } from './store';

Vue.use(VueRouter);

const routes = [
	{
		name: 'home',
		path: '/',
		component: Home
	},
	{
		name: 'pictureInfo',
		path: '/item/:id',
		component: PictureInfo,
		props: true
	}
];

const router = new VueRouter({
	routes,
	mode: 'history'
});

new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App)
});
