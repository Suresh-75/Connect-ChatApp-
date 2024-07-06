/* eslint-disable react/display-name */
import React from "react";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import ReportBtn from "./ReportBtn";
import RemoveBtn from "./RemoveBtn";

const AccordionDemo = () => (
  <Accordion.Root
    className="bg-white w-full h-full shadow-black/5  dark:bg-[rgb(14,14,14)]"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>Chat files</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>Shared links</AccordionTrigger>
      <AccordionContent>
        Yes. It's unstyled by default, giving you freedom over the look and
        feel. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
        iure voluptatibus illum autem facere similique consequuntur, odit
        eveniet. Fugit earum possimus at nemo dolor facere eligendi odit
        excepturi ea aliquam!
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>Chat settings</AccordionTrigger>
      <AccordionContent className="h-24">
        <div className="flex flex-col h-24 justify-start">
          <ReportBtn />
          <div className="h-3"></div>
          <RemoveBtn />
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion.Root>
);

const AccordionItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={classNames(
        " overflow-hidden first:mt-0 first:rounded-t last:rounded-b dark:bg-[rgb(14,14,14)]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex ">
      <Accordion.Trigger
        className={classNames(
          "text-black shadow-mauve6   hover:bg-violet-100 focus:bg-violet-100 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none  outline-none  dark:hover:bg-zinc-700 dark:focus:bg-violet-700 dark:text-white  dark:bg-[rgb(14,14,14)]",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          className="text-violet10 ease-&lsqb;cubic-bezier(0.87,_0,_0.13,_1)&rsqb; transition-transform duration-300 group-data-[state=open]:rotate-180 dark:text-white"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames(
        "text-mauve11 bg-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]  dark:bg-[rgb(14,14,14)]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-[15px] px-5">{children}</div>
    </Accordion.Content>
  )
);

export default AccordionDemo;
