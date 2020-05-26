import env from "../env";
export default function ({$axios, redirect}) {
    if (process.server) {
        $axios.setBaseURL("http://localhost:3000/api");
    }
    if (process.client) {
        $axios.setBaseURL(`${env.apiDomain}/api`);
    }
}
