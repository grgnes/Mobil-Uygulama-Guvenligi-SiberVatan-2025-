// terminale yapıştırınca

Java.perform(() => {

    var func = Module.findExportByName('liba0x9.so', 'Java_com_ad2001_a0x9_MainActivity_check_1flag')
    if (func){
        Interceptor.attach(func, {
            onEnter(args){
                console.log("[*] check_flag fonksiyonu çağrıldı.");
            },
            onLeave(retVal){
                    console.log("[*] Mevcut dönüş: " + retVal);
                    retVal.replace(1337);
                    console.log("[*] Değiştirildi: 1337");
            },
        })
    }
    
});