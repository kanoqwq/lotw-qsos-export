import { exportToXlsx } from './actions/exportToxlsx.js'
import { parseData } from './actions/parseData.js'
import { fetchData } from './utils/fetch.js'
import { login } from './actions/login.js'
import { logout } from './actions/logout.js'
import { configs } from './utils/config.js'

//input your user info in .env file
const loginData = {
    login: configs.LOTW_USER,
    password: configs.LOTW_PWD
}

// logout().then(() => {
const resultDataArray = []

login(loginData).then(async (headers) => {
    if (!headers) {
        console.log('login failed!');
        return null;
    }
    await getQsos({ headers, url: 'https://lotw.arrl.org/lotwuser/qsos?qso_query=1&awg_id=&ac_acct=&qso_callsign=&qso_owncall=&qso_startdate=&qso_starttime=&qso_enddate=&qso_endtime=&qso_mode=&qso_band=&qso_dxcc=&qso_sort=QSO+Date&qso_descend=yes&acct_sel=%3B' })
    // console.log(resultDataArray);
    exportToXlsx({ arrayData: resultDataArray })
})

// })

const getQsos = async ({ headers, url }, deps = 1) => {
    //find cookie
    const cookie = headers.getSetCookie()[0]
    //page1
    const res = await fetchData({
        url,
        headers: {
            'Cookie': cookie
        }
    })

    if (res.ok) {
        const data = await res.text()
        const resData = deps == 1 ? parseData(data) : parseData(data, false)
        resultDataArray.push(...resData)
        if (resData.length) {
            console.log(`fetch page ${deps}...`);
            await getQsos({
                url: 'https://lotw.arrl.org/lotwuser/qsos?qso_page=' + deps + '&awg_id=&ac_acct=',
                headers
            }, deps + 1)
        }
    }


}


