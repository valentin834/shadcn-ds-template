"use client"

import { ChevronRightIcon, FileIcon, FileSearchIcon, SearchIcon, TerminalIcon } from "lucide-react"

import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

// Based on the "Rows" and "Task" parts of the official trace example, without
// the AI backend it uses for the streamed variants.
export default function TraceDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Trace>
        <TraceLine status="running">
          <TraceIcon>
            <FileSearchIcon />
          </TraceIcon>
          <TraceTitle>Scanning 52 files</TraceTitle>
        </TraceLine>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <TerminalIcon />
              </TraceIcon>
              <TraceTitle>Ran node --version</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap className="max-h-64">
                v24.13.1
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <a href="#trace">
          <TraceLine>
            <TraceIcon>
              <FileIcon />
            </TraceIcon>
            <TraceTitle>Read src/app/page.tsx</TraceTitle>
            <TraceIcon>
              <ChevronRightIcon />
            </TraceIcon>
          </TraceLine>
        </a>
        <TraceLine status="error">
          <TraceIcon>
            <TerminalIcon />
          </TraceIcon>
          <TraceTitle>npm test failed</TraceTitle>
        </TraceLine>
        <TraceLine status="pending">
          <TraceIcon>
            <SearchIcon />
          </TraceIcon>
          <TraceTitle>Search the docs</TraceTitle>
        </TraceLine>
      </Trace>

      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceTitle>Found the project files</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent keepMounted>
          <Trace>
            <TraceLine>
              <TraceIcon>
                <SearchIcon />
              </TraceIcon>
              <TraceTitle>Searched for app/page.tsx</TraceTitle>
            </TraceLine>
            <TraceLine>
              <TraceIcon>
                <FileIcon />
              </TraceIcon>
              <TraceTitle>Read app/layout.tsx</TraceTitle>
            </TraceLine>
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </div>
  )
}
