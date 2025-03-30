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

import { Textarea } from "@/components/ui/textarea";

interface StepTeamInformationProps {
  onNext: () => void;
}

export default function StepTeamInformation({
  onNext,
}: StepTeamInformationProps) {
  return (
    <>
      <Title
        title="Team Information"
        desc="Please fill this form to regist the competition"
      />

      <div className="w-full space-y-4">
        <FormField
          name="teamName"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel isRequired>Team&apos;s Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your team's name"
                  value={value || ""}
                  onChange={onChange}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="schoolName"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel isRequired>School Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your school name"
                  value={value || ""}
                  onChange={onChange}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="schoolAddress"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>School Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your school address"
                  // className="resize-none"
                  value={value || ""}
                  onChange={onChange}
                  {...rest}
                />
              </FormControl>
              <FormDescription>
                Ex : Jln. Mawar, Gg X, No.4, Sukolilo, Surabaya
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="integrityPact"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel isRequired>Integrity Pact</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="application/pdf"
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
      </div>

      <Button
        onClick={onNext}
        className="text-olive-900 w-full bg-gradient-to-r from-amber-300 to-yellow-400 px-8 py-6 text-2xl font-bold text-[#a88a44] shadow-md hover:from-amber-400 hover:to-yellow-500 md:px-12 lg:px-14"
      >
        Next
      </Button>
    </>
  );
}
