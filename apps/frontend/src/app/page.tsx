import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Shield,
  TrendingUp,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Zap,
  Lock,
  DollarSign,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Header con efectos glass */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-violet-500/25 animate-pulse" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Community Wallet
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-sm font-medium text-white hover:text-violet-400 transition-colors"
            >
              Funciones
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-white hover:text-violet-400 transition-colors"
            >
              Cómo Funciona
            </Link>
            <Link
              href="#security"
              className="text-sm font-medium text-white hover:text-violet-400 transition-colors"
            >
              Seguridad
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              asChild
              className="hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-600 text-white"
            >
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
            >
              <Link href="/auth/register">Comenzar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section mejorada */}
      <section className="py-20 px-4 text-center relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-slate-950 dark:via-violet-950/20 dark:to-fuchsia-950/20">
        {/* Partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-10 w-4 h-4 bg-violet-500 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <div
            className="absolute top-32 right-20 w-3 h-3 bg-purple-500 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-32 left-20 w-2 h-2 bg-fuchsia-500 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          />
          <div
            className="absolute bottom-20 right-10 w-5 h-5 bg-violet-400 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "3s", animationDuration: "6s" }}
          />
        </div>

        <div className="container max-w-4xl mx-auto relative z-10">
          <Badge
            variant="secondary"
            className="mb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-violet-200 dark:border-violet-800 animate-fade-in"
          >
            <Sparkles className="w-4 h-4 mr-2 text-violet-600" />
            Powered by Stellar Blockchain
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent animate-fade-in-up">
            Ahorra Juntos, Crece Juntos
          </h1>

          <p
            className="text-xl text-white mb-8 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Crea grupos de ahorro digitales con amigos, familia y comunidades.
            Gana rendimientos a través de protocolos DeFi manteniendo total
            transparencia y seguridad.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
            >
              <Link href="/auth/register" className="flex items-center">
                Crear Tu Grupo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="backdrop-blur-sm bg-white/10 border-violet-200 dark:border-violet-800 hover:bg-white/20 text-white hover:text-white hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
            >
              <Link href="#how-it-works">Conoce Más</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section mejorada */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              ¿Por Qué Elegir Community Wallet?
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Descubre las características que hacen única nuestra plataforma de
              ahorro comunitario
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-violet-50/30 dark:from-slate-900 dark:to-violet-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-violet-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Ahorro Grupal
                </h3>
                <p className="text-slate-300">
                  Crea o únete a grupos de ahorro con códigos de invitación.
                  Perfecto para familias, amigos y comunidades.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Rendimiento Automático
                </h3>
                <p className="text-slate-300">
                  Tus fondos grupales ganan rendimientos automáticamente a
                  través del Protocolo Blend en la red Stellar.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-cyan-50/30 dark:from-slate-900 dark:to-cyan-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Transparente y Seguro
                </h3>
                <p className="text-slate-300">
                  Todas las transacciones se registran en la blockchain. Sin
                  tarifas ocultas, transparencia completa.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-900 dark:to-orange-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Acceso Global
                </h3>
                <p className="text-slate-300">
                  Disponible en todo el mundo con soporte para múltiples monedas
                  e idiomas.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-pink-50/30 dark:from-slate-900 dark:to-pink-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-pink-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Fácil de Usar
                </h3>
                <p className="text-slate-300">
                  Interfaz simple diseñada para todos, desde principiantes hasta
                  expertos en crypto.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-rose-50/30 dark:from-slate-900 dark:to-rose-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-rose-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Enfoque Comunitario
                </h3>
                <p className="text-slate-300">
                  Construido para comunidades reales en América Latina y más
                  allá.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section mejorada */}
      <section
        id="how-it-works"
        className="py-20 px-4 bg-slate-50 dark:bg-slate-950"
      >
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Cómo Funciona
            </h2>
            <p className="text-lg text-white">
              Tres simples pasos para comenzar tu viaje de ahorro comunitario
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white shadow-lg shadow-violet-500/25 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Crear o Unirse
              </h3>
              <p className="text-slate-300">
                Crea un nuevo grupo de ahorro o únete a uno existente con un
                código de invitación.
              </p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Contribuir Fondos
              </h3>
              <p className="text-slate-300">
                Conecta tu wallet de Stellar y contribuye USDC al fondo
                compartido de tu grupo.
              </p>
            </div>

            <div className="text-center group">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white shadow-lg shadow-fuchsia-500/25 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Ganar y Crecer
              </h3>
              <p className="text-slate-300">
                Observa cómo tus ahorros colectivos crecen con rendimientos
                automáticos de protocolos DeFi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section mejorada */}
      <section id="security" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Construido para la Seguridad
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Tus fondos están protegidos por prácticas de seguridad líderes en
              la industria y tecnología blockchain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-amber-50/30 dark:from-slate-900 dark:to-amber-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Wallets Multi-firma
                </h3>
                <p className="text-slate-300">
                  Los fondos del grupo se mantienen en cuentas Stellar
                  multi-firma que requieren múltiples aprobaciones para retiros.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Transparencia Blockchain
                </h3>
                <p className="text-slate-300">
                  Todas las transacciones se registran en la blockchain de
                  Stellar, proporcionando transparencia completa y
                  auditabilidad.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-violet-50/30 dark:from-slate-900 dark:to-violet-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-violet-500/25 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Protocolos Auditados
                </h3>
                <p className="text-slate-300">
                  Utilizamos únicamente protocolos DeFi auditados y probados en
                  el tiempo para generar rendimientos.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-cyan-50/30 dark:from-slate-900 dark:to-cyan-950/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Sin Custodia
                </h3>
                <p className="text-slate-300">
                  Nunca tenemos custodia de tus fondos. Tú mantienes el control
                  total de tus activos en todo momento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section mejorada */}
      <section className="py-20 px-4 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            ¿Listo para Comenzar a Ahorrar Juntos?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de personas que ya usan Community Wallet para lograr
            sus objetivos financieros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-violet-600 hover:bg-slate-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Link href="/auth/register" className="flex items-center">
                Comenzar Ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 hover:border-white/80 backdrop-blur-sm transition-all duration-300 bg-transparent"
            >
              <Link href="#features">Conocer Más</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer mejorado */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-4 bg-white dark:bg-slate-900">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-violet-500/25" />
                <h3 className="font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Community Wallet
                </h3>
              </div>
              <p className="text-sm text-white">
                Democratizando el ahorro y la inversión para comunidades en todo
                el mundo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Producto</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-violet-400 transition-colors"
                  >
                    Funciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="#security"
                    className="hover:text-violet-400 transition-colors"
                  >
                    Seguridad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-violet-400 transition-colors"
                  >
                    Documentación
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Soporte</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-violet-400 transition-colors"
                  >
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-violet-400 transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="hover:text-violet-400 transition-colors"
                  >
                    Comunidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-violet-400 transition-colors"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-violet-400 transition-colors"
                  >
                    Términos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-violet-400 transition-colors"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-300">
            <p>&copy; 2024 Community Wallet. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
