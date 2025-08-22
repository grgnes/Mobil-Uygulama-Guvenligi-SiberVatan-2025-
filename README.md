# SiberVatan Mobil Uygulama Güvenliği Ders Notları 

Eğitim sürecinde kullandığımız tüm lablar ve eğitim içeriği bu repository de toplanmıştır. 

## Frida API

### Frida’nın cihaza kurulumu :

Not: Cihazda python kurulu olmalı

```powershell
> pip3 install frida 16.2.1
```

```powershell
> pip3 install frida-tools 12.1.1
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

- ps | grep frida-server,  `netstat -tulpn | grep 27042` ,  pkill frida

Pid numarasını verir.

### Frida'nın Kullanım ve Analiz Yöntemleri

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
- Class/metodları **runtime’da izler**, çağrıldığında loglar, ve handler dosyaları oluşturur.
- Şu şekilde başlatılır:
    
    ```powershell
    frida-trace -U -j "com.byterialab.challenge0x1.MainActivity!*" Challenge0x1
    ```
    

Yapısı: 

frida-trace -U -j “PackageName.ClassName!MethodName” ApplicationName

### 4. Objection

- F**rida’yı arka planda kullanan** bir mobil güvenlik test aracıdır.
- Android (ve iOS) uygulamalarını **runtime**’da (çalışırken) incelemeye ve manipüle etmeye yarar

Neler yapılabilir?

Sertifika pinning yapan uygulamalar kolayca kandırabilir.

```powershell
android sslpinning disable
```

Uygulama root tespitini geçersiz kılabilir.

```powershell
android root disable
```

Class’ları, method’ları listeleyebilir.

```powershell
android hooking list classes
```

Activity’ler listeyebilir.

```powershell
android hooking list activity
```