import React from "react"
import { twMerge } from "tailwind-merge"
import { MdArrowOutward } from "react-icons/md"

interface ProcessDetailBoxProps {
  title: string
  description: string
  className: string
  titleClassName?: string
  btnClassName?: string
  clickLink: () => void
  titleRef?: React.Ref<HTMLHeadingElement>
  descRef?: React.Ref<HTMLParagraphElement>
}

const ProcessDetailBox: React.FC<ProcessDetailBoxProps> = ({
  title,
  description,
  className,
  titleClassName,
  btnClassName,
  clickLink,
  titleRef,
  descRef,
}) => {
  return (
    <div
      className={twMerge(
        "absolute w-65 md:w-max h-fit ",
        className
      )}
    >
      <h3
        ref={titleRef}
        className={twMerge("font-semibold mb-2", titleClassName)}
      >
        {title}
      </h3>
      {/* <p className="text-gray-600 mt-1">{description}</p> */}
      <div ref={descRef}>
        <p
          className="text-gray-600 mt-1 pl-2 text-xs md:text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div
          onClick={clickLink}
          className={twMerge(
            "cursor-pointer flex flex-row w-full  md:justify-end pl-2 md:pl-0 mt-2 md:mt-4 text-sm md:text-base",
            btnClassName
          )}
        >
          <p>Learn More</p>
          <MdArrowOutward />
        </div>
        <div className="w-full h-4/5 absolute bottom-0 left-0 rounded-xl blur-xl bg-[#edebeb] -z-10 block md:hidden"></div>
      </div>
    </div>
  )
}

export default ProcessDetailBox
