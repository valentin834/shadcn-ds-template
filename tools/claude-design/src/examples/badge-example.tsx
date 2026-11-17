import {
  Example,
  ExampleWrapper,
} from "@/components/example"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { BadgeCheck, ArrowRightIcon, ArrowUpRightIcon, CircleAlertIcon, CircleCheckIcon, CircleDashedIcon, CirclePauseIcon } from "lucide-react"

export default function BadgeExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <BadgeVariants />
      <BadgeWithIconLeft />
      <BadgeWithIconRight />
      <BadgeWithSpinner />
      <BadgeAsLink />
      <BadgeLongText />
      <BadgeCustomColors />
    </ExampleWrapper>
  )
}

function BadgeVariants() {
  return (
    <Example title="Variants">
      <div className="flex flex-wrap gap-2 style-sera:gap-6">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    </Example>
  )
}

function BadgeWithIconLeft() {
  return (
    <Example title="Icon Left" className="max-w-fit">
      <div className="flex flex-wrap gap-2 style-sera:gap-6">
        <Badge>
          <BadgeCheck data-icon="inline-start" />
          Default
        </Badge>
        <Badge variant="secondary">
          <BadgeCheck data-icon="inline-start" />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <BadgeCheck data-icon="inline-start" />
          Destructive
        </Badge>
        <Badge variant="outline">
          <BadgeCheck data-icon="inline-start" />
          Outline
        </Badge>
        <Badge variant="ghost">
          <BadgeCheck data-icon="inline-start" />
          Ghost
        </Badge>
        <Badge variant="link">
          <BadgeCheck data-icon="inline-start" />
          Link
        </Badge>
      </div>
    </Example>
  )
}

function BadgeWithIconRight() {
  return (
    <Example title="Icon Right" className="max-w-fit">
      <div className="flex flex-wrap gap-2 style-sera:gap-6">
        <Badge>
          Default
          <ArrowRightIcon data-icon="inline-end" />
        </Badge>
        <Badge variant="secondary">
          Secondary
          <ArrowRightIcon data-icon="inline-end" />
        </Badge>
        <Badge variant="destructive">
          Destructive
          <ArrowRightIcon data-icon="inline-end" />
        </Badge>
        <Badge variant="outline">
          Outline
          <ArrowRightIcon data-icon="inline-end" />
        </Badge>
        <Badge variant="ghost">
          Ghost
          <ArrowRightIcon data-icon="inline-end" />
        </Badge>
        <Badge variant="link">
          Link
          <ArrowRightIcon data-icon="inline-end" />
        </Badge>
      </div>
    </Example>
  )
}

function BadgeWithSpinner() {
  return (
    <Example title="With Spinner" className="max-w-fit">
      <div className="flex flex-wrap gap-2 style-sera:gap-6">
        <Badge>
          <Spinner data-icon="inline-start" />
          Default
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <Spinner data-icon="inline-start" />
          Destructive
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Outline
        </Badge>
        <Badge variant="ghost">
          <Spinner data-icon="inline-start" />
          Ghost
        </Badge>
        <Badge variant="link">
          <Spinner data-icon="inline-start" />
          Link
        </Badge>
      </div>
    </Example>
  )
}

function BadgeAsLink() {
  return (
    <Example title="asChild">
      <div className="flex flex-wrap gap-2 style-sera:gap-6">
        <Badge
          render={
            <a href="#">
              Link{" "}
              <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          }
        />
        <Badge
          variant="secondary"
          render={
            <a href="#">
              Link{" "}
              <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          }
        />
        <Badge
          variant="destructive"
          render={
            <a href="#">
              Link{" "}
              <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          }
        />
        <Badge
          variant="ghost"
          render={
            <a href="#">
              Link{" "}
              <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          }
        />
      </div>
    </Example>
  )
}

function BadgeLongText() {
  return (
    <Example title="Long Text">
      <div className="flex flex-wrap gap-2 style-sera:gap-6">
        <Badge variant="secondary">
          A badge with a lot of text to see how it wraps
        </Badge>
      </div>
    </Example>
  )
}

function BadgeCustomColors() {
  // 40-60: statuses stay in greys (variant + icon + label); only destructive is coloured.
  return (
    <Example title="Status (greyscale)" className="max-w-fit">
      <div className="flex flex-wrap gap-2 style-sera:gap-6">
        <Badge variant="secondary">
          <CircleCheckIcon data-icon="inline-start" />
          Active
        </Badge>
        <Badge variant="outline">
          <CircleDashedIcon data-icon="inline-start" />
          Pending
        </Badge>
        <Badge variant="ghost">
          <CirclePauseIcon data-icon="inline-start" />
          Paused
        </Badge>
        <Badge>
          <BadgeCheck data-icon="inline-start" />
          Verified
        </Badge>
        <Badge variant="destructive">
          <CircleAlertIcon data-icon="inline-start" />
          Overdue
        </Badge>
      </div>
    </Example>
  )
}
