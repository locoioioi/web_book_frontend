
const formatNum = (x : number | undefined) => {
    if (x == undefined) {
        return 0;
    }
    if (isNaN(x!)) {
        return 0;
    }
    // use toLocalString
    return x!.toLocaleString("vi-VN");
}

export default formatNum;