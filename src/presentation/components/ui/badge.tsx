import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/25",
        secondary:
          "border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white",
        outline: "border-slate-700 text-slate-300 hover:border-slate-500",
        emerald:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
        purple:
          "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20",
        blue:
          "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
        amber:
          "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
