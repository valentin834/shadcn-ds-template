'use client'

import { useState, useEffect, type ReactNode } from 'react'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogPortal,
  DialogOverlay
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

import { cn } from '@/lib/utils'

import { formatBytes, useFileUpload } from '@/hooks/use-file-upload'
import { XIcon, CalendarIcon, Clock8Icon, UploadIcon, CircleCheckIcon, Trash2Icon, AlertCircleIcon } from 'lucide-react'

type Props = {
  trigger: ReactNode
  defaultOpen?: boolean
  className?: string
}

const locationItems = [
  { label: 'Vancouver, Canada', value: 'vancouver' },
  { label: 'London, United Kingdom', value: 'london' },
  { label: 'Singapore', value: 'singapore' },
  { label: 'Davos, Switzerland', value: 'davos' },
  { label: 'Online', value: 'online' },
  { label: 'Venice, Italy', value: 'venice' }
]

const categoryItems = [
  { label: 'Technology', value: 'technology' },
  { label: 'AI related', value: 'ai-related' },
  { label: 'Art & culture', value: 'art-culture' },
  { label: 'Business', value: 'business' },
  { label: 'Science', value: 'science' },
  { label: 'Travel', value: 'travel' },
  { label: 'Education', value: 'education' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Finance', value: 'finance' }
]

const languageItems = [
  { label: 'English', value: 'english' },
  { label: 'Gujarati', value: 'gujarati' },
  { label: 'Hindi', value: 'hindi' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'French', value: 'french' },
  { label: 'German', value: 'german' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Arabic', value: 'arabic' }
]

const ScheduleMeetingDialog = ({ defaultOpen = false, trigger, className }: Props) => {
  const [open, setOpen] = useState(defaultOpen)
  const [datePopoverOpen, setDatePopoverOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024
  const maxFiles = 6

  const [
    { files, isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps }
  ] = useFileUpload({
    maxSize,
    multiple: true,
    maxFiles
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<span />} nativeButton={false} onClick={() => setOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay forceRender />
        <DialogPrimitive.Popup
          data-slot='dialog-content'
          className={cn(
            'bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 text-sm ring-1 duration-100 outline-none sm:max-w-sm',
            'flex max-h-[min(800px,80vh)] flex-col gap-0 p-0 focus-visible:outline-0 sm:max-w-175 [&>[data-slot=dialog-close]>svg]:size-5',
            className
          )}
        >
          <DialogPrimitive.Close
            data-slot='dialog-close'
            render={<Button variant='ghost' className='absolute top-2 right-2' size='icon-sm' />}
          >
            <XIcon />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
          <DialogHeader className='gap-1 p-5'>
            <DialogTitle className='text-base leading-6 font-medium'>Create Event</DialogTitle>
            <DialogDescription className='text-muted-foreground text-sm'>
              Set up your next hangout or plan something fun.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className='flex max-h-full flex-col overflow-hidden'>
            <div className='flex flex-col gap-5 p-5 pt-0'>
              {/* Title */}
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input id='title' type='text' defaultValue='AI Summit London' />
              </div>

              {/* Description */}
              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  rows={3}
                  defaultValue='Global leaders gather to explore strategies for economic growth and sustainability, focusing on innovative solutions to tackle climate change and promote green technologies.'
                  className='min-h-15 resize-none'
                />
              </div>

              {/* Date, Time */}
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='date'>Date</Label>
                  <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                    <PopoverTrigger
                      render={<Button variant='outline' id='date' />}
                      className='w-full justify-start gap-2 font-normal'
                    >
                      <CalendarIcon className='text-foreground size-4' />
                      {date
                        ? date
                            .toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                            .replace(',', '')
                        : 'Select date'}
                    </PopoverTrigger>
                    <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                      {mounted && (
                        <Calendar
                          mode='single'
                          selected={date}
                          onSelect={date => {
                            setDate(date)
                            setDatePopoverOpen(false)
                          }}
                        />
                      )}
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='timepicker'>Time</Label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Clock8Icon className='text-foreground' />
                    </InputGroupAddon>
                    <InputGroupInput
                      type='time'
                      id='time-picker'
                      step='1'
                      defaultValue='11:30:00'
                      className='appearance-none [&::-webkit-calendar-picker-indicator]:hidden'
                    />
                  </InputGroup>
                </div>
              </div>

              {/* Location, Price */}
              <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                  <Label className='mb-2' htmlFor='location'>
                    Location
                  </Label>
                  <Select defaultValue='vancouver' items={locationItems}>
                    <SelectTrigger id='location' className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {locationItems.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='price'>Price</Label>
                  <InputGroup>
                    <InputGroupAddon>
                      <span className='text-foreground'>$</span>
                    </InputGroupAddon>
                    <InputGroupInput id='price' type='number' placeholder='200' defaultValue='200' />
                  </InputGroup>
                </div>
              </div>

              {/* Category, Languages */}
              <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                  <Label className='mb-2' htmlFor='category'>
                    Category{' '}
                  </Label>
                  <Select defaultValue='technology' items={categoryItems}>
                    <SelectTrigger id='category' className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoryItems.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className='mb-2' htmlFor='language'>
                    Languages
                  </Label>
                  <Select defaultValue='english' items={languageItems}>
                    <SelectTrigger id='language' className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {languageItems.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Upload Event Cover */}
              <div className='flex flex-col gap-4'>
                <div>
                  <div className='text-foreground mb-1.5 text-base'>Upload Event Cover</div>
                  <div
                    role='button'
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    data-dragging={isDragging || undefined}
                    data-files={files.length > 0 || undefined}
                    className='bg-muted has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 flex min-h-18 flex-col justify-center gap-4 overflow-hidden rounded-xl p-4 has-[input:focus]:ring-[3px]'
                  >
                    <input {...getInputProps()} className='sr-only' aria-label='Upload file' />
                    <Button
                      className='bg-primary/10 text-primary hover:bg-primary/20 rounded-sm'
                      size='lg'
                      onClick={openFileDialog}
                    >
                      Select Files
                      <UploadIcon />
                    </Button>
                    {files.length > 0 && (
                      <div className='flex w-full flex-col gap-4'>
                        <Separator />
                        {files.map(file => {
                          return (
                            <div
                              key={file.id}
                              className='flex items-center justify-between gap-2 transition-opacity duration-300'
                            >
                              <div className='flex flex-wrap items-center gap-2'>
                                <div className='flex items-center gap-2'>
                                  <CircleCheckIcon className='size-4 shrink-0' />
                                  <p className='truncate text-sm font-semibold text-ellipsis max-sm:max-w-35 sm:max-w-65 md:max-w-100'>
                                    {file.file instanceof File ? file.file.name : file.file.name}
                                  </p>
                                </div>
                                <Badge className='bg-primary/10 text-primary focus-visible:ring-primary/20 border-none px-1.5 focus-visible:outline-none'>
                                  {formatBytes(file.file instanceof File ? file.file.size : file.file.size)}
                                </Badge>
                              </div>
                              <Button
                                onClick={() => removeFile(file.id)}
                                variant='ghost'
                                aria-label='remove file'
                                className='size-6'
                              >
                                <Trash2Icon className='text-muted-foreground size-5' />
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {errors.length > 0 && (
                  <div className='text-destructive flex items-center gap-1 text-xs' role='alert'>
                    <AlertCircleIcon className='size-3 shrink-0' />
                    <span>{errors[0]}</span>
                  </div>
                )}
              </div>

              <div className='flex gap-4 sm:justify-end'>
                <DialogClose render={<Button variant='outline' size='lg' />}>Cancel</DialogClose>
                <DialogClose render={<Button size='lg' />}>Create Event</DialogClose>
              </div>
            </div>
          </ScrollArea>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}

export default ScheduleMeetingDialog
