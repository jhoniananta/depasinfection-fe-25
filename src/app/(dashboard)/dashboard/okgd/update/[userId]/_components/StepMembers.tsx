import Title from "@/components/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import MemberFields from "./MemberFields";

interface InitialMemberFileUrls {
  studentCard?: string;
  twibbonProof?: string;
}

interface StepMembersProps {
  onNext: () => void;
  onBack: () => void;
  initialMember1Urls?: InitialMemberFileUrls;
  initialMember2Urls?: InitialMemberFileUrls;
}

export default function StepMembers({
  onNext,
  onBack,
  initialMember1Urls,
  initialMember2Urls,
}: StepMembersProps) {
  return (
    <>
      <Title
        title="Members"
        desc="Please fill this form to register the competition"
      />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="member1">
          <AccordionTrigger className="text-[14px] font-medium lg:text-[20px]">
            First Member
          </AccordionTrigger>
          <AccordionContent>
            <MemberFields
              prefix="member1"
              initialFileUrls={initialMember1Urls}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="member2">
          <AccordionTrigger className="text-[14px] font-medium lg:text-[20px]">
            Second Member
          </AccordionTrigger>
          <AccordionContent>
            <MemberFields
              prefix="member2"
              initialFileUrls={initialMember2Urls}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="text-olive-900 w-full px-8 py-6 text-2xl font-bold text-[#a88a44] shadow-md hover:from-amber-400 hover:to-yellow-500 md:px-12 lg:px-14"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="text-olive-900 w-full bg-gradient-to-r from-amber-300 to-yellow-400 px-8 py-6 text-2xl font-bold text-[#a88a44] shadow-md hover:from-amber-400 hover:to-yellow-500 md:px-12 lg:px-14"
        >
          Next
        </Button>
      </div>
    </>
  );
}
