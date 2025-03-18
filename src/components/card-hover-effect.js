import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "../utils/utills";
import { Trash } from "lucide-react";

function distributeArray(arr) {
  const columns = [[], [], []];
  let columnHeights = [0, 0, 0];

  arr.forEach((item, index) => {
    const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
    const itemSize = item.data.length; // Calculate size based on item.data length
    columns[minHeightIndex].push({
      ...item,
      mainIndex: index,
    });
    columnHeights[minHeightIndex] += itemSize;
  });

  return columns;
}

export const HoverEffect = ({ items, className, onDeleteCard }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onDeleteCard(newItems);
  };
  return (
    <div className={cn("grid grid-cols-3", className)}>
      {distributeArray(items).map((itemArr, idx) => {
        return (
          <div key={idx}>
            {itemArr.map((item, id) => {
              return (
                <div
                  key={id}
                  className="relative p-2"
                  onMouseEnter={() => setHoveredIndex(id + "-" + idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AnimatePresence>
                    {hoveredIndex === id + "-" + idx && (
                      <motion.span
                        className="absolute inset-0  bg-sidebar-ring/50 block rounded"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 0.15 },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.15, delay: 0.2 },
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <div
                    className={cn(
                      "rounded p-4 overflow-hidden bg-background border border-border/50 relative z-20"
                    )}
                  >
                    <div className="relative z-50">
                      <div className="text-sm capitalize mb-2 font-bold text-justify"
                        dangerouslySetInnerHTML={{
                          __html: item.data,
                        }}
                      ></div>
                      <div className="flex mt-3 flex-row gap-2 items-center ">
                        <button
                          onClick={() => deleteItem(item.mainIndex)}
                          className={
                            "hover:bg-red-600/50 p-2 rounded " +
                            (hoveredIndex === id + "-" + idx
                              ? "opacity-100"
                              : "opacity-0")
                          }
                        >
                          <Trash size={16} strokeWidth={1.5} />
                        </button>
                        <div className="flex-1 text-xs text-right text-muted-foreground/50">
                          Added on {new Date(item.date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
