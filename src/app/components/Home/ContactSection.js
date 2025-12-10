"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section className="bg-[#F9FAFB] py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* Left Side - Contact Info */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="bg-[var(--color-primary)]/10 p-3 rounded-xl">
                <Mail className="text-[var(--color-primary)] w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">contact@mentoroidai.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="bg-[var(--color-primary)]/10 p-3 rounded-xl">
                <Phone className="text-[var(--color-primary)] w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+91 9876543210</p>
              </div>
            </div>

            {/* Office */}
            <div className="flex items-start gap-4">
              <div className="bg-[var(--color-primary)]/10 p-3 rounded-xl">
                <MapPin className="text-[var(--color-primary)] w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Office</h3>
                <p className="text-gray-600">Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <Card className="p-8 shadow-md rounded-2xl bg-white">
          <form className="space-y-5">

            <Input
              type="text"
              placeholder="Your name"
              className="text-gray-900"
            />

            <Input
              type="email"
              placeholder="Enter Your Email"
              className="text-gray-900"
            />

            {/* Native Select */}
            <div>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                <option value="" disabled selected>I am a...</option>
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
                <option value="Teacher">Teacher</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Textarea
              placeholder="Tell us how we can help..."
              rows={4}
              className="text-gray-900"
            />

            <Button className="w-full bg-[var(--color-primary)] text-white hover:bg-gray-900">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
