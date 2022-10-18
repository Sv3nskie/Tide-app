import Config from "../components/config";

const {baseUrl} = Config();

const api = baseUrl.local;

const header = {
    headers: {
        "Content-Type": "application/json",
    },
}


export async function getChart(data){
    const {address, resolution} = data;
    try{
        const res = await fetch(`${api}/api/chart?address=${address}&resolution=${resolution}`, {
            method: 'GET',
            header,
        });
        return await res.json();
    } catch(err){
        console.log(err)
    }
};


export async function tokenData(data){
    const {address} = data;
    const res = await fetch(`${api}/api/token?address=${address}`, {
        method: 'GET',
        header,
    });
    return await res.json();
};


export async function trades(data){
    const {address} = data;
    const res = await fetch(`${api}/api/trades?address=${address}`, {
        method: 'GET',
        header,
    });
    return await res.json();
};


export async function change(data){
    const {address} = data;
    const res = await fetch(`${api}/api/change?address=${address}`, {
        method: 'GET',
        header,
    });
    return await res.json();
};


export async function pairListData(){
    const res = await fetch(`${api}/api/tokenlistdata`, {
        method: 'POST',
        header,
        body: JSON.stringify()
    });
    return await res.json();
};

export async function calcPrice(from, to, amount, callback){
    fetch(`${baseUrl.local}/rpc/price?from=${from}&to=${to}&amount=${amount}`).then(res=>res.json()).then(res=>{
      callback(res);
    })
};