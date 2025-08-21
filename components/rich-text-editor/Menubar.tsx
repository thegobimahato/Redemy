"use client";

import { type Editor } from "@tiptap/react";
import { Maximize, Minimize } from "lucide-react";

import { BlockquoteButton } from "@/components/rich-text-editor/tiptap-ui/blockquote-button";
import { MarkButton } from "@/components/rich-text-editor/tiptap-ui/mark-button";
import { Button } from "@/components/ui/button";

import { LinkPopover } from "../../link-popover";
import { CodeBlockButton } from "./tiptap-ui/code-block-button";
import { ColorHighlightPopover } from "./tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "./tiptap-ui/heading-dropdown-menu";
import { ListDropdownMenu } from "./tiptap-ui/list-dropdown-menu";
import { TextAlignButton } from "./tiptap-ui/text-align-button";
import { UndoRedoButton } from "./tiptap-ui/undo-redo-button";

interface MenubarProps {
  editor: Editor | null;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
}

const Menubar = ({
  editor,
  onToggleFullscreen,
  isFullscreen,
}: MenubarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap items-center gap-1">
      {/* Left tools */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Inline formatting */}
        <div className="flex flex-wrap items-center gap-2">
          <MarkButton editor={editor} type="bold" />
          <MarkButton editor={editor} type="italic" />
          <MarkButton editor={editor} type="underline" />
          <MarkButton editor={editor} type="strike" />
        </div>

        <div className="hidden sm:block w-px h-6 bg-border mx-2" />

        {/* Headings & blocks */}
        <div className="flex flex-wrap items-center gap-2">
          <HeadingDropdownMenu
            editor={editor}
            levels={[1, 2, 3, 4, 5, 6]}
            hideWhenUnavailable
            portal
          />
          <BlockquoteButton editor={editor} hideWhenUnavailable />
          <CodeBlockButton editor={editor} hideWhenUnavailable />
        </div>

        <div className="hidden sm:block w-px h-6 bg-border mx-2" />

        {/* Lists */}
        <ListDropdownMenu
          editor={editor}
          types={["bulletList", "orderedList"]}
          hideWhenUnavailable
          portal
        />

        <div className="hidden sm:block w-px h-6 bg-border mx-2" />

        {/* Alignment */}
        <div className="flex flex-wrap items-center gap-2">
          <TextAlignButton editor={editor} align="left" />
          <TextAlignButton editor={editor} align="center" />
          <TextAlignButton editor={editor} align="right" />
          <TextAlignButton editor={editor} align="justify" />
        </div>

        <div className="hidden sm:block w-px h-6 bg-border mx-2" />

        {/* Links & highlights */}
        <div className="flex flex-wrap items-center gap-2">
          <LinkPopover
            editor={editor}
            hideWhenUnavailable
            autoOpenOnLinkActive
          />
          <ColorHighlightPopover editor={editor} hideWhenUnavailable />
        </div>

        <div className="hidden sm:block w-px h-6 bg-border mx-2" />

        {/* Undo / Redo */}
        <div className="flex flex-wrap gap-2">
          <UndoRedoButton editor={editor} action="undo" hideWhenUnavailable />
          <UndoRedoButton editor={editor} action="redo" hideWhenUnavailable />
        </div>
      </div>

      {/* Fullscreen button on far right */}
      <div className="ml-auto">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Menubar;
