import type { ComponentType } from "react"

import AttachmentExample from "@/components/examples/attachment-example"
import BubbleExample from "@/components/examples/bubble-example"
import CodeBlockExample from "@/components/examples/code-block-example"
import DrawerExample from "@/components/examples/drawer-example"
import MarkerExample from "@/components/examples/marker-example"
import MessageDemo from "@/components/examples/message-demo"
import MessageScrollerDemo from "@/components/examples/message-scroller-demo"
import QuestionnaireExample from "@/components/examples/questionnaire-example"
import ToastExample from "@/components/examples/toast-example"
import TraceDemo from "@/components/examples/trace-demo"
import { Pattern as FiltersDemo2 } from "@/components/examples/c-filters-2"
import { Pattern as FiltersDemo8 } from "@/components/examples/c-filters-8"
import { Pattern as KanbanDemo } from "@/components/examples/c-kanban-1"
import { Pattern as NumberFieldDemo } from "@/components/examples/c-number-field-1"
import { Pattern as SortableDemo } from "@/components/examples/c-sortable-1"
import { Pattern as StepperDemo5 } from "@/components/examples/c-stepper-5"
import { Pattern as StepperDemo13 } from "@/components/examples/c-stepper-13"
import { Pattern as TimePickerDemo } from "@/components/examples/c-time-picker-2"
import { Pattern as TimelineDemo } from "@/components/examples/c-timeline-1"
import { Pattern as TreeDemo } from "@/components/examples/c-tree-1"
import ActionBarDemo from "@/components/examples/action-bar-demo"
import EditableDemo from "@/components/examples/editable-demo"
import TagsInputDemo from "@/components/examples/tags-input-demo"

export type DemoSource = "shadcn" | "reui" | "diceui"

export type Demo = {
  slug: string
  label: string
  source: DemoSource
  importPath: string
  desc: string
  demos: ComponentType[]
}

export const demos: Demo[] = [
  // shadcn/ui — official components added or reworked since the template
  { slug: "attachment", label: "Attachment", source: "shadcn", importPath: "@/components/ui/attachment", desc: "File and image attachments (chat composer, upload queue)", demos: [AttachmentExample] },
  { slug: "bubble", label: "Bubble", source: "shadcn", importPath: "@/components/ui/bubble", desc: "Chat bubbles with variants, grouping and reactions", demos: [BubbleExample] },
  { slug: "code-block", label: "Code Block", source: "shadcn", importPath: "@/components/ui/code-block", desc: "Highlighted code with header, copy button and line numbers (Shiki)", demos: [CodeBlockExample] },
  { slug: "drawer", label: "Drawer", source: "shadcn", importPath: "@/components/ui/drawer", desc: "Bottom/side drawer, now on Base UI (was Vaul)", demos: [DrawerExample] },
  { slug: "marker", label: "Marker", source: "shadcn", importPath: "@/components/ui/marker", desc: "Inline status line: icon + text, spinner, shimmer", demos: [MarkerExample] },
  { slug: "message", label: "Message", source: "shadcn", importPath: "@/components/ui/message", desc: "Conversation layout: avatar, header, bubbles, footer", demos: [MessageDemo] },
  { slug: "message-scroller", label: "Message Scroller", source: "shadcn", importPath: "@/components/ui/message-scroller", desc: "Chat scroll area with scroll-to-bottom button", demos: [MessageScrollerDemo] },
  { slug: "questionnaire", label: "Questionnaire", source: "shadcn", importPath: "@/components/ui/questionnaire", desc: "Step-by-step questions with choices, progress and skip", demos: [QuestionnaireExample] },
  { slug: "toast", label: "Toast", source: "shadcn", importPath: "@/components/ui/toast", desc: "Base UI toasts (toast.add / toast.promise) — sonner stays available", demos: [ToastExample] },
  { slug: "trace", label: "Trace", source: "shadcn", importPath: "@/components/ui/trace", desc: "Agent activity log: running, error and collapsible steps", demos: [TraceDemo] },

  // ReUI — https://reui.io (base-nova variant)
  { slug: "filters", label: "Filters", source: "reui", importPath: "@/components/reui/filters/filters", desc: "Filter bar / builder with fields, operators and value editors", demos: [FiltersDemo8, FiltersDemo2] },
  { slug: "kanban", label: "Kanban", source: "reui", importPath: "@/components/reui/kanban", desc: "Drag-and-drop board (columns + cards)", demos: [KanbanDemo] },
  { slug: "number-field", label: "Number Field", source: "reui", importPath: "@/components/reui/number-field", desc: "Numeric input with increment / decrement", demos: [NumberFieldDemo] },
  { slug: "sortable", label: "Sortable", source: "reui", importPath: "@/components/reui/sortable", desc: "Drag-and-drop reorderable list", demos: [SortableDemo] },
  { slug: "stepper", label: "Stepper", source: "reui", importPath: "@/components/reui/stepper", desc: "Horizontal or vertical steps for wizards and processes", demos: [StepperDemo5, StepperDemo13] },
  { slug: "time-picker", label: "Time Picker", source: "reui", importPath: "@/components/reui/time-picker", desc: "Hour / minute picker in a popover", demos: [TimePickerDemo] },
  { slug: "timeline", label: "Timeline", source: "reui", importPath: "@/components/reui/timeline", desc: "Vertical timeline for history, activity and status", demos: [TimelineDemo] },
  { slug: "tree", label: "Tree", source: "reui", importPath: "@/components/reui/tree", desc: "Expandable tree (folders, categories, org chart)", demos: [TreeDemo] },

  // Dice UI — https://diceui.com (base-nova variant)
  { slug: "action-bar", label: "Action Bar", source: "diceui", importPath: "@/components/diceui/action-bar", desc: "Floating bar for bulk actions on selected items", demos: [ActionBarDemo] },
  { slug: "editable", label: "Editable", source: "diceui", importPath: "@/components/diceui/editable", desc: "Inline edit: click a value to edit it in place", demos: [EditableDemo] },
  { slug: "tags-input", label: "Tags Input", source: "diceui", importPath: "@/components/diceui/tags-input", desc: "Input that turns entries into removable tags", demos: [TagsInputDemo] },
]

export const sourceLabels: Record<DemoSource, string> = {
  shadcn: "shadcn/ui — nouveaux composants officiels",
  reui: "ReUI (reui.io)",
  diceui: "Dice UI (diceui.com)",
}
