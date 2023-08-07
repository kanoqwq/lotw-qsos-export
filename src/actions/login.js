import cheerio from 'cheerio'
import { fetchData } from '../utils/fetch.js';

export async function login(loginData) {
    //addtional params
    loginData = {
        ...loginData,
        thisForm: 'login'
    }

    //parse object to formBody
    const formBody = Object.keys(loginData).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(loginData[key])).join('&');

    const res = await fetchData({
        url: 'https://lotw.arrl.org/lotwuser/qsos',
        method: 'post',
        body: formBody,
        headers: { 'Content-type': "application/x-www-form-urlencoded" }
    })

    if (res.ok) {
        const resData = await res.text()

        if (res.headers.getSetCookie()[0]) {
            // console.log(resData);
            const $ = cheerio.load(resData)
            $('.userhead td').each((index, item) => {
                let text = $(item).text().trim()
                if (text !== '' && !($(item).find('a').prop('href'))) {
                    console.log(text);
                }
            })
            return res.headers
        }
    }
    return null
}