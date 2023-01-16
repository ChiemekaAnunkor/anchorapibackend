var xl = require('excel4node');
const testData = [{ name: "meee", color: "reds", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" }, { name: "chris", color: "red", some: "lol", red: "lol", small: "eeee" },]
const axios = require("axios")
const flatten = require("flat")
// Create a new instance of a Workbook class
function generateExcel(data) {
    var wb = new xl.Workbook();

    // Add Worksheets to the workbook
    var ws = wb.addWorksheet('Sheet 1');
    var ws2 = wb.addWorksheet('Sheet 2');

    // Create a reusable style
    var style = wb.createStyle({
        font: {
            color: '#000103',
            size: 12,
        }
    });

    //make an array of all the titles we want to use to make our heading.
    const keys = Object.keys(data[0])

    //makes an array of all the values similar to the keys
    let values = []
    data.forEach((el) => {
        values.push(...Object.values(el))
    })


    let titleCount = 1
    let colCount = 2
    let rowCount = 1
    let arrPosition = keys.length
    /// loops throught and adds each item and increament the spaces 
    for (let j = 0; j < keys.length; j++) {
        ws.cell(1, titleCount).string(keys[j])

        for (let i = 0; i < values.length; i++) {
            if (i % arrPosition === 0) {
                ws.cell(colCount, rowCount).string(values[i]).style(style)
                colCount++
            };

        }
        colCount = 2
        titleCount++
        rowCount++
        values.shift()
    }




    //change this depending on where you want to be built/ where you put the data
    wb.write('../client/src/assets/Excel.xlsx');
}



module.exports = generateExcel
