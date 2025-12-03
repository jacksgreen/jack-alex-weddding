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
  canCome: z.boolean().nullable().refine((val) => val !== null, {
    message: "Please select Yes or No",
  }),
  attendingFriday: z.boolean(),
  attendingWedding: z.boolean(),
  email: z.string().min(1, "Must include email").email("Please enter a valid email address"),
  guestCount: z.number().min(1, "Must include at least 1 guest"),
  name: z.string().min(1, "Must include name"),
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
      canCome: null,
      attendingFriday: false,
      attendingWedding: false,
      email: "",
      guestCount: 1,
      name: "",
      notes: "",
    },
  });

  const canCome = form.watch("canCome");

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
    <div className="p-3 space-y-3">
      {/* Header */}
      <div className="text-center mb-1">
        <h2 className="text-2xl font-serif tracking-tight">
          {isOzMode ? "🐕 Oz's RSVP System" : "RSVP"}
        </h2>
        <div className="w-full h-px bg-black/20 mt-1"></div>
      </div>

      {isOzMode && (
        <div className={`border-2 p-2 text-sm shadow-win-in ${
          isOzMode
            ? "bg-yellow-900/30 border-yellow-600 text-gray-200"
            : "bg-yellow-50 border-yellow-400 text-black"
        }`}>
          <p className="font-bold">🐕 Oz's Note:</p>
          <p>
            If you're bringing treats, check "Yes". If not... also check
            "Yes" but reconsider your life choices.
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* Your Information Section */}
          <div>
            <h3 className="font-bold text-sm mb-1.5 flex items-center gap-1.5">
              <span className="text-base">📝</span>
              {isOzMode ? "Human Information" : "Your Information"}
            </h3>
            <div className={`border p-2 shadow-win-in space-y-2 ${
              isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
            }`}>
              {/* Name and Email in row */}
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-bold mb-0.5">
                        {isOzMode ? "Name" : "Name"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={isOzMode ? "Your name" : "Full name"}
                          {...field}
                          className="h-8 text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-700" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-bold mb-0.5">
                        {isOzMode ? "Email" : "Email"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                          className="h-8 text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Can You Come Section */}
          <div>
            <h3 className="font-bold text-sm mb-1.5 flex items-center gap-1.5">
              <span className="text-base">❓</span>
              {isOzMode ? "Can You Come?" : "Can You Come?"}
            </h3>
            <div className={`border p-2 shadow-win-in ${
              isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
            }`}>
              <FormField
                control={form.control}
                name="canCome"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <div
                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer transition-colors border-2 ${
                          field.value === true
                            ? isOzMode
                              ? "bg-gray-700/50 border-yellow-600"
                              : "bg-pastel-blue/30 border-black"
                            : isOzMode
                            ? "border-gray-600"
                            : "border-gray-400"
                        }`}
                        onClick={() => {
                          field.onChange(true);
                          if (!field.value) {
                            form.setValue("attendingWedding", true);
                          }
                        }}
                      >
                        <span className="text-sm font-bold cursor-pointer pointer-events-none">
                          {isOzMode ? "✅ Yes" : "Yes"}
                        </span>
                      </div>
                      <div
                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer transition-colors border-2 ${
                          field.value === false
                            ? isOzMode
                              ? "bg-gray-700/50 border-yellow-600"
                              : "bg-pastel-pink/30 border-black"
                            : isOzMode
                            ? "border-gray-600"
                            : "border-gray-400"
                        }`}
                        onClick={() => {
                          field.onChange(false);
                          form.setValue("attendingFriday", false);
                          form.setValue("attendingWedding", false);
                        }}
                      >
                        <span className="text-sm font-bold cursor-pointer pointer-events-none">
                          {isOzMode ? "❌ No" : "No"}
                        </span>
                      </div>
                    </div>
                    <FormMessage className="text-sm text-red-700" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Event Attendance and Guest Count in row - Only show if canCome is true */}
          {canCome === true && (
            <div className="grid grid-cols-2 gap-3">
            {/* Event Attendance Section */}
            <div className="flex flex-col">
              <h3 className="font-bold text-sm mb-1.5 flex items-center gap-1.5">
                <span className="text-base">{isOzMode ? "🎉" : "📅"}</span>
                {isOzMode ? "Events" : "Events"}
              </h3>
              <div className={`border p-2 shadow-win-in space-y-1.5 flex-1 ${
                isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
              }`}>
                {/* Attending Friday */}
                <FormField
                  control={form.control}
                  name="attendingFriday"
                  render={({ field }) => (
                    <FormItem>
                      <div
                        className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors w-full ${
                          field.value
                            ? isOzMode
                              ? "bg-gray-700/50"
                              : "bg-pastel-blue/30"
                            : ""
                        }`}
                        onClick={() => field.onChange(!field.value)}
                      >
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => {
                              e.preventDefault();
                              field.onChange(!field.value);
                            }}
                            className="w-5 h-5 cursor-pointer pointer-events-none"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-bold cursor-pointer flex-1 pointer-events-none">
                          {isOzMode ? "🕯️ Friday" : "Friday Dinner"}
                        </FormLabel>
                      </div>
                      <FormMessage className="text-sm text-red-700" />
                    </FormItem>
                  )}
                />

                {/* Attending Wedding */}
                <FormField
                  control={form.control}
                  name="attendingWedding"
                  render={({ field }) => (
                    <FormItem>
                      <div
                        className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors w-full ${
                          field.value
                            ? isOzMode
                              ? "bg-gray-700/50"
                              : "bg-pastel-pink/30"
                            : ""
                        }`}
                        onClick={() => field.onChange(!field.value)}
                      >
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => {
                              e.preventDefault();
                              field.onChange(!field.value);
                            }}
                            className="w-5 h-5 cursor-pointer pointer-events-none"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-bold cursor-pointer flex-1 pointer-events-none">
                          {isOzMode ? "💒 Sunday" : "Sunday Wedding"}
                        </FormLabel>
                      </div>
                      <FormMessage className="text-sm text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Party Size Section */}
            <div className="flex flex-col">
              <h3 className="font-bold text-sm mb-1.5 flex items-center gap-1.5">
                <span className="text-base">👥</span>
                {isOzMode ? "Guests" : "Guests"}
              </h3>
              <div className={`border p-2 shadow-win-in flex-1 ${
                isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
              }`}>
                <FormField
                  control={form.control}
                  name="guestCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-bold mb-1">
                        {isOzMode ? "Number" : "Number of Guests"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={10}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          className="h-8 text-sm w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          )}

          {/* Additional Notes Section */}
          <div>
            <h3 className="font-bold text-sm mb-1.5 flex items-center gap-1.5">
              <span className="text-base">💬</span>
              {isOzMode ? "Notes" : "Additional Notes"}
            </h3>
            <div className={`border p-2 shadow-win-in ${
              isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
            }`}>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        className={`w-full p-1.5 min-h-[50px] border rounded shadow-sm focus:outline-none text-sm resize-y ${
                          isOzMode
                            ? "bg-gray-900 border-gray-600 text-gray-100 focus:border-gray-500"
                            : "bg-white border-gray-400 text-black focus:border-black"
                        }`}
                        placeholder={
                          isOzMode
                            ? "Dietary restrictions? Treats for me?"
                            : "Dietary restrictions, song requests, etc."
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-700" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              disabled={status === "submitting"}
              variant="win95"
              className="w-full h-9 text-base"
            >
              {status === "submitting"
                ? isOzMode
                  ? "Sending..."
                  : "Submitting..."
                : isOzMode
                ? "Submit (Oz Approved) 🐕"
                : "Submit RSVP"}
            </Button>

            {message && (
              <div
                className={`mt-2 p-1.5 text-sm text-center border rounded ${
                  status === "success"
                    ? isOzMode
                      ? "bg-green-900/30 border-green-600 text-green-200"
                      : "bg-green-50 border-green-400 text-green-700"
                    : isOzMode
                    ? "bg-red-900/30 border-red-600 text-red-200"
                    : "bg-red-50 border-red-400 text-red-700"
                }`}
              >
                {isOzMode && status === "success"
                  ? "Woof! I'll see you there! - Oz 🐕"
                  : message}
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RSVP;
