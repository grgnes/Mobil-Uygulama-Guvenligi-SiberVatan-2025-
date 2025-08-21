Java.perform(function(){
    
    var Checker = Java.use("com.ad2001.frida0x3.Checker");
    for (var i = 1; i <= 256; i++) {
        console.log("increase() metodu"+i+ ".kez çağırıldı");
        Checker.increase();
    }
});
