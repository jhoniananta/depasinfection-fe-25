import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { TeacherOKGDtextFields } from "@/contents/okgd-register-content";
import en from "react-phone-number-input/locale/en";

interface StepTeacherProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepTeacher({ onNext, onBack }: StepTeacherProps) {
  return (
    <>
      <Title
        title="Accompanying Teacher"
        desc="Please fill this form to register the competition"
      />

      <div className="space-y-4">
        {TeacherOKGDtextFields.map((fieldData) => {
          return (
            <FormField
              key={fieldData.name}
              name={fieldData.name}
              render={({ field: { value, onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel isRequired>{fieldData.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={fieldData.placeholder}
                      type={fieldData.type}
                      value={value || ""}
                      onChange={onChange}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <FormField
          name="teacherWhatsApp"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>WhatsApp</FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  defaultCountry="ID"
                  placeholder="Enter your teacher whatsapp number"
                  onChange={field.onChange}
                  labels={en}
                  international
                />
              </FormControl>
              <FormDescription>
                Use international format (e.g., +62 812 xxxx xxxx)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="teacherAgreement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>
                  By this, the accompanying teacher declares their willingness
                  to attend the competition.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full px-8 py-6 text-2xl font-bold"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-amber-300 to-yellow-400 px-8 py-6 text-2xl font-bold"
        >
          Next
        </Button>
      </div>
    </>
  );
}
