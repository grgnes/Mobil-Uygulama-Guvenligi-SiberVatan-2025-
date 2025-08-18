Java.perform(() => {

    var addr = Module.findExportByName('libfrida0xb.so', 'Java_com_ad2001_frida0xb_MainActivity_getFlag');
    if(addr){
        Memory.protect(addr.add(23), 7, 'rwx');
        addr.add(23).writeByteArray([0x81, 0x7d, 0xdc, 0x39, 0x05, 0x00, 0x00]);
        console.log("addr: " + addr);

        console.log("intruction is overwritten");
    }
});