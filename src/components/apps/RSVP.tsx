import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import cuid from 'cuid'; // at top, needs to be installed if not present

const formSchema = z.object({
  Id: z.string().min(1),
  attendingFriday: z.boolean(),
  attendingWedding: z.boolean(),
  email: z.string().email(),
  guestCount: z.number().min(1),
  name: z.string().min(1),
  notes: z.string().optional(),
  timestamp: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const RSVP = () => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Id: cuid(),
      attendingFriday: false,
      attendingWedding: true,
      email: "",
      guestCount: 1,
      name: "",
      notes: "",
      timestamp: new Date().toISOString(),
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for your RSVP!");
        form.reset();
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to submit RSVP");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
      console.error("RSVP submission error:", error);
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          {/* Email */}
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          {/* Guest Count */}
          <FormField control={form.control} name="guestCount" render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Guests</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          {/* Attending Friday */}
          <FormField control={form.control} name="attendingFriday" render={({ field }) => (
            <FormItem>
              <FormLabel>Attending Friday?</FormLabel>
              <FormControl>
                <input type="checkbox" checked={field.value} onChange={e => field.onChange(e.target.checked)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          {/* Attending Wedding */}
          <FormField control={form.control} name="attendingWedding" render={({ field }) => (
            <FormItem>
              <FormLabel>Attending Wedding?</FormLabel>
              <FormControl>
                <input type="checkbox" checked={field.value} onChange={e => field.onChange(e.target.checked)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          {/* Notes */}
          <FormField control={form.control} name="notes" render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <textarea placeholder="Anything we should know?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting..." : "Submit"}
          </Button>
          {message && (
            <div className={`text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}>{message}</div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default RSVP;
