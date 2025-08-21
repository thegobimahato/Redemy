"use client";

import { useState } from "react";

import { Highlight } from "@tiptap/extension-highlight";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Skeleton } from "../ui/skeleton";
import Menubar from "./Menubar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RichTextEditor = ({ field }: { field: any }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none !w-full !max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    content: field.value ? JSON.parse(field.value) : "<p>Hello World</p>",

    immediatelyRender: false,
  });

  if (!editor) {
    // Show skeleton while editor is initializing
    return (
      <div className="w-full rounded-lg border border-input shadow-sm overflow-hidden">
        <div className="border-b p-2 flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-12 rounded" />
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <div className="p-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border border-input shadow-sm overflow-hidden ${
        isFullscreen
          ? "fixed inset-0 z-50 flex flex-col bg-background"
          : "w-full"
      }`}
    >
      <Menubar
        editor={editor}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
      />
      <div className="relative flex-1 overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
