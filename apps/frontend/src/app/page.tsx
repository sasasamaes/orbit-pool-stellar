import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  TrendingUp, 
  Globe, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
            <h1 className="text-xl font-bold">Community Wallet</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How it Works
            </Link>
            <Link href="#security" className="text-sm font-medium hover:text-primary transition-colors">
              Security
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Powered by Stellar Blockchain
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Save Together, Grow Together
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create digital savings groups with friends, family, and communities. 
            Earn yield through DeFi protocols while maintaining full transparency and security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">
                Create Your Group
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Community Wallet?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Group Savings</CardTitle>
                <CardDescription>
                  Create or join savings groups with invite codes. Perfect for families, friends, and communities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Automated Yield</CardTitle>
                <CardDescription>
                  Your group funds automatically earn yield through Blend Protocol on the Stellar network.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Transparent & Secure</CardTitle>
                <CardDescription>
                  All transactions are recorded on the blockchain. No hidden fees, complete transparency.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Global Access</CardTitle>
                <CardDescription>
                  Available worldwide with support for multiple currencies and languages.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Easy to Use</CardTitle>
                <CardDescription>
                  Simple interface designed for everyone, from crypto beginners to experts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Community Focused</CardTitle>
                <CardDescription>
                  Built for real communities in Latin America and beyond.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/20">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create or Join</h3>
              <p className="text-muted-foreground">
                Create a new savings group or join an existing one with an invite code.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Contribute Funds</h3>
              <p className="text-muted-foreground">
                Connect your Stellar wallet and contribute USDC to your group\'s shared pool.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn & Grow</h3>
              <p className="text-muted-foreground">
                Watch your collective savings grow with automated yield from DeFi protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Built for Security</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Your funds are protected by industry-leading security practices and blockchain technology.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Multi-signature Wallets</CardTitle>
                <CardDescription>
                  Group funds are held in multi-signature Stellar accounts requiring multiple approvals for withdrawals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blockchain Transparency</CardTitle>
                <CardDescription>
                  All transactions are recorded on the Stellar blockchain, providing complete transparency and auditability.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Saving Together?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of people already using Community Wallet to achieve their financial goals.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
                <h3 className="font-bold">Community Wallet</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Democratizing savings and investment for communities worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#security" className="hover:text-primary transition-colors">Security</Link></li>
                <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/status" className="hover:text-primary transition-colors">Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Community Wallet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}