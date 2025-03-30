import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
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
import {
  LeaderOKGDfileFields,
  LeaderOKGDtextFields,
} from "@/contents/okgd-register-content";

import en from "react-phone-number-input/locale/en";

interface StepLeaderProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepLeader({ onNext, onBack }: StepLeaderProps) {
  return (
    <>
      <Title
        title="Leader"
        desc="Please fill this form to register the competition"
      />

      <div className="space-y-4">
        {LeaderOKGDtextFields.map((fieldData) => {
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
          name="leaderWhatsApp"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>WhatsApp</FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  defaultCountry="ID"
                  placeholder="Enter your leader whatsapp number"
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

        {LeaderOKGDfileFields.map((fileField) => (
          <FormField
            key={fileField.name}
            name={fileField.name}
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <FormItem>
                <FormLabel isRequired>{fileField.label}</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder={fileField.placeholder}
                    type="file"
                    accept={fileField.accept}
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <FormDescription>Upload on format .pdf</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
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
