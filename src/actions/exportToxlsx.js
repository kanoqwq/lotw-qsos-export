import XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'
const __dirname = path.resolve()
export function exportToXlsx({ arrayData, jsonData, output = path.join(__dirname, './QSO.xlsx') }) {
    let Sheet = (arrayData && XLSX.utils.aoa_to_sheet(arrayData)) || (jsonData && XLSX.utils.json_to_sheet(arrayData))
    let wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, Sheet, 'QSO列表')
    let buffer = XLSX.write(wb, {
        type: 'buffer',
        bookType: 'xlsx'
    })
    fs.writeFile(output, buffer, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("export success ");
            console.log("file in: " + output);
        }
    })
}