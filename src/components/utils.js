export function truncateAddress(address){
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};
  
export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};


export function timeConverter(timestamp){
  const a = new Date(timestamp * 1000);
  const year = a.getFullYear();
  const month = (a.getMonth() + 1).toString().padStart(2, "0");
  const day = a.getDate().toString().padStart(2, "0");
  const hour = a.getHours().toString().padStart(2, "0");
  const min = a.getMinutes().toString().padStart(2, "0");
  const sec = a.getSeconds().toString().padStart(2, "0");
  const dateObj = `${day}-${month}-${year} - ${hour}:${min}:${sec}`;
  return dateObj;
};

export function numberFormat(num){
  let numInt = num.split('.')[0];
  let numFloat = num.split('.')[1];

  if(parseInt(numInt) < 1){
      if(numFloat.startsWith('0000000')){
          // 0.000000027
          return parseFloat(num).toFixed(9);
      } else {
          // 0.1483746
          // 0.0001927
          return parseFloat(num).toFixed(7);
      };
  } else if(parseInt(numInt) >= 1){
      // 74,666,956.062,465
      // 290,120,656.4,810,759
      return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
};