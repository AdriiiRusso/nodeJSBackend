# Clase 17
Deploy de app en: https://coderhousenodejsbackend.herokuapp.com/

Para poder desplegar en Heroku tuve que:
1. Dejar de utilizar MongoDB local y utilizar MongoDB Atlas.
2. Cambiar la key **MONGODB** en **.env**.
3. No hardcodear el puerto en el *index.js*.
4. Cambiar el script **start** en el *package.json*.
5. Habilitar en MongoDB Atlas a todas las IPs.