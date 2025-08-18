Java.perform(function () {

    var TextView = Java.use("android.widget.TextView");
    TextView.setText.overload('java.lang.CharSequence').implementation = function (str) {
        console.log("[FLAG] " + str);
        return this.setText(str);
    };

    var Check = Java.use("com.ad2001.frida0x4.Check");
    var checkInstance = Check.$new(); // yeni bir nesne oluştur
    var result = checkInstance.get_flag(1337); // get_flag metodunu çağır

    console.log("[RESULT] " + result); // şifre çözülmüş sonucu konsola yaz

});
