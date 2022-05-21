const getYMD=(data)=>{
    let y=data.getFullYear();
    let m=data.getMonth();
    let d=data.getDate();
    return {y,m,d}
}

const getDate=(y,m,d)=>{
    return new Date(y,m,d)

}
export{
    getYMD,
    getDate
}