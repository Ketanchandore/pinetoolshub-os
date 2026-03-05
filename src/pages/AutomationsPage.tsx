import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SEOHead } from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Plus, Play, Pause, Trash2, Clock, CheckCircle2,
  ArrowRight, ChevronRight, Settings2, Activity,
  FileText, Image, Mail, Globe, Brain, Sparkles,
  ToggleLeft, ToggleRight, AlertCircle, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type AutoStatus = "active" | "paused" | "error";

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  status: AutoStatus;
  runs: number;
  lastRun: string;
  gradient: string;
  icon: any;
}

const initialAutomations: Automation[] = [
  {
    id: "1", name: "Daily File Backup",
    description: "Auto-backup all new files to cloud storage every midnight",
    trigger: "Every day at 12:00 AM",
    actions: ["Scan File Brain", "Compress files", "Upload to backup"],
    status: "active", runs: 47, lastRun: "2 hours ago",
    gradient: "from-blue-500 to-cyan-500", icon: FileText,
  },
  {
    id: "2", name: "Image Optimization Pipeline",
    description: "Resize and compress images when uploaded to File Brain",
    trigger: "On new image upload",
    actions: ["Detect image", "Resize to 1080p", "Compress 80%", "Generate thumbnail"],
    status: "active", runs: 234, lastRun: "15 min ago",
    gradient: "from-amber-500 to-orange-500", icon: Image,
  },
  {
    id: "3", name: "Content Repurpose Bot",
    description: "Turn blog posts into social media snippets automatically",
    trigger: "On new blog post saved",
    actions: ["Extract key points", "Generate Twitter thread", "Create LinkedIn post"],
    status: "paused", runs: 12, lastRun: "3 days ago",
    gradient: "from-purple-500 to-pink-500", icon: Brain,
  },
  {
    id: "4", name: "Weekly Report Email",
    description: "Send summary of activities every Monday morning",
    trigger: "Every Monday at 9:00 AM",
    actions: ["Collect stats", "Generate report", "Send email"],
    status: "error", runs: 8, lastRun: "Failed 1 day ago",
    gradient: "from-rose-500 to-red-500", icon: Mail,
  },
];

const templates = [
  { name: "File Watcher", desc: "Auto-process new uploaded files", icon: FileText, color: "from-blue-500 to-cyan-500" },
  { name: "Content Machine", desc: "Auto-generate social content", icon: Brain, color: "from-purple-500 to-pink-500" },
  { name: "Email Digest", desc: "Weekly activity summaries", icon: Mail, color: "from-green-500 to-teal-500" },
  { name: "Media Pipeline", desc: "Optimize media on upload", icon: Image, color: "from-amber-500 to-orange-500" },
  { name: "Web Monitor", desc: "Track website changes", icon: Globe, color: "from-indigo-500 to-blue-500" },
  { name: "Custom Workflow", desc: "Build your own automation", icon: Settings2, color: "from-slate-500 to-slate-600" },
];

const statusConfig = {
  active: { label: "Active", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  paused: { label: "Paused", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  error: { label: "Error", color: "bg-red-500/10 text-red-500 border-red-500/20" },
};

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [activeTab, setActiveTab] = useState<"my" | "templates">("my");
  const { toast } = useToast();

  const toggleStatus = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const next = a.status === "active" ? "paused" : "active";
        toast({ title: next === "active" ? "Automation enabled" : "Automation paused", description: a.name });
        return { ...a, status: next };
      })
    );
  };

  const deleteAutomation = (id: string) => {
    const auto = automations.find((a) => a.id === id);
    setAutomations((prev) => prev.filter((a) => a.id !== id));
    toast({ title: "Deleted", description: `"${auto?.name}" has been removed.` });
  };

  const runNow = (id: string) => {
    const auto = automations.find((a) => a.id === id);
    toast({ title: "Running now", description: `"${auto?.name}" triggered manually.` });
  };

  const totalRuns = automations.reduce((s, a) => s + a.runs, 0);
  const activeCount = automations.filter((a) => a.status === "active").length;

  return (
    <MainLayout>
      <SEOHead
        title="AI Workflow Automations — Automate File Processing, Content & Emails Free"
        description="Build powerful AI-powered automations that run on autopilot. Automate file backups, image optimization, content repurposing, email digests and more. Free workflow templates for productivity."
        canonical="/automations"
        keywords="workflow automation free, automate file processing, ai automation tools, productivity automation, auto compress images, auto backup files"
      />
      <div className="min-h-full p-6 md:p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Automations</h1>
              <p className="text-muted-foreground">Build powerful workflows that run on autopilot</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/20 gap-2">
            <Plus className="h-4 w-4" /> New Automation
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Runs", value: totalRuns, icon: Activity, color: "text-blue-500" },
            { label: "Active", value: activeCount, icon: CheckCircle2, color: "text-emerald-500" },
            { label: "Paused", value: automations.filter(a => a.status === "paused").length, icon: Pause, color: "text-amber-500" },
            { label: "Errors", value: automations.filter(a => a.status === "error").length, icon: AlertCircle, color: "text-red-500" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/60">
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className={cn("h-8 w-8", stat.color)} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
          {(["my", "templates"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === tab ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {tab === "my" ? "My Automations" : "Templates"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "my" ? (
            <motion.div key="my" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {automations.map((auto, index) => (
                <motion.div key={auto.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <Card className="border-border/60 hover:border-border transition-all group">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shrink-0 shadow-md", auto.gradient)}>
                          <auto.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-semibold text-foreground">{auto.name}</h3>
                            <Badge variant="outline" className={cn("text-xs border", statusConfig[auto.status].color)}>
                              {statusConfig[auto.status].label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{auto.description}</p>
                          <div className="mt-3 flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" /> {auto.trigger}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <TrendingUp className="h-3 w-3" /> {auto.runs} runs · {auto.lastRun}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-1 flex-wrap">
                            {auto.actions.map((action, i) => (
                              <span key={action} className="flex items-center gap-1">
                                <span className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{action}</span>
                                {i < auto.actions.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground/40" />}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Switch checked={auto.status === "active"} onCheckedChange={() => toggleStatus(auto.id)} />
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => runNow(auto.id)}>
                            <Play className="h-3.5 w-3.5 text-emerald-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive" onClick={() => deleteAutomation(auto.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="templates" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((tmpl, index) => (
                <motion.div key={tmpl.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}>
                  <Card className="border-border/60 hover:border-border transition-all cursor-pointer group">
                    <CardContent className="p-5 space-y-4">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-md", tmpl.color)}>
                        <tmpl.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{tmpl.name}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{tmpl.desc}</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full gap-2 group-hover:border-emerald-500/50 group-hover:text-emerald-600 transition-colors">
                        <Plus className="h-3.5 w-3.5" /> Use Template
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
