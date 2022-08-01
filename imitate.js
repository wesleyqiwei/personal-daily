
/**
 * 
 * @param {*} fn callback
 * @returns 
 */
const PersonMap = function (fn) {
    const mapRes = []
    for (let i = 0;i<this.length; i++){
        fn(this[i],i) && mapRes.push(fn(this[i],i))
    }
    return mapRes
}

Array.prototype.PersonMap = PersonMap


/**
 * 
 * @param {*} fn 
 * @returns 
 */
const PersonCurry = (fn) => {

    return function curryHandle (...arg) {

        if(fn.length > arg.length){
            
            return function(){
                curryHandle(...[...arg,...arguments])
            }
        }

        return fn(...arg)
    }

}
