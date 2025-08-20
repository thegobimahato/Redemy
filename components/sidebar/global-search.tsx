"use client";

import * as React from "react";

import {
  Calculator,
  Calendar,
  CreditCard,
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

  // Keyboard shortcut for `/`
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setOpen(true)}
        className="border-border bg-background/80 text-muted-foreground hover:bg-muted/50 flex w-10 items-center justify-between rounded-full border px-3 py-1.5 text-sm shadow-sm transition-colors sm:w-64"
      >
        {/* Left side */}
        <div className="mx-auto flex items-center gap-2 sm:mx-0">
          <Search className="h-4 w-4" />
          {/* Show placeholder only on desktop */}
          <span className="hidden sm:inline">Search...</span>
        </div>

        {/* Right side shortcut */}
        <kbd className="bg-muted text-muted-foreground pointer-events-none ml-2 hidden h-5 items-center justify-center rounded px-1.5 font-mono text-[10px] font-medium select-none sm:flex">
          /
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
