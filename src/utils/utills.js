import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function extractBookmarks(bookmarkTree) {
  const urls = [];

  function traverse(node) {
    if (node.url) {
      urls.push({url: node.url, title: node.title});
    }
    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  for (const topLevelNode of bookmarkTree) {
    traverse(topLevelNode);
  }

  return urls;
}

