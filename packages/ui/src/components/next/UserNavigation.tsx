'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@repo/ui/components/ui/dropdown-menu";
import { type Session, type User } from "lucia";
import LogOut from '@repo/ui/components/next/LogOut'
import Link from 'next/link'

type Plan = { product: { id: string; public_id: string; name: string; description: string; }; } | undefined

export function UserNavigation({ session, user, plan }: { session: Session, user: any, plan: Plan}) {

  const planText = plan === undefined ? 'Free plan' : plan.product.name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.discord_user_id && user.discord_avatar_id ? `https://cdn.discordapp.com/avatars/${user.discord_user_id}/${user.discord_avatar_id}.png` : ''} alt={`@${user.discord_username ?? 'Error'}`} />
            <AvatarFallback>{user.username ? user.username[0].toUpperCase() : "Error"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-border" align="end" forceMount>
        <DropdownMenuLabel className="font-normal flex flex-row justify-between items-center" asChild>
          <div>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.username ?? 'Error'}</p>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {planText}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="px-0 py-0" asChild>
            <Link href={'/account'} className="w-full block px-2 py-1.5 cursor-pointer">
              Account
            </Link>
            {/* <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="px-0 py-0" asChild>
            <Link href={'/account/billing'} className="w-full block px-2 py-1.5 cursor-pointer">
              Billing
            </Link>
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogOut />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}