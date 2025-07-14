# 💰 Cómo Obtener USDC en Stellar Testnet

## 🚀 **Método Rápido: Stellar Laboratory**

### 1. **Paso 1: Ir a Stellar Laboratory**

Visita: https://laboratory.stellar.org/#explorer

### 2. **Paso 2: Fondear tu cuenta con XLM**

1. Ve a: https://laboratory.stellar.org/#account-creator
2. Ingresa tu clave pública de Freighter
3. Click "Get test network lumens"
4. Espera confirmación

### 3. **Paso 3: Crear Trustline USDC**

1. Ve a: https://laboratory.stellar.org/#txbuilder
2. **Source Account**: Tu clave pública
3. **Transaction Type**: Change Trust
4. **Asset**:
   - Asset Code: `USDC`
   - Issuer: `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`
5. **Sign in Transaction Signer**
6. **Submit to testnet**

### 4. **Paso 4: Obtener USDC**

1. Ve a: https://laboratory.stellar.org/#txbuilder
2. **Source Account**: `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5` (issuer USDC)
3. **Transaction Type**: Payment
4. **Destination**: Tu clave pública
5. **Asset**:
   - Asset Code: `USDC`
   - Issuer: `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`
6. **Amount**: `1000`

---

## 🔧 **Método Automático: Con Nuestra App**

### 1. **Usar el Botón "Setup USDC"**

En tu grupo, cuando conectes el wallet, verás un botón "Setup USDC" que:

- Detecta si tienes trustline
- Te ayuda a establecerla si no la tienes

### 2. **Verificar en Stellar Expert**

- Ve a: https://stellar.expert/explorer/testnet
- Busca tu dirección pública
- Verifica balances de XLM y USDC

---

## 🎯 **Direcciones Importantes**

**Tu Deployer Account:**

- Pública: `GDXIC6YIDVGZ2X6MLWVFJ2OQJGFDVULXJBSHMNTGI4S4N5FNHS5YCDTS`
- Ya tiene fondos para deploy de contratos

**USDC Testnet:**

- Issuer: `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`
- Asset Code: `USDC`

---

## ⚡ **Para Desarrollo Rápido**

Si necesitas USDC inmediatamente:

1. Usa tu wallet Freighter
2. Ve a cualquier faucet de Stellar testnet
3. Obtén XLM primero
4. Establece trustline USDC usando Freighter directamente
5. Pide USDC en Discord de Stellar Developers

**Discord Stellar**: https://discord.gg/stellardev
**Canal**: #testnet-faucet
