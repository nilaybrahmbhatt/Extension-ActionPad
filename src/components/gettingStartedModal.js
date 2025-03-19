import { PlaneIcon } from "lucide-react";
import { motion } from "motion/react";
import { Modal, ModalBody, ModalContent, ModalFooter } from "./animated-modal";

const featureList = [
  {
    title: "Effortlessly Drag & Drop Text and Images",
    image:
      "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Seamlessly Capture Notes, Tasks, and Images from the Web",
    image:
      "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Organize with Precision: Filter by Categories",
    image:
      "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Stay in Control: Sort Your Data for Optimal Efficiency",
    image:
      "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Personalize Your Experience: Customize Your UI Theme",
    image:
      "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Prioritize Visually: Decorate Text to Highlight Key Information",
    image:
      "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Simplify Image Management: Paste and Store Images Directly",
    image:
      "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Effortless Content Capture: Right-Click to Add Images and Text",
    image:
      "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2">
            Welcome to WritingPad <br />
          </h4>
          <div className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
            Just open a new tab and throw in your tasks, notes, links, and
            images
          </div>
          <div className="grid grid-cols-4 gap-5 mt-5">
            {featureList.map((item) => {
              return (
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 10,
                    zIndex: 100,
                  }}
                >
                  <img src={item.image} className="rounded mb-2" />
                  <h4 className="text-xs font-bold text-muted-foreground text-center">
                    {item.title}
                  </h4>
                </motion.div>
              );
            })}
          </div>
          {/* <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Drag & Drop Text/Images
              </span>
            </div>
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Add your Notes/Tasks/Images from web
              </span>
            </div>
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Filter by Categories
              </span>
            </div>
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Sort your data
              </span>
            </div>
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Change your UI theme
              </span>
            </div>
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Amazing Animated UI
              </span>
            </div>
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Decorate your text according to your priority
              </span>
            </div>
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Do not download your fav images, Paste & store Images here
              </span>
            </div>
            <div className="flex  items-center justify-center">
              <PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Write click to add any images, paragraph here from any page
              </span>
            </div>
          </div> */}
        </ModalContent>
        <ModalFooter className="gap-4">
          <button onClick={()=>setOpenModal(false)} className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
            Let's Start
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
