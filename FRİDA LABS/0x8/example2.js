var strcmp_addr = Module.findExportByName(null, "strcmp");
if (strcmp_addr) {
    Interceptor.attach(strcmp_addr, {
        onEnter: function (args) {
            if (args[0].readCString().includes("hello")) {
                console.log(args[1].readCString());
            }
        },
        onLeave: function (retval) {
            return retval;
        }
    });
}
