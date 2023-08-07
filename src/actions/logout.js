import {fetchData} from "../utils/fetch.js";
export async function logout() {
    const res = await fetchData({ url: "https://lotw.arrl.org/lotwuser/default?logout=1" })
    const textRes = await res.text()
    if (textRes) {
        console.log('logout success');
    }
}