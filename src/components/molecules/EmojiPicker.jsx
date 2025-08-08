import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const EmojiPicker = ({ onEmojiSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
    "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
    "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
    "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗",
    "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯",
    "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐",
    "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈",
    "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
    "👆", "🖕", "👇", "☝️", "👋", "🤚", "🖐️", "✋", "🖖", "👏",
    "🙌", "🤲", "🤝", "🙏", "✍️", "💪", "🦾", "🦿", "🦵", "🦶",
    "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️",
    "👅", "👄", "💋", "🩸", "👶", "🧒", "👦", "👧", "🧑", "👱",
    "👨", "🧔", "👩", "🧓", "👴", "👵", "🙍", "🙎", "🙅", "🙆",
    "💁", "🙋", "🧏", "🙇", "🤦", "🤷", "👮", "🕵️", "💂", "👷",
    "🤴", "👸", "👳", "👲", "🧕", "🤵", "👰", "🤰", "🤱", "👼",
    "🎅", "🤶", "🦸", "🦹", "🧙", "🧚", "🧛", "🧜", "🧝", "🧞"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={pickerRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ApperIcon name="Smile" size={20} className="text-gray-500" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 max-h-60 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50 animate-scale-in overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-10 gap-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;