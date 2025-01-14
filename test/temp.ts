

function fun(){
    try{
        return 1
    }catch(err){
        return 2
    }finally {
        return  3
    }
}

console.log(fun());