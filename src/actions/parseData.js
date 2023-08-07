import cheerio from 'cheerio'

export function parseData(page, needHeader = true) {
    let tableHeader = []
    let qsos = []
    tableHeader = []
    const $ = cheerio.load(page)

    //header
    needHeader && $('.bar0').find('td').each((index, item) => {
        const headText = $(item).text().trim()
        if (headText !== '') {
            tableHeader.push(headText.replace('\n'))
        }
    })

    //rowsData
    $('.qso').each((index, item) => {
        let qso = []
        $(item).find('td').each((i, el) => {
            if (i !== 0) {
                qso.push($(el).text().trim())
            }
        })
        qsos.push(qso)
    })
    // console.log(qsos);
    return needHeader ? [tableHeader, ...qsos] : qsos

}

