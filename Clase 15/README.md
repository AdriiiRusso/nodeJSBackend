# Clase 15
## Se realizó con pm2 ya que este por parámetro permite recibir si se desea que sea modo fork o modo cluster.

### Generamos 4 clusters en 8082, 8083, 8084 y 8085:
```console
PS C:\Users\Adrian\Desktop\nodeJSBackend-main\Clase 15> pm2 start ./src/server.js --name="Cluster1" --watch -i 2  -- -p 8082
[...]
PS C:\Users\Adrian\Desktop\nodeJSBackend-main\Clase 15> pm2 start ./src/server.js --name="Cluster2" --watch -i 2  -- -p 8083
[...]
PS C:\Users\Adrian\Desktop\nodeJSBackend-main\Clase 15> pm2 start ./src/server.js --name="Cluster3" --watch -i 2  -- -p 8084
[...]
PS C:\Users\Adrian\Desktop\nodeJSBackend-main\Clase 15> pm2 start ./src/server.js --name="Cluster4" --watch -i 2  -- -p 8085
[...]
```

### Prueba:
```console
PS C:\Users\Adrian\Desktop\nodeJSBackend-main\Clase 15> pm2 list
┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ Cluster1         │ default     │ 1.0.0   │ cluster │ 17066    │ 48s    │ 1    │ online    │ 0%       │ 70.0mb   │ Adrian   │ enabled  │
│ 1   │ Cluster1         │ default     │ 1.0.0   │ cluster │ 17072    │ 48s    │ 1    │ online    │ 0%       │ 70.2mb   │ Adrian   │ enabled  │
│ 2   │ Cluster2         │ default     │ 1.0.0   │ cluster │ 17084    │ 48s    │ 1    │ online    │ 0%       │ 69.5mb   │ Adrian   │ enabled  │
│ 3   │ Cluster2         │ default     │ 1.0.0   │ cluster │ 17078    │ 48s    │ 1    │ online    │ 0%       │ 69.6mb   │ Adrian   │ enabled  │
│ 4   │ Cluster3         │ default     │ 1.0.0   │ cluster │ 17259    │ 37s    │ 0    │ online    │ 0%       │ 70.6mb   │ Adrian   │ enabled  │
│ 5   │ Cluster3         │ default     │ 1.0.0   │ cluster │ 17266    │ 37s    │ 0    │ online    │ 0%       │ 70.7mb   │ Adrian   │ enabled  │
│ 6   │ Cluster4         │ default     │ 1.0.0   │ cluster │ 17368    │ 30s    │ 0    │ online    │ 0%       │ 70.5mb   │ Adrian   │ enabled  │
│ 7   │ Cluster4         │ default     │ 1.0.0   │ cluster │ 17375    │ 30s    │ 0    │ online    │ 0%       │ 71.1mb   │ Adrian   │ enabled  │
└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

Hay que editar el archivo de configuración de NGINX para redigir cuando se ingrese a /test/random vaya a /test/randoms de los servidores creados anteriormente.

### Donde se encuentra el archivo de configuración:
```console
PS C:\> cd C:\nginx\conf
```

### Editando el nginx.conf para dejarlo de la siguiente manera:
```console
events {
}

http {

    upstream backend {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }
    server {
        listen 8080;
        location /test/random/ {
            proxy_pass http://backend/test/randoms/;
        }
    }

}
```

### Se chequea que la configuración sea correcta:
```console
PS C:\nginx> .\nginx.exe -t
nginx: the configuration file C:\nginx/conf/nginx.conf syntax is ok
nginx: configuration file C:\nginx/conf/nginx.conf test is successful
```

### Se frena y vuelve a prender el servicio:
```console
PS C:\nginx> .\nginx.exe -s stop
PS C:\nginx> .\nginx.exe
```

Se puede acceder a través de http://localhost:8080/test/random/

### Log cuando se genera la lista:
```console
PS C:\nginx> pm2 monit

┌─ Process List ───────────────────────┐┌──  Cluster3 Logs  ─────────────────────────────────────────────────────────────────────────┐
│[ 0] Cluster1          Mem:  69 MB    ││ Cluster3 > Test OK                                                                         │
│[ 1] Cluster1          Mem:  71 MB    ││                                                                                            │
│[ 2] Cluster2          Mem:  69 MB    ││                                                                                            │
│[ 3] Cluster2          Mem:  70 MB    ││                                                                                            │
│[ 4] Cluster3          Mem:  71 MB    ││                                                                                            │
│[ 5] Cluster3          Mem:  70 MB    ││                                                                                            │
│[ 6] Cluster4          Mem:  69 MB    ││                                                                                            │
│[ 7] Cluster4          Mem:  72 MB    ││                                                                                            │
│                                      ││                                                                                            │
│                                      ││                                                                                            │
└──────────────────────────────────────┴┴────────────────────────────────────────────────────────────────────────────────────────────┘
```