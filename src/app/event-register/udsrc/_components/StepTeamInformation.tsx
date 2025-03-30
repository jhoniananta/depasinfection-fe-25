import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          name="university"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel isRequired>University</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your university name"
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
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Nationality</FormLabel>
              <FormControl>
                <CountryDropdown
                  placeholder="Select your nationality"
                  defaultValue={field.value}
                  onChange={(country) => field.onChange(country.alpha3)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="subCompetition"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Sub Competition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your sub competition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="poster-competition">
                    Poster Competition
                  </SelectItem>
                  <SelectItem value="3-minutes-oral-competition">
                    3 Minutes Oral Competition
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="statementLetter"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel isRequired>Statement Letter </FormLabel>
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
