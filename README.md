# 2025 SİBERVATAN MOBİL UYGULAMA GÜVENLİĞİ NOTLARI

Eğitim sürecinde kullandığımız tüm lablar ve eğitim içeriği bu repository de toplanmıştır. 

## Frida API

### Frida’nın cihaza kurulumu :

Not: Cihazda python kurulu olmalı

```powershell
> pip3 install frida 16.2.1
```

```powershell
> pip3 install frida-tools 16.2.1
```

### Android cihaz için kurulum :

1. [frida.re](http://frida.re) sayfasına gidilir, tutorials ‘tan android kısmındaki maddeleri takibe başlanır.
2.  Frida-server kurulumu için https://github.com/frida/frida/releases dan cihaza uygun sürüm indirilir.

![image.png](attachment:21531a3e-021d-4ccd-9e18-c4cf81d19e1f:image.png)

1. Cihaza uygun sürüm bulunur.

```powershell
> adb shell getprop ro.product.cpu.abi
```

1. Uygun olan sürüm dosyası indirildikten sonra indirilen sıkıştırılmış dosya halinden kurtarılır ve adı düzenlenilir.

```powershell
> mv .\frida-server-16.2.1-android-x86 frida-server
```

1. Indirilen dosya mobil cihaza gönderilir.

```powershell
> adb push frida-server /data/local/tmp
```

1. frida-server dosyasını çalıştırılabilir hale getirilir

```powershell
> adb shell 
$ su
# chmod +x /data/local/tmp/frida-server
```

1. Sunucu başlatılır.

```powershell
# /data/local/tmp/frida-server&
```

### **Frida Client Komutları / Frida Tools**

- **frida-ps**

frida’nın bağlı olup olmadığını ve cihazdaki sistem uygulamaları/kullanıcıları listeler.

- **frida-ps -U**

Cihazdaki çalışan processleri ,USB veya emülatör ile bağlı cihazdaki (Android/iOS) kullanıcı uygulamalarını listeler.

- **frida-ps -Ua**

Cihazdaki çalışan uygulamaları, bağlı cihazdaki kullanıcı + arka plan uygulamalarını listeler.

- **frida-ps -Uai**

Bağlı cihazdaki tüm yüklü uygulamaları (sistem uygulamaları dahil) listeler.

- **frida-ls-devices**

Bilgisayardaki açık olan cihazları listeler.

- **frida-ps -D  cihazAdı  -ai**

Istenilen cihazdaki işlemleri gösterir .

- **frida -U <paketAdı>**

Çalışan uygulamaya bağlanarak Frida CLI'yi başlatır.

- adb shell pm list packages

Paket adı alınır.

- **frida -U -n <paketAdı>**

Çalışan bir uygulamaya bağlanır.

- **frida -U -f <paketAdı>**

Uygulamayı başlatır ve bağlanır.

- **frida -U -p <PID>**

Uygulamaya PID ile bağlanır.

- adb shell pidof **<paketAdı>**

Paketin pid i bulunur.

### Frida'nın Farklı Kullanım ve Analiz Yöntemleri

### **1. ptrace()**

- ptrace(), Linux sistem çağrısıdır ve bir sürecin başka bir süreci izlemesine veya kontrol etmesine izin verir.
- Frida'da doğrudan bir modül olarak bulunmaz ama anti-debug korumalarını atlatmak için kullanılır.
- Uygulamalar bazen ptrace() kullanarak kendilerini analiz edilmekten korurlar (örneğin `ptrace(PTRACE_TRACEME, 0, 0, 0)` ile).
- Frida ile çalışırken anti-debug mekanizmalarını atlatmak için ptrace patching (yama) yapabiliriz.

### **2. Frida Gadget**

- Root/Jailbreak gerekmeyen Frida kullanım şeklidir.
- Uygulamayı decompile edip içerisine gadget ekleyerek Frida'yı içine gömeriz.
- Özellikle kapalı sistemlerde (root'suz telefonlar gibi) kullanılır.

### **3.** Frida Trace

- Frida'nın API çağrılarını dinlemek için kullandığı bir araçtır.
- Örneğin, bir Android uygulamasında `open()`, `read()`, `write()`, `send()`, `recv()` gibi fonksiyonları izlemek için kullanılır.
- Şu şekilde başlatılır:
    
    ```powershell
    frida -U -n com.example.app -i open
    ```
    
    Bu komut, `open()` sistem çağrısını izler ve hangi dosyaların açıldığını gösterir.
    
- Dinamik analiz yapmak için güçlü bir araçtır.
