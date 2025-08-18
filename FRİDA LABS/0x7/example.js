Java.perform(function(){

    Java.choose("com.ad2001.frida0x7.MainActivity" ,{
        onMatch: function(instance) {
            var Checker = Java.use("com.ad2001.frida0x7.Checker")
            var ch = Checker.$new(513,513);
            instance.flag(ch);
        },
        onComplete: function(){}
    });

});