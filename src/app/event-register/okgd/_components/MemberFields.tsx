"use client";

import UploadFile from "@/components/UploadFile";
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
import en from "react-phone-number-input/locale/en";

interface MemberFieldsProps {
  prefix: string;
}

export default function MemberFields({ prefix }: MemberFieldsProps) {
  const membersOKGDtextFields = [
    {
      name: `${prefix}Name`,
      label: "Name",
      placeholder: "Enter your member name",
    },
    {
      name: `${prefix}Email`,
      label: "Email",
      placeholder: "Enter your member email",
    },
    {
      name: `${prefix}NIK`,
      label: "NIK",
      placeholder: "Enter your member NIK",
    },
    {
      name: `${prefix}NISN`,
      label: "NISN",
      placeholder: "Enter your member NISN",
    },
  ];

  interface FileField {
    [x: string]: string;
    name: string;
    label: string;
    sessionKey: string;
  }

  const membersOKGDfileFields: FileField[] = [
    {
      name: `${prefix}StudentCard`,
      label: "Student Card",
      sessionKey: `${prefix}StudentCard`,
    },
    {
      name: `${prefix}TwibbonProof`,
      label: "Proof of Twibbon Posting",
      sessionKey: `${prefix}TwibbonProof`,
    },
  ];

  return (
    <div className="w-full space-y-4">
      {membersOKGDtextFields.map((fieldData) => {
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
        name={`${prefix}WhatsApp`}
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>WhatsApp</FormLabel>
            <FormControl>
              <PhoneInput
                {...field}
                defaultCountry="ID"
                placeholder="Enter your member whatsapp number"
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

      {membersOKGDfileFields.map((fileField) => (
        <FormField
          key={fileField.name}
          name={fileField.name}
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel isRequired>{fileField.label}</FormLabel>
              <FormControl>
                <UploadFile
                  sessionIdName={fileField.sessionKey}
                  {...field}
                  uploadType="/upload-image/"
                  accept={{
                    "image/jpeg": [],
                    "image/png": [],
                    "image/jpg": [],
                  }} //! there is 2 validation for this parameter, at component and zod
                  maxSizeInBytes={5000000} // 5MB //! there is 2 validation for this parameter, at component and zod
                  onChange={(file) => onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
