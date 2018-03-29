export namespace Environment {
	// Set your app configurations here.
	// For the list of config options, please refer to https://ionicframework.com/docs/api/config/Config/
	export const config = {
		mode: "ios", //App's style is custom-designed based on iOS style, removing or changing this WILL MAKE THE APP LOOK BAD.
		menuType: "overlay"
	};
	// Set language to use.
	export const language = "en";
	// Firebase Cloud Messaging Server Key.
	// Get your gcmKey on https://console.firebase.google.com, under Overview -> Project Settings -> Cloud Messaging.
	// This is needed to send push notifications.
	export const gcmKey =
		"AAAAW63DFKs:APA91bG3cNKXAIXte89kelXUmvt08lkCeUcSxyKNXHf90jNoc4nyCnzr8VMFXtmwzEi4OS4LNFmC5sT6g-VSKDIn8t5FJt3D3pDkkK3Ckc4Uy-Z2I5wwMx1XpM5Pm65UiOjXS_xfyR1d";
	// Set to your Firebase app, you can find your credentials on Firebase app console -> Add Web App.
	export const firebase = {
		apiKey: "AIzaSyDI22hmtv2clf3WYdo2y04z_h-eCfbv_F4",
		authDomain: "huggable-9e981.firebaseapp.com",
		databaseURL: "https://huggable-9e981.firebaseio.com",
		projectId: "huggable-9e981",
		storageBucket: "huggable-9e981.appspot.com",
		messagingSenderId: "272489685620"
	};
	// You can find your googleWebClientId on your Firebase app console -> Authentication -> Sign-in Method -> Google -> Web client ID
	export const googleWebClientId: string =
		"272489685620-8mgrbcfgbbgaj0jt80tentihikle7e97.apps.googleusercontent.com";
	// Loading Configuration.
	// Please refer to the official Loading documentation here: https://ionicframework.com/docs/api/components/loading/LoadingController/
	export const loading = {
		spinner: "circles"
	};
	// Toast Configuration.
	// Please refer to the official Toast documentation here: https://ionicframework.com/docs/api/components/toast/ToastController/
	export const toast = {
		position: "bottom" // Position of Toast, top, middle, or bottom.
	};
	export const toastDuration = 5000; // Duration (in milliseconds) of how long toast messages should show before they are hidden.
}
