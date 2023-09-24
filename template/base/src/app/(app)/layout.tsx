import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { AppNavCommand } from '@/components/app-nav-command'
import { MainNav } from '@/components/main-nav'
import { SideNav } from '@/components/side-nav'
import { SiteFooter } from '@/components/site-footer'
import { UserAccountNav } from '@/components/user-account-nav'
import { getAuthSession } from '@/lib/auth'

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getAuthSession()

  if (!session?.user) return notFound()

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav
            logoLink="/dashboard"
            items={[
              {
                title: 'Dashboard',
                href: '/dashboard'
              },
              {
                title: 'Users',
                href: '/users'
              },
              {
                title: 'Tasks',
                href: '/tasks'
              }
            ]}
          />
          <div className="flex items-center justify-center space-x-4">
            <AppNavCommand
              modules={{
                task: true
              }}
            />
            <UserAccountNav
              user={{
                name: session.user.name,
                image: session.user.image,
                email: session.user.email
              }}
            />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SideNav
            items={[
              {
                title: 'Dashboard',
                href: '/dashboard',
                icon: 'dashboard'
              },

              {
                title: 'Users',
                href: '/users',
                icon: 'user'
              },
              {
                title: 'Tasks',
                href: '/tasks',
                icon: 'task'
              },
              {
                title: 'Settings',
                href: '/settings',
                icon: 'settings'
              }
            ]}
          />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}

export default Layout
