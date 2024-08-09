"use client"

import { usePathname } from "next/navigation"

import { LinkTab, LinkTabList } from "@repo/ui/components/ui/link-tab"

interface BillingNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

export function BillingNav({ className, items, ...props }: BillingNavProps) {
    const pathname = usePathname()

    return (

        <>
            <div className="flex items-center space-x-2 mb-4">
                <LinkTabList>
                    {items.map((item, index: number) => (
                        <LinkTab key={index} href={item.href} isActive={pathname === item.href}>{item.title}</LinkTab>
                    ))}
                </LinkTabList>
            </div>
        </>

    )
}