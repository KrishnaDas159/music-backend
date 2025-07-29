'use client'

import React from 'react'
import {
    Headphones,
    Search,
    Grid3X3,
    User,
    Brain,
    Settings,
    TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
const Sidebar = () => {
  const navigate = useRouter()

    const sidebarItems = [
        { icon: Headphones, label: "Dashboard", path: "/dashboard", active: true },
        { icon: Search, label: "Search", path: "/dashboard/search" },
        { icon: Grid3X3, label: "Vaults", path: "/dashboard/vaults" },
        { icon: User, label: "Profile", path: "/dashboard/profile" },
        { icon: Brain, label: "Governance", path: "/dashboard/governance" },
        { icon: Settings, label: "Preferences", path: "/dashboard/settings" },
    ]

    return (
        <div>
            <div className="w-72 bg-white border-r border-slate-200 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Headphones className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">MusicVault</h1>
                            <p className="text-sm text-slate-500">Web3 Music Platform</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <Button
                            key={item.label}
                            variant={item.active ? "default" : "ghost"}
                            onClick={() => navigate.push(item.path)}
                            className={`w-full justify-start h-12 ${item.active
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </Button>
                    ))}
                </nav>

                {/* User Stats */}
                <div className="p-4 border-t border-slate-200">
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-700">Your Balance</span>
                                <TrendingUp className="w-4 h-4 text-green-600" />
                            </div>
                            <p className="text-2xl font-bold text-slate-900">12.45 SUI</p>
                            <p className="text-xs text-slate-500">+2.3% from last week</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Sidebar