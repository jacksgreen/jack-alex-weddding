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
import { useOzMode } from "@/contexts/OzModeContext";

const formSchema = z.object({
  attendingFriday: z.boolean(),
  attendingWedding: z.boolean(),
  email: z.string().email(),
  guestCount: z.number().min(1),
  name: z.string().min(1),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const RSVP = () => {
  const { isOzMode } = useOzMode();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendingFriday: false,
      attendingWedding: true,
      email: "",
      guestCount: 1,
      name: "",
      notes: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      {isOzMode && (
        <div className={`border-2 p-3 mb-4 text-sm ${
          isOzMode
            ? "bg-yellow-900/30 border-yellow-600 text-gray-200"
            : "bg-yellow-50 border-yellow-400 text-black"
        }`}>
          <p className="font-bold mb-1">🐕 Oz's Note:</p>
          <p>
            If you're bringing treats for me, check "Yes". If not... also check
            "Yes" but reconsider your life choices.
          </p>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-bold mb-1">
                  {isOzMode ? "Human's Name" : "Name"}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      isOzMode
                        ? "What do they call you?"
                        : "Your full name"
                    }
                    {...field}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-700" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-bold mb-1">
                  {isOzMode ? "Email (For Spam, Probably)" : "Email"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={
                      isOzMode
                        ? "human@example.com"
                        : "your.email@example.com"
                    }
                    {...field}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-700" />
              </FormItem>
            )}
          />

          {/* Guest Count */}
          <FormField
            control={form.control}
            name="guestCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-bold mb-1">
                  {isOzMode ? "Number of Humans" : "Number of Guests"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-700" />
              </FormItem>
            )}
          />

          {/* Attending Friday */}
          <FormField
            control={form.control}
            name="attendingFriday"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-bold mb-0">
                  {isOzMode ? "Friday Dinner (No dogs allowed 😔)" : "Attending Friday?"}
                </FormLabel>
                <FormMessage className="text-xs text-red-700" />
              </FormItem>
            )}
          />

          {/* Attending Wedding */}
          <FormField
            control={form.control}
            name="attendingWedding"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="text-sm font-bold mb-0">
                  {isOzMode ? "Sunday Wedding (Say yes!)" : "Attending Wedding?"}
                </FormLabel>
                <FormMessage className="text-xs text-red-700" />
              </FormItem>
            )}
          />

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-bold mb-1">
                  {isOzMode ? "Special Requests (Treats for Oz?)" : "Notes"}
                </FormLabel>
                <FormControl>
                  <textarea
                    className={`w-full p-2 min-h-[80px] border rounded shadow-sm focus:outline-none text-sm resize-y ${
                      isOzMode
                        ? "bg-gray-800 border-gray-600 text-gray-100 focus:border-gray-500"
                        : "bg-white border-gray-400 text-black focus:border-black"
                    }`}
                    placeholder={
                      isOzMode
                        ? "Any dietary restrictions? Bringing treats for me?"
                        : "Anything we should know?"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-700" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={status === "submitting"}
            variant="win95"
            className="mt-4"
          >
            {status === "submitting"
              ? isOzMode
                ? "Sending to my humans..."
                : "Submitting..."
              : isOzMode
              ? "Submit (Oz Approved)"
              : "Submit"}
          </Button>

          {message && (
            <div
              className={`text-sm ${
                status === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {isOzMode && status === "success"
                ? "Woof! I'll see you there! - Oz 🐕"
                : message}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default RSVP;
