Java.perform(function(){
    var func =  Module.findExportByName("libfrida0xa.so", "_Z8get_flagii");
    if(func){
       var addr = new NativeFunction(func, 'void', ['int', 'int']);
       addr(2,1);
       console.log("loglandı");
    }
})