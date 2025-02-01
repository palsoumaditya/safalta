import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton  } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import {Button} from '../components/ui/button'
import { ChevronDown, Layout, LayoutDashboard, StarIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '../components/ui/dropdown-menu'
const Header = () => {
  return (
  <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
    <nav className='container mx-auto flex px-4 h-16 items-center justify-between'>
        <Link href='/'>
        <Image src='/logo.png' alt="Safalta logo" width={60} height={60}
        className='h-12 w-auto py-1 object-contain'
        />
        </Link>  
        <div className='flex items-center space-x-2 md:space-x-4'>
            <SignedIn>
                <Link href={'/dashboard'}>
                <Button>
                    <LayoutDashboard className='h-4 w-4'/>
                    <span className='hidden md:block'>Industry Insights</span>
                    
                </Button>
                </Link>
            </SignedIn>
            <DropdownMenu>
        <DropdownMenuTrigger>
        <Button>
                    <StarIcon className='h-4 w-4'/>
                    <span className='hidden md:block'>Growth tools</span>
                    <ChevronDown className='h-4 w-4'/>
                </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

            </div>  
    </nav>
            <SignedOut>
            <SignInButton />
            </SignedOut>
            <SignedIn>
            <UserButton />
            </SignedIn>
</header>
    
  )
}

export default Header