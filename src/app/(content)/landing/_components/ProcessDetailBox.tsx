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
  boxRef?: React.Ref<HTMLHeadingElement>
  titleRef?: React.Ref<HTMLHeadingElement>
  descRef?: React.Ref<HTMLParagraphElement>
  bgRef?: React.Ref<HTMLDivElement>
  forceFixedPosition?: boolean // ✅ new prop
  isDetailPage?: boolean
}

const ProcessDetailBox: React.FC<ProcessDetailBoxProps> = ({
  title,
  description,
  className,
  titleClassName,
  btnClassName,
  clickLink,
  boxRef,
  titleRef,
  bgRef,
  descRef,
  forceFixedPosition,
  isDetailPage = false,
}) => {
  return (
    <div
      ref={boxRef}
      className={twMerge(
        "absolute w-max md:w-max h-fit ",
        forceFixedPosition ? "top-0 left-8 md:left-12" : className
      )}
    >
      <div
        ref={titleRef}
        className={twMerge(
          "font-semibold mb-2 relative",
          !forceFixedPosition && titleClassName,
          isDetailPage && "text-lg"
        )}
      >
        <h3>{title}</h3>
      </div>
      <div
        ref={descRef}
        className={twMerge(
          "",
          isDetailPage ? "text-base/7 md:text-base/8" : "text-xs md:text-base"
        )}
      >
        <p
          className="text-gray-600 mt-1 pl-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {!isDetailPage && (
          <>
            <div
              onClick={clickLink}
              className={twMerge(
                "cursor-pointer flex flex-row w-full md:justify-end pl-2 md:pl-0 mt-2 md:mt-4 text-sm md:text-base",
                !forceFixedPosition && btnClassName
              )}
            >
              <p>Learn More</p>
              <MdArrowOutward />
            </div>
          </>
          //
        )}
      </div>
      <div
        ref={bgRef}
        className="w-full h-full absolute bottom-0 left-0 rounded-xl blur-sm md:blur-xl bg-[#edebeb] -z-20"
      />
    </div>
  )
}

export default ProcessDetailBox
