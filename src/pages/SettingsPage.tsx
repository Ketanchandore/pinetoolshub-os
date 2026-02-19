import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, User, Bell, Shield, Palette, Globe, Zap, HelpCircle,
  ChevronRight, Save, Moon, Sun, Monitor, Check, LogOut,
  Key, Trash2, Mail, Camera, Edit3, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Privacy", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Zap },
  { id: "language", label: "Language & Region", icon: Globe },
  { id: "help", label: "Help & Support", icon: HelpCircle },
];

const themes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

const languages = ["English", "Hindi", "Spanish", "French", "German", "Chinese", "Japanese"];

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("profile");
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || user?.email?.split("@")[0] || "");
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("English");
  const [saving, setSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    automations: true,
    weekly: false,
    marketing: false,
  });

  const handleSaveProfile = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ data: { display_name: displayName } });
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!", description: "Your changes have been saved." });
    }
  };

  const handleChangePassword = async () => {
    if (!user?.email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email sent!", description: "Check your inbox for a password reset link." });
    }
  };

  return (
    <MainLayout>
      <div className="min-h-full p-6 md:p-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 shadow-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account, appearance, and preferences</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
            <Card className="border-border/60 sticky top-4">
              <CardContent className="p-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all",
                      activeSection === item.id ? "bg-gradient-to-r from-primary/10 to-primary/5 text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", activeSection === item.id ? "text-primary" : "")} />
                    <span className="text-sm">{item.label}</span>
                    {activeSection === item.id && <ChevronRight className="h-3.5 w-3.5 ml-auto text-primary" />}
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Profile */}
              {activeSection === "profile" && (
                <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  <Card className="border-border/60">
                    <CardContent className="p-6 space-y-6">
                      <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
                      {/* Avatar */}
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <User className="h-10 w-10 text-white" />
                          </div>
                          <button className="absolute -bottom-1 -right-1 h-7 w-7 bg-card border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
                            <Camera className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{user?.email?.split("@")[0] || "User"}</p>
                          <p className="text-sm text-muted-foreground">{user?.email || "Not signed in"}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">Free Plan</Badge>
                        </div>
                      </div>
                      {/* Fields */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Display Name</label>
                          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="border-border/60" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Email Address</label>
                          <Input value={user?.email || ""} disabled className="border-border/60 bg-muted/30" />
                          <p className="text-xs text-muted-foreground">Email cannot be changed directly. Contact support.</p>
                        </div>
                      </div>
                      {user && (
                        <Button onClick={handleSaveProfile} disabled={saving} className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                          {saving ? "Saving..." : <><Save className="h-4 w-4" /> Save Changes</>}
                        </Button>
                      )}
                      {!user && (
                        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                          Sign in to edit your profile.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  {user && (
                    <Card className="border-destructive/20">
                      <CardContent className="p-6 space-y-3">
                        <h3 className="font-semibold text-foreground">Danger Zone</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">Sign out</p>
                            <p className="text-xs text-muted-foreground">Log out of your account</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => signOut()} className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/5">
                            <LogOut className="h-3.5 w-3.5" /> Sign Out
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}

              {/* Appearance */}
              {activeSection === "appearance" && (
                <motion.div key="appearance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  <Card className="border-border/60">
                    <CardContent className="p-6 space-y-6">
                      <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground">Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                          {themes.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setTheme(t.id)}
                              className={cn(
                                "flex flex-col items-center gap-3 rounded-xl border p-4 transition-all",
                                theme === t.id ? "border-primary bg-primary/5" : "border-border/60 hover:border-border"
                              )}
                            >
                              <t.icon className={cn("h-6 w-6", theme === t.id ? "text-primary" : "text-muted-foreground")} />
                              <span className="text-sm font-medium text-foreground">{t.label}</span>
                              {theme === t.id && <Check className="h-4 w-4 text-primary" />}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground">Sidebar</label>
                        <div className="space-y-3">
                          {[
                            { label: "Compact sidebar by default", key: "compact" },
                            { label: "Show tooltips", key: "tooltips" },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between py-1">
                              <span className="text-sm text-foreground">{item.label}</span>
                              <Switch defaultChecked={item.key === "tooltips"} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Notifications */}
              {activeSection === "notifications" && (
                <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  <Card className="border-border/60">
                    <CardContent className="p-6 space-y-5">
                      <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
                      {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val]) => {
                        const labels: Record<string, { title: string; desc: string }> = {
                          email: { title: "Email Notifications", desc: "Get updates via email" },
                          push: { title: "Push Notifications", desc: "Browser push alerts" },
                          automations: { title: "Automation Alerts", desc: "Notify when automations run" },
                          weekly: { title: "Weekly Digest", desc: "Summary of your activity" },
                          marketing: { title: "Product Updates", desc: "New features and tips" },
                        };
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-foreground">{labels[key].title}</p>
                              <p className="text-xs text-muted-foreground">{labels[key].desc}</p>
                            </div>
                            <Switch
                              checked={val}
                              onCheckedChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))}
                            />
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Security */}
              {activeSection === "security" && (
                <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  <Card className="border-border/60">
                    <CardContent className="p-6 space-y-5">
                      <h2 className="text-lg font-semibold text-foreground">Security & Privacy</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/60">
                          <div className="flex items-center gap-3">
                            <Key className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Password</p>
                              <p className="text-xs text-muted-foreground">Change your password via email link</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleChangePassword}>Reset Password</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/60">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Two-Factor Auth</p>
                              <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/60">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Active Sessions</p>
                              <p className="text-xs text-muted-foreground">Manage where you're logged in</p>
                            </div>
                          </div>
                          <Badge className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20">1 active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Integrations */}
              {activeSection === "integrations" && (
                <motion.div key="integrations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  <Card className="border-border/60">
                    <CardContent className="p-6 space-y-5">
                      <h2 className="text-lg font-semibold text-foreground">Integrations</h2>
                      {[
                        { name: "Google Drive", desc: "Sync files with Google Drive", connected: false, icon: "🟢" },
                        { name: "Dropbox", desc: "Import & export from Dropbox", connected: false, icon: "📦" },
                        { name: "Slack", desc: "Get notifications in Slack", connected: false, icon: "💬" },
                        { name: "Zapier", desc: "Connect with 5000+ apps", connected: false, icon: "⚡" },
                        { name: "Notion", desc: "Export content to Notion", connected: false, icon: "📝" },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-4 rounded-xl border border-border/60 hover:border-border transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          </div>
                          <Button variant={item.connected ? "outline" : "default"} size="sm" className={!item.connected ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground" : ""}>
                            {item.connected ? "Disconnect" : "Connect"}
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Language */}
              {activeSection === "language" && (
                <motion.div key="language" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Card className="border-border/60">
                    <CardContent className="p-6 space-y-5">
                      <h2 className="text-lg font-semibold text-foreground">Language & Region</h2>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Interface Language</label>
                        <div className="grid grid-cols-2 gap-2">
                          {languages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setLanguage(lang)}
                              className={cn(
                                "flex items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all",
                                language === lang ? "border-primary bg-primary/5 text-foreground" : "border-border/60 text-muted-foreground hover:border-border"
                              )}
                            >
                              {language === lang && <Check className="h-4 w-4 text-primary" />}
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Help */}
              {activeSection === "help" && (
                <motion.div key="help" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Card className="border-border/60">
                    <CardContent className="p-6 space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Help & Support</h2>
                      {[
                        { title: "Documentation", desc: "Read our guides and tutorials", action: "Open Docs", icon: "📖" },
                        { title: "Contact Support", desc: "Get help from our team", action: "Send Message", icon: "💌" },
                        { title: "Feature Requests", desc: "Suggest new features", action: "Submit Idea", icon: "💡" },
                        { title: "Report a Bug", desc: "Help us improve the platform", action: "Report", icon: "🐛" },
                      ].map((item) => (
                        <div key={item.title} className="flex items-center justify-between p-4 rounded-xl border border-border/60 hover:border-border transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{item.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">{item.action}</Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
