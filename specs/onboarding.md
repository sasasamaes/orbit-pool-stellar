## Onboarding Web3: Flujo de Incorporación en 4 Pasos para Usuarios Sin Experiencia

---

### **Paso 1: Bienvenida & Registro Simple**

**1. Objetivo:**  
Que el usuario sienta confianza y entienda el valor (“puedes ahorrar en grupo y ganar intereses”) antes de pedirle cualquier acción técnica.

**2. Acción del usuario:**  
Ingresar su email o usar Google/Facebook para empezar.

**3. Solución técnica recomendada:**  
Autenticación social/magic link (Supabase), sin contraseña.

**4. Texto UI sugerido:**

> **¡Bienvenido/a!**
>
> Descubre cómo ahorrar y ganar intereses junto a tu grupo.
>
> Comienza rápido:  
> [Continuar con Google] [Ingresar email]

---

### **Paso 2: Creación Automática de Wallet**

**1. Objetivo:**  
Dotar al usuario de una wallet Stellar sin esfuerzo ni jerga cripto.

**2. Acción del usuario:**  
Aceptar la creación automática y segura de su cuenta web3 (un clic).

**3. Solución técnica recomendada:**  
Abstracción de cuenta (“embedded wallet” tipo Magic, Web3Auth, o similar).  
Generar la wallet al registrarse; las claves permanecen custodiadas bajo su email/social login (non-custodial preferido).

**4. Texto UI sugerido:**

> **Listo para empezar.**
>
> Hemos creado tu billetera digital segura.  
> Así podrás ahorrar y participar en tu grupo sin complicaciones.
>
> [¡Continuar!]

---

### **Paso 3: Únete o crea tu grupo**

**1. Objetivo:**  
Que el usuario pase rápido a la acción principal (unirse a su grupo o crear uno propio).

**2. Acción del usuario:**  
Elegir entre “Unirme a un grupo” (mediante invitación) o “Crear mi grupo” (ingresando un nombre sencillo).

**3. Solución técnica recomendada:**  
Formulario mínimo, gestión de grupos en backend.

**4. Texto UI sugerido:**

> **¡Casi listo!**
>
> ¿Ya tienes un grupo?  
> [Unirme con código/invitación]
>
> ¿Quieres empezar uno nuevo?  
> [Crear mi grupo]  
> Elige un nombre para tu grupo: **\_\_\_** [Confirmar]

---

### **Paso 4: Primer aporte guiado con on-ramp amigable**

**1. Objetivo:**  
Que el usuario pueda aportar fondos fácilmente y vea reflejado su dinero y potenciales intereses.

**2. Acción del usuario:**  
Elige monto a aportar y paga con una opción local conocida (transferencia, tarjeta, etc.).

**3. Solución técnica recomendada:**  
On-ramp integrado (Transak, Ramp Network, Kado, etc.); el usuario paga con fiat y recibe USDC en su wallet Stellar in-app, todo asistido y sin moverse de la dApp.

**4. Texto UI sugerido:**

> **¡Hora de aportar!**
>
> Con tu primer depósito, comienzas a ahorrar y ganar intereses junto a tu grupo.
>
> Elige cuánto quieres aportar: [ Monto en moneda local ] > [Pagar con tarjeta / transferencia]
>
> _No necesitas saber de cripto. Tu saldo aparecerá automáticamente. Si tienes preguntas, estamos aquí para ayudarte._
>
> [Hacer aporte]

---

## **Guía general de tono y UX:**

- Evita toda jerga (“clave privada”, “seed”, “cripto”, “wallet”, etc.): usa “billetera digital” o charla natural.
- Siempre un solo call-to-action visible.
- Refuerza sensación de seguridad y acompañamiento.
- Visualiza rápido el saldo y próximo paso (“Ahora puedes invitar a un amigo, seguir ahorrando o ver tus intereses”).
