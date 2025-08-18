Java.perform(function () {
    var MainActivity = Java.use("com.ad2001.frida0x8.MainActivity");

    MainActivity.cmpstr.implementation = function (str) {
        console.log("[*] cmpstr çağrıldı, input: " + str);
        var result = this.cmpstr(str);
        console.log("[*] Dönen değer: " + result);
        return result;
    };
});
