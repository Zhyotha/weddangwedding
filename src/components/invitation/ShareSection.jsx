import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, MessageCircle } from "lucide-react";
import SectionLabel from "@/components/invitation/SectionLabel";
import SectionFlorals from "@/components/invitation/ornaments/Flora";
import { StaggerGroup, StaggerItem } from "@/components/invitation/motion/Stagger";
import { WEDDING } from "@/lib/wedding";

export default function ShareSection() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const shareMessage = `Undangan pernikahan ${WEDDING.groom.name} & ${WEDDING.bride.name} — ${WEDDING.dateLabel}. ${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch (error) {
      setCopied(false);
    }
  };
}