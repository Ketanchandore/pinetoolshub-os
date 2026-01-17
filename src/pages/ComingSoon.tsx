import { motion } from "framer-motion";
import { Construction, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-full flex-col items-center justify-center p-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
      >
        <Construction className="h-10 w-10 text-primary" />
      </motion.div>

      <h1 className="mb-2 text-center font-display text-3xl font-bold text-foreground">
        {title}
      </h1>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        {description || "This feature is coming soon. We're working hard to bring you something amazing."}
      </p>

      <Button onClick={() => navigate("/")} variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
    </motion.div>
  );
}
