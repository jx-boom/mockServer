class Vgroup {
    constructor(group) {
        this.group = group;
        this.groupKeyList=[];
    }
    setGroup (group){
       this.group = group;
       this.groupKeyList=[];
       for(var  key in group){
           this.groupKeyList.push(key)
       }
   }
    getOne(key,fn){
        fn(this.group[key]?this.group[key]:{});
   }
   deleteOne(key,fn){
        delete this.group[key];
        for(var i=0,l=this.groupKeyList.length;i<l;i++){
            if(this.groupKeyList[i]==key){
                this.groupKeyList.splice(i,1)
                break
            }
        }
        fn()
   }
    setOne(key,val,fn){
        if(!this.group[key]){
            this.groupKeyList.push(key)
        }
        this.group[key]=JSON.parse(val);
        fn()
    }
    getList(fn){
    fn(this.groupKeyList);

   }
    groups (){
        return this.groups
   }
}
var groups = new Vgroup();
module.exports = groups;
