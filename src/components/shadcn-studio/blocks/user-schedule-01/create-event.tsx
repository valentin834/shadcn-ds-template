// @ts-nocheck
'use client'

import { useState, useEffect, type ReactNode } from 'react'

import { CalendarIcon, AlertCircleIcon, UploadIcon, Clock8Icon, Trash2Icon, CircleCheckIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

import { cn } from '@/lib/utils'

import { formatBytes, useFileUpload } from '@/hooks/use-file-upload'

type Props = {
  trigger: ReactNode
  defaultOpen?: boolean
  className?: string
}

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
      <DialogTrigger onClick={() => setOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent
        className={cn(
          'flex max-h-[min(800px,80vh)] flex-col gap-0 p-0 focus-visible:outline-0 sm:max-w-[700px] [&>[data-slot=dialog-close]>svg]:size-5',
          className
        )}
      >
        <ScrollArea className='flex max-h-full flex-col overflow-hidden'>
          <div className='flex flex-col gap-4 p-6'>
            <DialogHeader className='mb-2'>
              <DialogTitle className='text-lg leading-7 font-semibold'>Create Event</DialogTitle>
              <DialogDescription className='text-muted-foreground text-sm'>
                Set up your next hangout or plan something fun.
              </DialogDescription>
            </DialogHeader>

            {/* Title */}
            <div>
              <Label htmlFor='title' className='p-1 leading-5'>
                Title
              </Label>
              <Input id='title' type='text' defaultValue='AI Summit London' />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor='description' className='p-1 leading-5'>
                Description
              </Label>
              <Textarea
                id='description'
                rows={3}
                defaultValue='Global leaders gather to explore strategies for economic growth and sustainability, focusing on innovative solutions to tackle climate change and promote green technologies.'
                className='min-h-15 resize-none'
              />
            </div>

            {/* Date, Time */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <Label htmlFor='date' className='p-1 leading-5'>
                  Date
                </Label>
                <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                  <PopoverTrigger render={<Button variant='outline' id='date' className='w-full justify-start gap-2 font-normal' />}><CalendarIcon className='text-foreground size-4' />{date
                                                          ? date
                                                              .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                              .replace(',', '')
                                                          : 'Select date'}</PopoverTrigger>
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

              <div className='w-full'>
                <Label htmlFor='timepicker' className='p-1 leading-5'>
                  Time
                </Label>
                <div className='relative'>
                  <div className='text-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                    <Clock8Icon className='size-4' />
                    <span className='sr-only'>Time</span>
                  </div>
                  <Input
                    type='time'
                    id='time-picker'
                    step='1'
                    defaultValue='11:30:00'
                    className='peer bg-background appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden'
                  />
                </div>
              </div>
            </div>

            {/* Location, Price */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <Label htmlFor='location' className='p-1 leading-5'>
                  Location
                </Label>
                <Select defaultValue='vancouver'>
                  <SelectTrigger id='location' className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='vancouver'>Vancouver, Canada</SelectItem>
                      <SelectItem value='london'>London, United Kingdom</SelectItem>
                      <SelectItem value='singapore'>Singapore</SelectItem>
                      <SelectItem value='davos'>Davos, Switzerland</SelectItem>
                      <SelectItem value='online'>Online</SelectItem>
                      <SelectItem value='venice'>Venice, Italy</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor='price' className='p-1 leading-5'>
                  Price
                </Label>
                <div className='relative'>
                  <div className='text-foreground absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                    <span>$</span>
                  </div>
                  <Input id='price' type='number' placeholder='200' defaultValue='200' className='pl-7' />
                </div>
              </div>
            </div>

            {/* Category, Languages */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <Label htmlFor='category' className='p-1 leading-5'>
                  Category
                </Label>
                <Select defaultValue='technology'>
                  <SelectTrigger id='category' className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='technology'>Technology</SelectItem>
                      <SelectItem value='ai-related'>AI related</SelectItem>
                      <SelectItem value='art-culture'>Art & culture</SelectItem>
                      <SelectItem value='business'>Business</SelectItem>
                      <SelectItem value='science'>Science</SelectItem>
                      <SelectItem value='travel'>Travel</SelectItem>
                      <SelectItem value='education'>Education</SelectItem>
                      <SelectItem value='healthcare'>Healthcare</SelectItem>
                      <SelectItem value='finance'>Finance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor='language' className='p-1 leading-5'>
                  Languages
                </Label>
                <Select defaultValue='english'>
                  <SelectTrigger id='language' className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='english'>English</SelectItem>
                      <SelectItem value='gujarati'>Gujarati</SelectItem>
                      <SelectItem value='hindi'>Hindi</SelectItem>
                      <SelectItem value='spanish'>Spanish</SelectItem>
                      <SelectItem value='french'>French</SelectItem>
                      <SelectItem value='german'>German</SelectItem>
                      <SelectItem value='chinese'>Chinese</SelectItem>
                      <SelectItem value='japanese'>Japanese</SelectItem>
                      <SelectItem value='arabic'>Arabic</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Upload Event Cover */}
            <div className='flex flex-col gap-4 pt-2'>
              <div>
                <div className='text-foreground mb-1.5'>Upload Event Cover</div>
                <div
                  role='button'
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  data-dragging={isDragging || undefined}
                  data-files={files.length > 0 || undefined}
                  className='bg-muted data-[dragging=true]:bg-accent/50 has-[input:focus]:ring-ring/50 flex min-h-18 flex-col justify-center gap-4 overflow-hidden rounded-xl p-4 has-[input:focus]:ring-[3px]'
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
                              <Badge className='bg-primary/10 focus-visible:ring-primary/20 text-primary border-none px-1.5 focus-visible:outline-none'>
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

            <DialogFooter className='flex-row gap-4 pt-2 sm:justify-end'>
              <DialogClose render={<Button variant='outline' size='lg' />}>Cancel
                                          </DialogClose>
              <DialogClose render={<Button size='lg' />}>Create Event</DialogClose>
            </DialogFooter>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleMeetingDialog