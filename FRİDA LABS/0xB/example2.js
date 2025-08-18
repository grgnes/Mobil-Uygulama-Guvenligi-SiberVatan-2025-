Java.perform(()=> {

    var addr = Module.findExportByName('libfrida0xb.so', 'Java_com_ad2001_frida0xb_MainActivity_getFlag');
    Memory.protect(addr.add(23), 13, 'rwx');
    var writer = new X86Writer(addr.add(23));
    writer.putNopPadding(13);
    writer.flush();
    writer.dispose();
    console.log('intruction is overwritten');

});