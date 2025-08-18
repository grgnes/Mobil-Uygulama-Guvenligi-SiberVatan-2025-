Java.perform(function () {
    Java.choose("com.ad2001.frida0x6.MainActivity", {
        onMatch: function (instance) {
            var Checker = Java.use("com.ad2001.frida0x6.Checker");
            var checkerInstance = Checker.$new();  
            checkerInstance.num1.value = 1234;
            checkerInstance.num2.value = 4321;
            instance.get_flag(checkerInstance);

        },
        onComplete: function () {
        }
    });
});
