export default function NumberDetection(num){
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
    } else if(parseInt(numInt) > 1){
        // 74,666,956.062,465
        // 290,120,656.4,810,759
        return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
};