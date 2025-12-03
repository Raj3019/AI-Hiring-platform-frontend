"use client";

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  UserIcon,
  SettingsIcon,
  CreditCardIcon,
  LogOutIcon
} from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'

const ProfileDropdown = ({
  trigger,
  defaultOpen,
  align = 'end',
  user
}) => {
  const router = useRouter();
  const { logout } = useAuth();

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-80' align={align || 'end'}>
        <DropdownMenuLabel className='flex items-center gap-4 px-4 py-2.5 font-normal'>
          <div className='relative'>
            <Avatar className='size-10'>
              <AvatarImage
                src={user?.profilePicture || ''}
                alt={user?.fullName || 'User'} />
              <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
            </Avatar>
            <span
              className='ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2' />
          </div>
          <div className='flex flex-1 flex-col items-start'>
            <span className='text-foreground text-lg font-semibold'>{user?.fullName || 'User'}</span>
            <span className='text-muted-foreground text-base'>{user?.email || ''}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className='px-4 py-2.5 text-base cursor-pointer'>
            <Link href='/candidate/profile'>
              <UserIcon className='text-foreground size-5' />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='px-4 py-2.5 text-base cursor-pointer'>
            <Link href='/settings'>
              <SettingsIcon className='text-foreground size-5' />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='px-4 py-2.5 text-base cursor-pointer'>
            <Link href='/pricing'>
              <CreditCardIcon className='text-foreground size-5' />
              <span>Billing & Plans</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant='destructive' className='px-4 py-2.5 text-base' onClick={handleLogout}>
          <LogOutIcon className='size-5' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown
