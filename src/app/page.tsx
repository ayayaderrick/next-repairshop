import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Mail, MapPin, Phone, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <h1>Home</h1>

      <section className=" py-12 md:py-24 lg:py-32 px-4 md:px-16 bg-blue-50 dark:bg-zinc-900">
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-6xl">
              TechFix Repairs
            </h1>
            <h2 className="text-xl font-medium tracking-tighter sm:text-xl md:text-3xl">
              Professional Computer Repair Services
            </h2>
            <p className="text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Fast, reliable computer repair services for all your tech needs.
              Contact us today!
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:text-foreground"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </Button>
            </div>
          </div>
          <div className=" hidden lg:block">
            <Image
              src="/images/hero-image.jpg"
              width={400}
              height={400}
              alt="Computer repair technician"
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-zinc-100 border-2 mb-6 px-3 py-1 text-sm text-blue-700">
              Contact Information
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get In Touch
            </h2>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We&apos;re here to help with all your computer repair needs. Reach
              out to us using any of the methods below.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          <Card className="shadow-lg">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-zinc-100 p-3">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Phone</h3>
                <p className="text-zinc-500">Call us directly</p>
                <Link
                  href={"#"}
                  className="font-medium text-lg hover:underline"
                >
                  (555) 123-4567
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-zinc-100 p-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-zinc-500">Send us a message</p>
                <Link
                  href={"#"}
                  className="font-medium text-lg hover:underline"
                >
                  info@techfixrepairs.com
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-zinc-100 p-3">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Address</h3>
                <p className="text-zinc-500">Visit our shop</p>
                <p className="font-medium text-lg">
                  123 Tech Street, Kansas, KC 12345
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-6 bg-blue-50 dark:bg-zinc-900">
        <div className="grid gap-20 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Business Hours</h2>
            <div className="grid gap-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Monday - Friday</span>
                </div>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Saturday</span>
                </div>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Sunday</span>
                </div>
                <span>Closed</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <ul className="grid gap-3">
              <li className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                <span>Hardware Repairs & Upgrades</span>
              </li>
              <li className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                <span>Virus & Malware Removal</span>
              </li>
              <li className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                <span>Data Recovery</span>
              </li>
              <li className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                <span>Network Setup & Troubleshooting</span>
              </li>
              <li className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                <span>Software Installation & Updates</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
