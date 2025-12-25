---
title: "Phishing Campaing PoC"
description: "technique PoC of a directed phishing campaign using GoPhish and Evilginx, aimed at obtaining initial access in a controlled environment"
date: "2025-10-27"
readTime: "17 min read"
image: "/assets/images/posts/phishing_campaing/cover.jpg"
slug: "phishing-ops-red-teaming"
author: "oscar lara"
---

# Phishing Campaing PoC

Phishing is still one of the **most effective vectors** to obtain initial access. Despite advances in technical controls, the human factor remains in the preferred entry point for many malicious actors. 

In this post I will explain a project carried out at the university, where I developed a *Proof of concept (PoC)* to emulate a real phishing operation to obtain valid credentials and session tokens without exploiting technical vulnerabilities 

## Tools and Infrastructure

Para la ejecución de la operación se utilizaron exclusivamente herramientas **open source** y ampliamente conocidas, lo que refuerza el realismo del escenario.

Por un lado, **GoPhish**, utilizado como plataforma de orquestación de campañas. Aunque el proyecto oficial no destaca por su mantenimiento activo, sigue siendo una herramienta muy potente y, precisamente por ser conocida, permite evaluar cómo responden los controles defensivos frente a técnicas habituales. En este caso se utilizó el fork mantenido por **Kuba Gretzky**, que añade mejoras útiles para integraciones posteriores.

Por otro lado, **Evilginx**, en su versión gratuita, utilizado para implementar un ataque de tipo *Adversary-in-the-Middle*. Evilginx permite capturar no solo credenciales, sino también sesiones y tokens, lo que lo convierte en una herramienta clave para simular compromisos modernos en entornos con MFA.

Ambas herramientas son accesibles, gratuitas y ampliamente documentadas, lo que demuestra que **no es necesario tooling exclusivo para ejecutar campañas realistas**.

---

## 3. Infraestructura desplegada

La infraestructura se mantuvo deliberadamente simple. No se buscó alta disponibilidad ni escalabilidad, sino estabilidad y bajo perfil.

Se desplegaron dos servidores independientes:

- Un servidor para GoPhish  
- Un servidor para Evilginx  

Ambos corriendo sobre Linux (Ubuntu 24.04), con recursos mínimos. No es necesario utilizar distribuciones especializadas como Kali; el rol de estos servidores es muy concreto y no requiere tooling adicional.

El proveedor cloud elegido fue **Linode (Akamai)** por simplicidad operativa, aunque este diseño es fácilmente replicable en AWS, Azure o cualquier otro proveedor. Es importante tener en cuenta que algunos proveedores bloquean tráfico SMTP saliente, por lo que este punto debe validarse antes del despliegue.

---

## 4. Registro del dominio y suplantación

Uno de los elementos más críticos de la operación fue el **registro del dominio**, realizado a través de **Namecheap**. La elección del dominio no es una cuestión estética ni secundaria; es uno de los factores que más influyen en la tasa de éxito del phishing.

En lugar de recurrir a typosquatting clásico, se optó por una estructura que explota la interpretación visual del dominio. Dominios que comienzan por cadenas como `com`, `net` u `org`, seguidas de separadores poco habituales, pueden inducir al usuario a interpretar incorrectamente la URL.

Un dominio del tipo:

agenciatributaria.com7g-alleta.xyz

puede ser leído mentalmente como:

agenciatributaria.com / g-alleta / ...


Este efecto es especialmente potente en correos electrónicos, donde el usuario rara vez analiza la estructura real del dominio. Además, este enfoque reduce la probabilidad de detección temprana por sistemas automáticos que buscan patrones de typosquatting evidentes.

El dominio no solo sirve para alojar el portal de phishing, sino que es **fundamental para el correo**. Direcciones como:

notificaciones@agenciatributaria.com7g-alleta.xyz


resultan mucho más creíbles que remitentes genéricos o dominios aleatorios. El usuario evalúa rápidamente quién parece enviar el correo, no la validez criptográfica del dominio.

---

## 5. Servicio SMTP y envío de correos

Para el envío de correos es imprescindible contar con un servicio SMTP funcional. Existen varias opciones: montar un servicio propio, utilizar proveedores externos como SendGrid o emplear cuentas con contraseñas de aplicación.

