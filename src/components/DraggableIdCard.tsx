import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const ANCHOR_X = 40; // anchor center within svg coordinate space
const CARD_WIDTH = 176; // w-44
const BASE_TOP = 174; // resting lace length

const DraggableIdCard = () => {
  const [isDragging, setIsDragging] = useState(false);

  // These motion values are updated directly by framer-motion's drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Lace endpoint follows the card's top-center
  const laceEndX = useTransform(x, (v) => ANCHOR_X + v);
  const laceEndY = useTransform(y, (v) => BASE_TOP + v);
  const goldY1 = useTransform(laceEndY, (v) => v - 28);
  const goldY2 = useTransform(laceEndY, (v) => v - 12);

  return (
    <div className="relative" style={{ width: "120px" }}>
      {/* Dynamic lace - stretches from fixed anchors to card */}
      <svg
        width="120"
        height="700"
        className="absolute top-0 left-0 pointer-events-none"
        style={{ overflow: "visible", zIndex: 0 }}
      >
        <motion.line x1={15} y1={0} x2={laceEndX} y2={laceEndY} stroke="#800000" strokeWidth={3.5} strokeLinecap="round" />
        <motion.line x1={65} y1={0} x2={laceEndX} y2={laceEndY} stroke="#800000" strokeWidth={3.5} strokeLinecap="round" />
        <motion.line x1={laceEndX} y1={goldY1} x2={laceEndX} y2={goldY2} stroke="#FFD700" strokeWidth={4} strokeLinecap="round" />
      </svg>

      {/* Draggable card - snaps back to origin on release */}
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.8}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
        style={{ x, y, transformOrigin: "top center", left: ANCHOR_X - CARD_WIDTH / 2, top: BASE_TOP }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        animate={!isDragging ? { rotate: [3, -3, 3] } : undefined}
        transition={!isDragging ? { rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" } } : undefined}
        className="absolute cursor-grab active:cursor-grabbing select-none z-10"
      >
        {/* Clip */}
        <div className="flex justify-center mb-0.5">
          <div className="w-6 h-3 bg-gradient-to-b from-gray-300 to-gray-500 rounded-sm border border-gray-400" />
        </div>

        {/* ID Card */}
        <div className="w-44 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-[#800000] px-3 py-2 text-center">
            <p className="text-[7px] text-yellow-300 font-bold tracking-wide uppercase leading-tight">
              Polytechnic University of the Philippines
            </p>
            <p className="text-[6px] text-white/80 mt-0.5">Student Identification Card</p>
          </div>

          <div className="p-2.5 flex flex-col items-center gap-1.5">
            <div className="w-16 h-16 rounded overflow-hidden border-2 border-[#800000]">
              <img
                src="/id/imresizer-1x1 ID MJ.jpg"
                alt="Student ID photo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center space-y-0.5">
              <p className="text-[10px] font-bold text-gray-900">MJ TUPLANO</p>
              <p className="text-[8px] text-gray-600">BS Information Technology</p>
              <p className="text-[8px] text-gray-600">PUP - Bulacan Campus</p>
            </div>
          </div>

          <div className="bg-[#FFD700] px-3 py-1 text-center">
            <p className="text-[7px] text-[#800000] font-bold">ISKOLAR NG BAYAN</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DraggableIdCard;
