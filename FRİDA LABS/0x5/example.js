Java.perform(function () {

    var TextView = Java.use("android.widget.TextView");
    TextView.setText.overload('java.lang.CharSequence').implementation = function(str) {
        return this.setText(str);
    };

    Java.choose("com.ad2001.frida0x5.MainActivity", {
        onMatch: function (instance) {
            instance.flag(1337);  
        },
        onComplete: function () {}
    });

});
