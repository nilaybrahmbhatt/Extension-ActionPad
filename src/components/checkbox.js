import { useState } from "react";
// import { motion } from "motion";
import { Check, Square } from "lucide-react";
import { motion } from "motion/react";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  const variants = {
    checked: {
      pathLength: 1,
      fill: "var(--check-color)",
      stroke: "var(--check-color)",
      transition: {
        duration: 0.2,
      },
    },
    unchecked: {
      pathLength: 0,
      fill: "transparent",
      stroke: "transparent",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="flex items-center">
      <button
        className="relative w-6 h-6 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
        onClick={toggleChecked}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="var(--check-color)"
          fill="transparent"
          className="absolute inset-0 pointer-events-none"
        >
            {
                isChecked?<Check />:null
            }
            
          {/* <motion.path
            d="M20 6 L9 17 L4 12"
            variants={variants}
            animate={isChecked ? "checked" : "unchecked"}
          /> */}
        </motion.svg>

        <style jsx global>{`
          :root {
            --check-color: #3b82f6;
          }

          .dark {
            --check-color: #60a5fa;
          }
        `}</style>
      </button>
      <label
        htmlFor="myCheckbox"
        className="ml-2 text-gray-700 dark:text-gray-200 cursor-pointer"
      >
        Remember me
      </label>
    </div>
  );
};

export default Checkbox;
