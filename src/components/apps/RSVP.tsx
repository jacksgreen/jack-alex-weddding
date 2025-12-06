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
    <div className="pt-0 pb-3 px-3" style={{ backgroundColor: "#faf4c6", color: "black" }}>
      {isOzMode && (
        <div className="p-3 mb-4 text-base bg-black/10 text-black" style={{ backgroundColor: "#faf4c6" }}>
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
              <FormItem className="space-y-0">
                <FormLabel className="block text-base font-bold mb-1 whitespace-nowrap text-black">
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
                    className="h-8 text-base mt-0 w-full min-w-0 border border-black/30 text-black placeholder:text-gray-600"
                    style={{ backgroundColor: "#faf4c6" }}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-700" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="block text-base font-bold mb-1 whitespace-nowrap text-black">
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
                    className="h-8 text-base mt-0 w-full min-w-0 border border-black/30 text-black placeholder:text-gray-600"
                    style={{ backgroundColor: "#faf4c6" }}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-700" />
              </FormItem>
            )}
          />

          {/* Guest Count */}
          <FormField
            control={form.control}
            name="guestCount"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="block text-base font-bold mb-1 whitespace-nowrap text-black">
                  {isOzMode ? "Number of Humans" : "Number of Guests"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="h-8 text-base mt-0 w-full min-w-0 border border-black/30 text-black placeholder:text-gray-600"
                    style={{ backgroundColor: "#faf4c6" }}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-700" />
              </FormItem>
            )}
          />

          {/* Events Section */}
          <div className="mt-2">
            <label className="block text-base font-bold mb-1 whitespace-nowrap text-black">Events</label>
            <FormField
              control={form.control}
              name="attendingFriday"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0 mb-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4 mt-0 self-center"
                      style={{ accentColor: "black" }}
                    />
                  </FormControl>
                  <FormLabel className="text-base font-normal mb-0 flex items-center whitespace-nowrap text-black">
                    {isOzMode ? "Friday Dinner (No dogs allowed 😔)" : "Attending Friday?"}
                  </FormLabel>
                  <FormMessage className="text-sm text-red-700" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendingWedding"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0 mt-0 mb-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4 mt-0 self-center"
                      style={{ accentColor: "black" }}
                    />
                  </FormControl>
                  <FormLabel className="text-base font-normal mb-0 flex items-center whitespace-nowrap text-black">
                    {isOzMode ? "Sunday Wedding (Say yes!)" : "Attending Wedding?"}
                  </FormLabel>
                  <FormMessage className="text-sm text-red-700" />
                </FormItem>
              )}
            />
          </div>

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="block text-sm font-bold mb-0.5 text-black">
                  {isOzMode ? "Special Requests (Treats for Oz?)" : "Notes"}
                </FormLabel>
                <FormControl>
                  <textarea
                    className="w-full p-1.5 min-h-[35px] border border-black/30 rounded shadow-sm focus:outline-none text-base resize-y mt-0 text-black placeholder:text-gray-600 focus:border-black"
                    style={{ backgroundColor: "#faf4c6" }}
                    placeholder={
                      isOzMode
                        ? "Any dietary restrictions? Bringing treats for me?"
                        : "Anything we should know?"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-700" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={status === "submitting"}
            variant="win95"
            className="mt-4 text-base h-7 px-2 py-1"
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
              className={`text-base ${
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
