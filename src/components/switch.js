import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export const Switch = ({ checked, setChecked, label }) => {
  return (
    <form className="flex space-x-4  antialiased items-center">
      <label
        htmlFor="checkbox"
        className={twMerge(
          "h-8  px-1  flex items-center border border-transparent shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded w-[60px] relative cursor-pointer transition duration-200",
          checked ? "bg-blue-900" : "bg-slate-700 border-slate-500"
        )}
      >
        <motion.div
          initial={{
            width: "20px",
            x: checked ? 0 : 32,
          }}
          animate={{
            height: ["15px", "15px", "15px"],
            width: ["10px", "10px", "10px", "15px"],
            x: checked ? 28 : 5,
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          key={String(checked)}
          className={twMerge(" block rounded bg-white shadow-md z-10")}
        ></motion.div>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="hidden"
          id="checkbox"
        />
      </label>
      <p className="font-medium text-xs text-neutral-300">{label}</p>
    </form>
  );
};
