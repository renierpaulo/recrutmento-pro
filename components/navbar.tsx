"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, LogOut, User, LayoutDashboard } from "lucide-react"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Sine Santa Maria
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/vagas">
                  <Button variant="ghost">Vagas</Button>
                </Link>
                <Link href="/servicos">
                  <Button variant="ghost">Mão de Obra</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="ghost"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/vagas">
                  <Button variant="ghost">Vagas</Button>
                </Link>
                <Link href="/servicos">
                  <Button variant="ghost">Mão de Obra</Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link href="/registro">
                  <Button>Criar Conta</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