En esta PoC se optó por un **servicio SMTP externo con buena reputación**, lo que reduce problemas relacionados con listas negras, DULs y filtros corporativos. Este punto es especialmente relevante cuando el objetivo son correos empresariales, donde los controles suelen ser más estrictos.

Durante las fases de prueba, herramientas como **Mailhog** pueden resultar útiles para validar configuraciones antes de lanzar la campaña real.

---

## 6. Perfilado y diseño del ataque

Antes de enviar un solo correo, el trabajo más importante es el **perfilado**. Un phishing efectivo no comienza en GoPhish ni en Evilginx, sino en la fase de análisis del objetivo.

Es fundamental entender qué tipo de acceso se busca y qué usuarios son realmente valiosos. Comprometer al CEO puede ser llamativo, pero en muchos entornos un administrador de sistemas, un usuario con acceso VPN o un buzón compartido ofrecen mucho más valor operativo.

El OSINT juega un papel clave en esta fase: estructuras de correo, organigramas, lenguaje corporativo, firmas, horarios y patrones de comunicación. Todo esto influye directamente en la credibilidad del ataque.

---

## 7. Diseño del correo con GoPhish

Una vez realizado el perfilado, el diseño del correo es mucho más sencillo. GoPhish permite definir perfiles de envío, plantillas y campañas de forma muy flexible.

El correo debe parecer legítimo no solo en contenido, sino en forma. El uso de nombres reales de departamentos, firmas corporativas, disclaimers legales y lenguaje coherente con la organización aumenta significativamente la probabilidad de éxito.

El enlace incluido en el correo debe ser discreto. Textos genéricos como “Acceder al documento” o “Revisar notificación” suelen funcionar mejor que llamadas a la acción agresivas.

---

## 8. Portal de phishing con Evilginx

Evilginx se encarga de la parte más delicada de la operación: la interacción con el usuario y la captura de sesiones. La herramienta requiere cierta curva de aprendizaje inicial, pero una vez desplegada resulta relativamente sencilla de operar.

El elemento clave en Evilginx son los **phishlets**, que definen cómo se proxifica el servicio legítimo. Aunque existen muchos repositorios públicos, reutilizar phishlets sin modificaciones aumenta el riesgo de detección. Siempre que sea posible, es recomendable adaptarlos o desarrollar variantes propias.

En esta PoC se utilizó un phishlet orientado a servicios de Microsoft 365, lo que permitió capturar credenciales y tokens de sesión de forma transparente para el usuario.

---

## 9. OPSEC y evasión

Una operación de phishing no termina al lanzar la campaña. Es fundamental reducir la exposición innecesaria.

Evitar reutilizar plantillas, rotar subdominios, pausar servicios cuando no están en uso y controlar el acceso por IP o User-Agent son prácticas básicas de OPSEC. Exponer portales 24/7 solo facilita el trabajo a equipos de Threat Hunting.

Existen proyectos como **Sneaky Gophish** que ayudan a ocultar la infraestructura frente a escaneos masivos y monitorización automática, reduciendo el ruido generado por la campaña.

---

## 10. Ejecución y monitorización

Con la campaña lanzada, GoPhish permite monitorizar aperturas, clics y envíos de credenciales, mientras que Evilginx gestiona las sesiones activas. La operación consiste principalmente en observar, validar accesos y documentar resultados.

Opcionalmente, es posible integrar notificaciones externas, como bots de Telegram, para recibir alertas en tiempo real ante eventos relevantes.

---

## Conclusión

Esta PoC demuestra que, con herramientas accesibles y una planificación adecuada, es posible simular de forma realista el comportamiento de un Initial Access Broker. El factor diferencial no es el tooling, sino el **perfilado, el diseño del dominio y la coherencia del ataque**.

El phishing sigue siendo eficaz porque explota confianza, contexto y hábitos. Entender esto desde la perspectiva ofensiva es clave para mejorar la defensa y la concienciación.

Si no se refuerza la formación de los usuarios, tarde o temprano alguien hará clic.

---

*Apoya el contenido de ciberseguridad en castellano. Compartir este artículo o contribuir a la formación es una de las mejores defensas frente a este tipo de ataques.*
