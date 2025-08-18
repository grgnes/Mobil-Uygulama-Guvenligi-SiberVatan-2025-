//vscode dan çağırınca çalışıyor

Java.perform(() => {
    var libName = "liba0x9.so";
    var funcName = "Java_com_ad2001_a0x9_MainActivity_check_1flag";

    var timer = setInterval(() => {
        try {
            var func = Module.findExportByName(libName, funcName);
            if (func) {
                clearInterval(timer);
                console.log("[*] Fonksiyon bulundu: " + func);
                Interceptor.attach(func, {
                    onEnter: function (args) {
                        console.log("[*] check_flag fonksiyonu çağrıldı.");
                    },
                    onLeave: function (retVal) {
                        console.log("[*] Mevcut dönüş: " + retVal);
                        retVal.replace(1337);
                        console.log("[*] Değiştirildi: 1337");
                    }
                });
            }
        } catch (e) {
            // modül hala yüklenmemişse buraya düşer
        }
    }, 100);
});
