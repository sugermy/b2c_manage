import axios from 'axios'
export default{
    $ajax:function(){
        var p=new Promise((resove,reject)=>{
            if(true){
                resove('success')
            }else{
                resove('fail')
            }
        })
        return p
    }
}


