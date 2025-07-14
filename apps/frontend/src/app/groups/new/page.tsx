'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateInviteCode } from '@/lib/utils';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users, 
  Settings, 
  DollarSign,
  Shield,
  TrendingUp,
  Loader2
} from 'lucide-react';

interface GroupSettings {
  minContribution: number;
  maxContribution: number;
  contributionFrequency: string;
  withdrawalRequiresApproval: boolean;
  maxMembers: number;
  autoInvestEnabled: boolean;
}

export default function CreateGroupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  // Form data
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [settings, setSettings] = useState<GroupSettings>({
    minContribution: 10,
    maxContribution: 1000,
    contributionFrequency: 'monthly',
    withdrawalRequiresApproval: true,
    maxMembers: 10,
    autoInvestEnabled: true,
  });

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupName.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Group name is required.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const groupData = {
        name: groupName.trim(),
        description: description.trim() || undefined,
        settings,
        inviteCode: generateInviteCode(),
      };

      console.log('Creating group:', groupData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Group Created!',
        description: `${groupName} has been created successfully.`,
      });

      // Redirect to dashboard or group page
      router.push('/dashboard');
      
    } catch (error: any) {
      console.error('Error creating group:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create group.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && !groupName.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Group name is required.',
        variant: 'destructive',
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <AuthWrapper requireAuth={true}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
              <h1 className="text-xl font-bold">OrbitPool</h1>
            </div>
            
            <Link 
              href="/dashboard" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </header>

        <div className="container py-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
              </div>
            </div>

            <form onSubmit={handleCreateGroup}>
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Group Information</span>
                    </CardTitle>
                    <CardDescription>
                      Tell us about your savings group
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="groupName">Group Name *</Label>
                      <Input
                        id="groupName"
                        placeholder="e.g., Family Vacation Fund"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        Choose a clear name that describes your savings goal
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the purpose of this savings group..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                      />
                      <p className="text-sm text-muted-foreground">
                        Help members understand what you're saving for
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={handleNext}>
                        Next: Configure Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Group Settings</span>
                    </CardTitle>
                    <CardDescription>
                      Configure how your group will operate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Contribution Limits */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Contribution Limits</span>
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="minContribution">Minimum ($)</Label>
                          <Input
                            id="minContribution"
                            type="number"
                            min="1"
                            value={settings.minContribution}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              minContribution: Number(e.target.value)
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxContribution">Maximum ($)</Label>
                          <Input
                            id="maxContribution"
                            type="number"
                            min="1"
                            value={settings.maxContribution}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              maxContribution: Number(e.target.value)
                            }))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Group Size */}
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Group Size</span>
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="maxMembers">Maximum Members</Label>
                        <Input
                          id="maxMembers"
                          type="number"
                          min="2"
                          max="100"
                          value={settings.maxMembers}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            maxMembers: Number(e.target.value)
                          }))}
                        />
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Security & Governance</span>
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Withdrawal Approval</Label>
                          <p className="text-sm text-muted-foreground">
                            Require admin approval for withdrawals
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.withdrawalRequiresApproval}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            withdrawalRequiresApproval: e.target.checked
                          }))}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                    </div>

                    {/* Investment Settings */}
                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Investment Options</span>
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Auto-Invest via Blend Protocol</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically earn yield on group funds
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.autoInvestEnabled}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            autoInvestEnabled: e.target.checked
                          }))}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button type="button" variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Group...
                          </>
                        ) : (
                          'Create Group'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}