import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import brandBanner from "@/assets/brand-banner.png";
import logo from "@/assets/logo.png";
import {
  Sparkles,
  Rocket,
  Globe,
  Award,
  Users,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";

const values = [
  {
    icon: Rocket,
    title: "Innovation First",
    description: "Pushing boundaries with AI-powered productivity solutions",
  },
  {
    icon: Globe,
    title: "Global Vision",
    description: "Building for millions of users across the world",
  },
  {
    icon: Award,
    title: "World-Class Quality",
    description: "Enterprise-grade reliability with consumer-grade simplicity",
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Every feature designed to save time and reduce friction",
  },
];

const stats = [
  { value: "10M+", label: "Target Users", icon: TrendingUp },
  { value: "100+", label: "AI Workflows", icon: Zap },
  { value: "50+", label: "Integrations", icon: Target },
  { value: "24/7", label: "AI Assistance", icon: Sparkles },
];

export default function BrandKitPage() {
  return (
    <MainLayout>
      <div className="min-h-screen overflow-y-auto">
        {/* Hero Section with Brand Banner */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <img
              src={brandBanner}
              alt="PineToolsHub Brand Banner"
              className="w-full h-[500px] object-cover object-center"
            />
          </motion.div>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
              >
                <Sparkles className="h-4 w-4 text-pink-400" />
                <span className="text-sm font-medium text-white">Building the Future</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-2xl">
                Not Just a Product
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg">
                We're Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">World-Class Brand</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-400 text-sm font-semibold mb-4">
                OUR VISION
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                MNC-Level Excellence
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                PineToolsHub is not just another productivity tool. We're building a platform that rivals 
                the world's top tech companies — designed to become the <strong className="text-foreground">default workspace</strong> for 
                millions of users worldwide.
              </p>
            </motion.div>

            {/* Logo Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative max-w-md mx-auto mb-20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl blur-3xl opacity-50" />
              <div className="relative bg-gradient-to-br from-sidebar/80 to-sidebar-accent/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <img
                  src={logo}
                  alt="PineToolsHub Logo"
                  className="w-full max-w-xs mx-auto"
                />
                <div className="text-center mt-6">
                  <h3 className="text-2xl font-display font-bold text-foreground">PineToolsHub</h3>
                  <p className="text-muted-foreground">AI Productivity Operating System</p>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:border-pink-500/30 transition-colors">
                    <stat.icon className="h-6 w-6 text-pink-400 mx-auto mb-3" />
                    <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Values Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-2xl font-display font-bold text-foreground text-center mb-10">
                Our Core Values
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-start gap-4 p-6 rounded-2xl border border-border/50 hover:border-pink-500/30 transition-colors">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25">
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-1">{value.title}</h4>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-12 px-6 rounded-3xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-pink-500/20"
            >
              <Sparkles className="h-8 w-8 text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Join the Revolution
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Be part of something bigger. PineToolsHub is redefining how millions of people work, 
                create, and achieve their goals.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 transition-shadow cursor-pointer">
                <Rocket className="h-5 w-5" />
                Start Building Today
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
