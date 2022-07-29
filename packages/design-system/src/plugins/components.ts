import Vue from "vue";
import N8nButton from "../components/N8nButton";


export default {
	install: (app: typeof Vue, options?: any) => {
		app.component('n8n-button', N8nButton);
	}
}
