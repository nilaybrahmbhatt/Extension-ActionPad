import {
  ArrowDownUp,
  ClipboardPaste,
  Grip,
  Highlighter,
  ListFilterPlus,
  Palette,
  PlaneIcon,
  ScanSearch,
  SquareDashedMousePointer,
} from "lucide-react";
import { motion } from "motion/react";
import { Modal, ModalBody, ModalContent, ModalFooter } from "./animated-modal";

const featureList = [
  {
    title: "Effortlessly Drag & Drop Text and Images",
    icon: <Grip />,
  },
  {
    title: "Seamlessly Capture Notes, Tasks, and Images from the Web",
    icon: <ScanSearch />,
  },
  {
    title: "Organize with Precision: Filter by Categories",
    icon: <ListFilterPlus />,
  },
  {
    title: "Sort Your Data for Optimal Efficiency",
    icon: <ArrowDownUp />,
  },
  {
    title: "Customize Your UI Theme",
    icon: <Palette />,
  },
  {
    title: "Decorate Text to Highlight Key Information",
    icon: <Highlighter />,
  },
  {
    title: "Paste and Store Images Directly",
    icon: <ClipboardPaste />,
  },
  {
    title: "Effortless Content Capture: Right-Click to Add Images and Text",
    icon: <SquareDashedMousePointer />,
  },
];

export default function GettingStartedModal({ openModal, setOpenModal }) {
  return (
    <Modal>
      <ModalBody
        open={openModal}
        setOpen={(e) => {
          setOpenModal(e);
        }}
      >
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center">
            Welcome to WritingPad <br />
          </h4>
          <div className="px-1 py-0.5 text-muted-foreground rounded-md  border-border/70 border-b border-dashed pb-5  ">
            Just open a new tab and throw in your tasks, notes, links, and
            images
          </div>
          <div className="grid grid-cols-4 gap-5">
            {featureList.map((item) => {
              return (
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 10,
                    zIndex: 100,
                  }}
                >
                  {item.icon ? (
                    <div className="min-h-16 items-center justify-center flex ">
                      {item.icon}
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      className="rounded mb-2 h-24 w-full bg-black object-contain "
                    />
                  )}
                  {/* <img src={item.image} className="rounded mb-2 h-24 w-full bg-black object-contain " /> */}
                  <h4 className="text-xs font-bold text-muted-foreground text-center">
                    {item.title}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button
            onClick={() => setOpenModal(false)}
            className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-3 rounded-md border border-black w-36"
          >
            Let's Start
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
