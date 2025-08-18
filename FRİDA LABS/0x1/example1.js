// frida ile r5 değerini bulmak
Java.perform(function (){

    var MainActivity = Java.use("com.ad2001.frida0x1.MainActivity");

    MainActivity.check.implementation = function(r4, r5) {
        console.log("Kullanıcıdan gelen r4: "+ r4);
        console.log("Kod içindeki r5: "+ r5);
        return this.check(r4, r5);

    };

});

