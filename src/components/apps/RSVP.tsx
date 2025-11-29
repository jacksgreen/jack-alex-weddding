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

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" }),
  attending: z.enum(["yes", "no"]),
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
      firstName: "",
      lastName: "",
      email: "",
      attending: "yes",
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
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-bold mb-1">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-bold mb-1">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-bold mb-1">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    className="h-8 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attending"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-bold mb-1">
                  Will you be attending?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="Select your response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
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
            {status === "submitting" ? "Submitting..." : "Submit"}
          </Button>

          {message && (
            <div
              className={`text-sm ${
                status === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default RSVP;
