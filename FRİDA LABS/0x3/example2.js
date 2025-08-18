Java.perform(function(){
    var TextView = Java.use("android.widget.TextView");
    TextView.setText.overload('java.lang.CharSequence').implementation = function(str) {
        console.log("[FLAG] " + str);
        return this.setText(str);
    };

    var Checker = Java.use("com.ad2001.frida0x3.Checker");
    for (var i = 1; i <= 256; i++) {
        Checker.increase();
    }
});
