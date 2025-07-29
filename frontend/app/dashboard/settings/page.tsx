"use client"

import { useState } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    User,
    Wallet,
    Shield,
    Bell,
    Palette,
    Save,
    Moon,
    Sun,
    Volume2,
    Lock,
    Eye,
    EyeOff,
    Smartphone,
    Mail,
    MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Sidebar from "@/components/Sidebar"

export default function Settings() {
    const [activeTab, setActiveTab] = useState("account")
    const [walletConnected, setWalletConnected] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false,
        marketing: true,
    })
    const [privacy, setPrivacy] = useState({
        profileVisible: true,
        showActivity: false,
        allowMessages: true,
    })

    const handleSaveAccount = () => {
        // Handle account save logic
        console.log("Account settings saved")
    }

    const handleConnectWallet = () => {
        setWalletConnected(!walletConnected)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="flex">
                <Sidebar />

                <div className="container mx-auto px-8 py-6 max-w-6xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            href="/dashboard"
                            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Dashboard</span>
                        </Link>
                    </div>

                    {/* Page Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Settings</h1>
                        <p className="text-xl text-slate-600">Customize your music platform experience</p>
                    </div>

                    {/* Settings Tabs */}
                    <Card className="border-slate-200">
                        <CardContent className="p-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                                <TabsList className="grid w-full grid-cols-5 bg-slate-100">
                                    <TabsTrigger value="account" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                                        <User className="w-4 h-4 mr-2" />
                                        Account
                                    </TabsTrigger>
                                    <TabsTrigger value="theme" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                                        <Palette className="w-4 h-4 mr-2" />
                                        Theme
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="notifications"
                                        className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                                    >
                                        <Bell className="w-4 h-4 mr-2" />
                                        Notifications
                                    </TabsTrigger>
                                    <TabsTrigger value="web3" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                                        <Wallet className="w-4 h-4 mr-2" />
                                        Web3
                                    </TabsTrigger>
                                    <TabsTrigger value="privacy" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Privacy
                                    </TabsTrigger>
                                </TabsList>

                                {/* Account Settings */}
                                <TabsContent value="account" className="space-y-6">
                                    <Card className="border-slate-200">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <User className="w-5 h-5 mr-3" />
                                                Account Information
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="display-name">Display Name</Label>
                                                    <Input
                                                        id="display-name"
                                                        placeholder="Enter your display name"
                                                        defaultValue="Alex Chen"
                                                        className="border-slate-300 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="username">Username</Label>
                                                    <Input
                                                        id="username"
                                                        placeholder="@username"
                                                        defaultValue="@alexchen"
                                                        className="border-slate-300 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="your.email@example.com"
                                                        defaultValue="alex@example.com"
                                                        className="border-slate-300 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="location">Location</Label>
                                                    <Select>
                                                        <SelectTrigger className="border-slate-300">
                                                            <SelectValue placeholder="Select your location" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="us">United States</SelectItem>
                                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                                            <SelectItem value="ca">Canada</SelectItem>
                                                            <SelectItem value="au">Australia</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="bio">Bio</Label>
                                                <Textarea
                                                    id="bio"
                                                    placeholder="Tell us about yourself..."
                                                    defaultValue="Music enthusiast and Web3 explorer. Love discovering new artists and collecting unique tracks."
                                                    className="border-slate-300 focus:border-blue-500 min-h-[100px]"
                                                />
                                            </div>

                                            <Separator />

                                            <div className="flex items-center justify-between">
                                                <Button onClick={handleSaveAccount} className="bg-blue-600 hover:bg-blue-700">
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save Changes
                                                </Button>
                                                <Badge variant="outline" className="text-slate-600">
                                                    Last updated: 2 days ago
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Theme Settings */}
                                <TabsContent value="theme" className="space-y-6">
                                    <Card className="border-slate-200">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <Palette className="w-5 h-5 mr-3" />
                                                Appearance & Theme
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h4 className="font-medium text-slate-900">Dark Mode</h4>
                                                    <p className="text-sm text-slate-600">Switch between light and dark themes</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Sun className="w-4 h-4 text-slate-500" />
                                                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                                                    <Moon className="w-4 h-4 text-slate-500" />
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="space-y-4">
                                                <h4 className="font-medium text-slate-900">Color Scheme</h4>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <Card className="cursor-pointer border-2 border-blue-500 bg-blue-50">
                                                        <CardContent className="p-4 text-center">
                                                            <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2"></div>
                                                            <p className="text-sm font-medium">Blue (Current)</p>
                                                        </CardContent>
                                                    </Card>
                                                    <Card className="cursor-pointer border-2 border-slate-200 hover:border-purple-300">
                                                        <CardContent className="p-4 text-center">
                                                            <div className="w-8 h-8 bg-purple-600 rounded-full mx-auto mb-2"></div>
                                                            <p className="text-sm font-medium">Purple</p>
                                                        </CardContent>
                                                    </Card>
                                                    <Card className="cursor-pointer border-2 border-slate-200 hover:border-green-300">
                                                        <CardContent className="p-4 text-center">
                                                            <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2"></div>
                                                            <p className="text-sm font-medium">Green</p>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h4 className="font-medium text-slate-900">Compact Mode</h4>
                                                    <p className="text-sm text-slate-600">Reduce spacing for more content</p>
                                                </div>
                                                <Switch />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h4 className="font-medium text-slate-900">Animations</h4>
                                                    <p className="text-sm text-slate-600">Enable smooth transitions and effects</p>
                                                </div>
                                                <Switch defaultChecked />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Notification Settings */}
                                <TabsContent value="notifications" className="space-y-6">
                                    <Card className="border-slate-200">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <Bell className="w-5 h-5 mr-3" />
                                                Notification Preferences
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <Mail className="w-5 h-5 text-slate-500" />
                                                        <div>
                                                            <h4 className="font-medium text-slate-900">Email Notifications</h4>
                                                            <p className="text-sm text-slate-600">Receive updates via email</p>
                                                        </div>
                                                    </div>
                                                    <Switch
                                                        checked={notifications.email}
                                                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <Smartphone className="w-5 h-5 text-slate-500" />
                                                        <div>
                                                            <h4 className="font-medium text-slate-900">Push Notifications</h4>
                                                            <p className="text-sm text-slate-600">Get notified on your device</p>
                                                        </div>
                                                    </div>
                                                    <Switch
                                                        checked={notifications.push}
                                                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <MessageSquare className="w-5 h-5 text-slate-500" />
                                                        <div>
                                                            <h4 className="font-medium text-slate-900">SMS Notifications</h4>
                                                            <p className="text-sm text-slate-600">Receive text messages</p>
                                                        </div>
                                                    </div>
                                                    <Switch
                                                        checked={notifications.sms}
                                                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                                                    />
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="space-y-4">
                                                <h4 className="font-medium text-slate-900">Notification Types</h4>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">New music releases</span>
                                                        <Switch defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">Token price changes</span>
                                                        <Switch defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">Vault rewards available</span>
                                                        <Switch defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">Following activity</span>
                                                        <Switch />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">Marketing updates</span>
                                                        <Switch
                                                            checked={notifications.marketing}
                                                            onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Web3 Settings */}
                                <TabsContent value="web3" className="space-y-6">
                                    <Card className="border-slate-200">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <Wallet className="w-5 h-5 mr-3" />
                                                Web3 & Blockchain Settings
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                                    <div>
                                                        <h4 className="font-medium text-slate-900">Wallet Connection</h4>
                                                        <p className="text-sm text-slate-600">
                                                            {walletConnected ? "Connected to 0x742d...8a1b" : "No wallet connected"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div className="space-y-4">
                                                    <h4 className="font-medium text-slate-900">Network Preferences</h4>
                                                    <div className="space-y-2">
                                                        <Label>Preferred Network</Label>
                                                        <Select defaultValue="sui">
                                                            <SelectTrigger className="border-slate-300">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="sui">Sui Network</SelectItem>
                                                                <SelectItem value="ethereum">Ethereum</SelectItem>
                                                                <SelectItem value="polygon">Polygon</SelectItem>
                                                                <SelectItem value="solana">Solana</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-slate-900">Transaction Settings</h4>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">Auto-approve small transactions</span>
                                                        <Switch />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">High gas fee warnings</span>
                                                        <Switch defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">Transaction confirmations</span>
                                                        <Switch defaultChecked />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Privacy Settings */}
                                <TabsContent value="privacy" className="space-y-6">
                                    <Card className="border-slate-200">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <Shield className="w-5 h-5 mr-3" />
                                                Privacy & Security
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <Eye className="w-5 h-5 text-slate-500" />
                                                        <div>
                                                            <h4 className="font-medium text-slate-900">Public Profile</h4>
                                                            <p className="text-sm text-slate-600">Make your profile visible to others</p>
                                                        </div>
                                                    </div>
                                                    <Switch
                                                        checked={privacy.profileVisible}
                                                        onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <Volume2 className="w-5 h-5 text-slate-500" />
                                                        <div>
                                                            <h4 className="font-medium text-slate-900">Show Listening Activity</h4>
                                                            <p className="text-sm text-slate-600">Let others see what you're listening to</p>
                                                        </div>
                                                    </div>
                                                    <Switch
                                                        checked={privacy.showActivity}
                                                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showActivity: checked })}
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <MessageSquare className="w-5 h-5 text-slate-500" />
                                                        <div>
                                                            <h4 className="font-medium text-slate-900">Allow Direct Messages</h4>
                                                            <p className="text-sm text-slate-600">Receive messages from other users</p>
                                                        </div>
                                                    </div>
                                                    <Switch
                                                        checked={privacy.allowMessages}
                                                        onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })}
                                                    />
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="space-y-4">
                                                <h4 className="font-medium text-slate-900">Data & Analytics</h4>
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">Share usage analytics</span>
                                                        <Switch defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">Personalized recommendations</span>
                                                        <Switch defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-700">Third-party integrations</span>
                                                        <Switch />
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="space-y-4">
                                                <h4 className="font-medium text-slate-900">Account Security</h4>
                                                <div className="space-y-3">
                                                    <Button variant="outline" className="w-full justify-start bg-transparent">
                                                        <Lock className="w-4 h-4 mr-2" />
                                                        Change Password
                                                    </Button>
                                                    <Button variant="outline" className="w-full justify-start bg-transparent">
                                                        <Shield className="w-4 h-4 mr-2" />
                                                        Enable Two-Factor Authentication
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                                                    >
                                                        <EyeOff className="w-4 h-4 mr-2" />
                                                        Delete Account
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
