function zFill(a, n) {
    let num = a.toString()
    while(num.length < n) num = `0${num}`
    return num
}

module.exports.zFill = zFill