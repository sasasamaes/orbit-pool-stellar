'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useNotifications } from '@/hooks/use-notifications';
import { NotificationPreferences } from '@/lib/notifications';
import { useToast } from '@/hooks/use-toast';
import {
  Bell,
  BellOff,
  Mail,
  Smartphone,
  DollarSign,
  TrendingUp,
  Users,
  AlertTriangle,
  Moon,
  Save,
  Loader2
} from 'lucide-react';

export function NotificationSettings() {
  const {
    preferences,
    isPermissionGranted,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    updatePreferences,
  } = useNotifications();
  
  const { toast } = useToast();
  
  const [localPreferences, setLocalPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load preferences when they become available
  useEffect(() => {
    if (preferences) {
      setLocalPreferences(preferences);
    }
  }, [preferences]);

  const handleToggle = (key: keyof NotificationPreferences, value: boolean) => {
    if (!localPreferences) return;

    setLocalPreferences(prev => ({
      ...prev!,
      [key]: value,
    }));
  };

  const handleCategoryToggle = (category: keyof NotificationPreferences['categories'], value: boolean) => {
    if (!localPreferences) return;

    setLocalPreferences(prev => ({
      ...prev!,
      categories: {
        ...prev!.categories,
        [category]: value,
      },
    }));
  };

  const handleQuietHoursToggle = (value: boolean) => {
    if (!localPreferences) return;

    setLocalPreferences(prev => ({
      ...prev!,
      quietHours: {
        ...prev!.quietHours,
        enabled: value,
      },
    }));
  };

  const handleQuietHoursTime = (type: 'start' | 'end', value: string) => {
    if (!localPreferences) return;

    setLocalPreferences(prev => ({
      ...prev!,
      quietHours: {
        ...prev!.quietHours,
        [type]: value,
      },
    }));
  };

  const handleEnablePushNotifications = async () => {
    setIsLoading(true);
    try {
      const permissionGranted = await requestPermission();
      if (permissionGranted) {
        const subscribed = await subscribeToPush();
        if (subscribed) {
          handleToggle('pushEnabled', true);
        }
      }
    } catch (error) {
      console.error('Error enabling push notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisablePushNotifications = async () => {
    setIsLoading(true);
    try {
      const unsubscribed = await unsubscribeFromPush();
      if (unsubscribed) {
        handleToggle('pushEnabled', false);
      }
    } catch (error) {
      console.error('Error disabling push notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!localPreferences) return;

    setIsSaving(true);
    try {
      await updatePreferences(localPreferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!localPreferences) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading notification settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notification Settings</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Notification Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Methods</span>
          </CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Push Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Get instant notifications in your browser
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isPermissionGranted ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEnablePushNotifications}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Enable'
                  )}
                </Button>
              ) : (
                <Switch
                  checked={localPreferences.pushEnabled}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleEnablePushNotifications();
                    } else {
                      handleDisablePushNotifications();
                    }
                  }}
                  disabled={isLoading}
                />
              )}
            </div>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <Switch
              checked={localPreferences.emailEnabled}
              onCheckedChange={(checked) => handleToggle('emailEnabled', checked)}
            />
          </div>

          {/* In-App Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BellOff className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="text-sm font-medium">In-App Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Show notifications while using the app
                </p>
              </div>
            </div>
            <Switch
              checked={localPreferences.inAppEnabled}
              onCheckedChange={(checked) => handleToggle('inAppEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>
            Choose which types of notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Transactions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <div>
                <Label className="text-sm font-medium">Transactions</Label>
                <p className="text-xs text-muted-foreground">
                  Contributions, withdrawals, and transfers
                </p>
              </div>
            </div>
            <Switch
              checked={localPreferences.categories.transactions}
              onCheckedChange={(checked) => handleCategoryToggle('transactions', checked)}
            />
          </div>

          {/* Yield Updates */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <Label className="text-sm font-medium">Yield Updates</Label>
                <p className="text-xs text-muted-foreground">
                  Yield earnings and distribution notifications
                </p>
              </div>
            </div>
            <Switch
              checked={localPreferences.categories.yieldUpdates}
              onCheckedChange={(checked) => handleCategoryToggle('yieldUpdates', checked)}
            />
          </div>

          {/* Group Activity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <Label className="text-sm font-medium">Group Activity</Label>
                <p className="text-xs text-muted-foreground">
                  New members, group updates, and announcements
                </p>
              </div>
            </div>
            <Switch
              checked={localPreferences.categories.groupActivity}
              onCheckedChange={(checked) => handleCategoryToggle('groupActivity', checked)}
            />
          </div>

          {/* System Alerts */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <Label className="text-sm font-medium">System Alerts</Label>
                <p className="text-xs text-muted-foreground">
                  Security alerts, maintenance, and important updates
                </p>
              </div>
            </div>
            <Switch
              checked={localPreferences.categories.systemAlerts}
              onCheckedChange={(checked) => handleCategoryToggle('systemAlerts', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Moon className="h-5 w-5" />
            <span>Quiet Hours</span>
          </CardTitle>
          <CardDescription>
            Set times when you don't want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Enable Quiet Hours</Label>
            <Switch
              checked={localPreferences.quietHours.enabled}
              onCheckedChange={handleQuietHoursToggle}
            />
          </div>

          {localPreferences.quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-sm">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={localPreferences.quietHours.start}
                  onChange={(e) => handleQuietHoursTime('start', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time" className="text-sm">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={localPreferences.quietHours.end}
                  onChange={(e) => handleQuietHoursTime('end', e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}