import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";

import Section from "~/src/components/landing/section";
import Subtitle from "~/src/components/landing/subtitle";
import Title from "~/src/components/landing/title";
import WithImage from "~/src/components/landing/with-image";
import { siteconfig } from "~/src/constants/siteconfig";

const HomepagePublic = async () => {
  return (
    <>
      <Section className="">
        <Title>gThe only AI-powered chat interface that you need</Title>
        <Subtitle>
          Experience having more control over your usage that best fits your
          needs with cheaper price.
        </Subtitle>
        <Image
          className="border-border rounded-3xl border"
          alt="example"
          src={"/demo2.png"}
          width={1200}
          height={700}
        />
      </Section>
      {/* <Section>
            {social proof}
            </Section> */}
      <Section className="max-w-5xl">
        <Title className="md:text-4xl">Features</Title>
        <WithImage
          type="textOnLeft"
          imageSource="/demo2.png"
          title="Variety of AI models to use"
          subtitle="Chat with any model you want, and continue conversation that was generated by other AI models. Selections from leading AI models such as GPT-4o, Claude 3.5, LLama 3."
        />
        <WithImage
          type="textOnRight"
          imageSource="/demo2.png"
          title="More personalized"
          subtitle="Customize your own system prompt, and reuse it as a Chat Template that can also deal with image input and file input such as a PDF document."
        />
        <WithImage
          type="textOnLeft"
          imageSource="/demo2.png"
          title="Better chat search"
          subtitle="Forgot which chat to continue from? Search better with our search feature that can regonize your input messages as well as output generated AI responses."
        />
      </Section>
      <Section>
        <Title className="md:text-4xl">FAQ</Title>
        <div className="w-full lg:w-96">
          <Accordion type="single" collapsible>
            {/* <AccordionItem value="item-1">
                            <AccordionTrigger>Does it have limit?</AccordionTrigger>
                            <AccordionContent>
                                Yes, but we put less stricter limit because we are using the models' own API, allowing you to generate so much more messages than official chat interface app such as ChatGPT.
                            </AccordionContent>
                        </AccordionItem> */}
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-left">
                How much does it cost?
              </AccordionTrigger>
              <AccordionContent>
                Basic plan costs $7 and Premium plan costs $20. You can see all
                our pricing on <Link href={"/pricing"}>pricing</Link> page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className=" text-left">
                What's the main difference between each plan?
              </AccordionTrigger>
              <AccordionContent>
                All plans let you: access the same AI models; upload images and
                PDFs as input; generates text and images as output, search
                through messages, share chat as read-only chat to others, and
                more.{" "}
                <b>
                  The only difference is the how many messages you sent and
                  receives
                </b>
                , which you can see more detailed on the{" "}
                <Link href={"/pricing"}>pricing</Link> page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className=" text-left">
                Is it refundable?
              </AccordionTrigger>
              <AccordionContent>
                No, our services are not refundable. API costs can get expensive
                quickly (on our side), hence our services being refundable is
                not possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className=" text-left">
                When will {siteconfig.name} available to use?
              </AccordionTrigger>
              <AccordionContent>
                {siteconfig.name} will be available in September. Be sure to
                join our waiting list so you don’t miss out when{" "}
                {siteconfig.name} goes live.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>
      <footer className="border-border mx-2 w-full rounded-md border p-2 text-center lg:mx-auto lg:w-[34rem]">
        <p>
          Built by{" "}
          <Link href={"https://x.com/donprasetiyo"} target="_blank">
            @donprasetiyo
          </Link>
          .
        </p>
      </footer>
    </>
  );
};

export default HomepagePublic;
