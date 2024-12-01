"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle,
  FileText,
  MessageSquare,
  PieChart,
  Shield,
  Users,
  Workflow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();
  return (
    <div className="flex flex-col w-screen min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Empower Your Community with Kestra-Powered Engagement
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A centralized platform for community members to report local
                issues, engage in meaningful discussions, and access valuable
                resources - all powered by Kestra&apos;s advanced workflow
                automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isSignedIn ? (
                  <>
                    <Button size="lg" onClick={() => router.push("/dashboard")}>
                      Continue to Dashboard
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        /* Add your sign out logic here */
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      onClick={() => {
                        /* Add your sign in logic here */
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        /* Add your register logic here */
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Community Platform Preview"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Powerful Kestra-Driven Features for Better Communities
            </h2>
            <p className="text-xl text-muted-foreground">
              Leverage Kestra&apos;s workflow automation to engage with your
              community and make a real difference.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Smart Issue Reporting</CardTitle>
                <CardDescription>
                  Submit and track local issues with Kestra-powered automated
                  categorization and real-time updates.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <PieChart className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Automated Community Polling</CardTitle>
                <CardDescription>
                  Voice your opinion on community matters through secure,
                  Kestra-managed transparent polling.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Bell className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Kestra-Driven Real-Time Updates</CardTitle>
                <CardDescription>
                  Stay informed with instant notifications about issues and
                  community updates, orchestrated by Kestra.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Automated Discussion Forums</CardTitle>
                <CardDescription>
                  Engage in meaningful conversations about community matters,
                  with Kestra managing topic organization and notifications.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Kestra-Powered Data Insights</CardTitle>
                <CardDescription>
                  Make informed decisions based on community feedback and
                  analytics, processed and visualized by Kestra workflows.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your community data is protected with enterprise-grade
                  security, enforced by Kestra&apos;s robust access controls.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Workflow Diagram Section */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Kestra Workflow Powering Your Community
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            See how Kestra orchestrates every aspect of your community
            engagement platform
          </p>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <Workflow className="h-24 w-24 text-gray-400" />
              <span className="sr-only">
                Placeholder for Kestra workflow diagram
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">50k+</h3>
              <p className="text-lg text-muted-foreground">
                Active Community Members
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">10k+</h3>
              <p className="text-lg text-muted-foreground">
                Issues Resolved via Kestra Workflows
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">95%</h3>
              <p className="text-lg text-muted-foreground">
                Satisfaction Rate with Kestra-Powered Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            How Kestra Powers Your Community Engagement
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-foreground text-primary flex items-center justify-center text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Join Your Kestra-Powered Community
              </h3>
              <p className="text-primary-foreground/80">
                Sign up and connect with your local community members through
                Kestra-managed onboarding.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-foreground text-primary flex items-center justify-center text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Report Issues via Kestra Workflows
              </h3>
              <p className="text-primary-foreground/80">
                Submit and track local issues that matter to your community, all
                processed by Kestra&apos;s intelligent workflows.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-foreground text-primary flex items-center justify-center text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Make an Impact with Kestra-Driven Insights
              </h3>
              <p className="text-primary-foreground/80">
                Participate in polls and see real changes in your community,
                facilitated by Kestra&apos;s data processing capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to strengthen your community with Kestra?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of community members making a difference every day
            with our Kestra-powered platform.
          </p>
          {isSignedIn ? (
            <Button size="lg" onClick={() => router.push("/dashboard")}>
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => {
                /* Add your sign up logic here */
              }}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Kestra-Powered Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Kestra Workflow Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/twitter"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/linkedin"
                    className="text-muted-foreground hover:text-primary"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>
              &copy; 2023 Community Engagement Platform Powered by Kestra. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
