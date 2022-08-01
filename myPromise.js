
const PENDING = 'pending' //等待
const FULFILLED = 'fulfilled' //成功
const REJECTED = 'rejected' //失败



class myPromise {
    constructor (executor){
        executor(this.resolve,this.reject)  //立即执行 （promise 不可取消）
    }
    result = undefined //成功结果
    reason = undefined //失败结果 
    status = PENDING
    successBack = []
    failBack = []
    resolve = result => {
        if(this.status !== PENDING) return
        this.status = FULFILLED
        this.result = result
        // this.successBack && this.successBack(this.result)
        while (this.successBack.length>0)  this.successBack.shift()(this.result)
    }
    reject = reason => {
        if(this.status !== PENDING) return
        this.status = REJECTED
        this.reason = reason
        while (this.failBack.length>0)  this.failBack.shift()(this.reason)
        // this.failBack && this.failBack(this.reason)
    }
    then (successBack,failBack) {
        if(this.status === FULFILLED){
            successBack(this.result)
        }else if(this.status === REJECTED){
            failBack(this.reason)
        }else {
            this.successBack.push(successBack) 
            this.failBack.push(failBack)
        }
    }
}


let person = new myPromise((resolve, reject) => {
    setTimeout(()=>{
        resolve('ok')
    },2000)
 })

 person.then(res=>{
    console.log(1)
    console.log(res)
 })

