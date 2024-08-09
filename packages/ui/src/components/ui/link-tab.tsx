export const LinkTabList = ({ children }: any) => {
    return (
        <>
            <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                {children}
            </div>
        </>
    )
}

export const LinkTab = ({ href, children, isActive, LinkComponent }: {
    href: string,
    children: React.ReactNode,
    isActive: boolean,
    LinkComponent?: any
}) => {

    return (
        <>
        {
            LinkComponent && <LinkComponent className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${isActive ? `bg-background text-foreground shadow-sm` : ''}`}
                href={href}>{children}</LinkComponent>
        }
            <a className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${isActive ? `bg-background text-foreground shadow-sm` : ''}`}
                href={href}>{children}</a>
        </>
    );
}