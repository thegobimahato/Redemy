import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm border-2 border-white/30 dark:border-black/30 hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 rounded-lg font-medium",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-2 focus-visible:ring-destructive/50 dark:focus-visible:ring-destructive/40 active:scale-[0.98] transition-all duration-200 rounded-lg font-medium",

        success:
          "bg-green-600 text-white shadow-sm hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 active:scale-[0.98] transition-all duration-200 rounded-lg font-medium",

        cancel:
          "bg-muted text-muted-foreground shadow-sm hover:bg-muted/80 dark:bg-neutral-800 dark:text-neutral-200 active:scale-[0.98] transition-all duration-200 rounded-lg font-medium",

        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-lg transition-colors duration-200",

        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-[0.98] transition-all duration-200 rounded-lg font-medium",

        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-lg transition-colors duration-200",

        link: "text-primary underline-offset-4 hover:underline font-medium",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
