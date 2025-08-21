"use client";

import * as React from "react";

import {
  BookOpen,
  Calculator,
  Calendar,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function GlobalSearch() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => setOpen(true), []);

  // Keyboard shortcut for global search (Ctrl+K / Cmd+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Search Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open global search"
        className="border-border bg-background/80 text-muted-foreground hover:bg-muted/50 flex w-10 items-center justify-center rounded-full border px-3 py-1.5 text-sm shadow-sm transition-colors sm:w-64 sm:justify-between"
      >
        {/* Left side */}
        <div className="mx-auto flex items-center gap-2 sm:mx-0">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search courses</span>
        </div>

        {/* Shortcut hint (desktop only) */}
        <kbd className="bg-muted text-muted-foreground pointer-events-none ml-2 hidden h-5 items-center justify-center rounded px-1.5 font-mono text-[10px] font-medium select-none sm:flex">
          Ctrl K
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search courses" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* LMS-specific */}
          <CommandGroup heading="Learning">
            <CommandItem>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Browse Courses</span>
            </CommandItem>
            <CommandItem>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Instructors</span>
            </CommandItem>
            <CommandItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>My Dashboard</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Other tools */}
          <CommandGroup heading="Tools">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Emoji Search</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
