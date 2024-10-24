import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isSameYear,
    parse,
    parseISO,
    startOfMonth,
    startOfToday,
    startOfWeek,
} from "date-fns";
import {AnimatePresence, motion, useMotionTemplate, useMotionValue} from "framer-motion";
import {useMemo, useState} from "react";
import useMeasure from "react-use-measure";
import {usePrevious} from "../../../lib/use-previous";
import {cn} from "../../../lib/utils";

const variants = {
    enter: ({ direction, width }) => {
        return {
            x: direction * width,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: ({ direction, width }) => {
        return {
            zIndex: 0,
            x: direction * -width,
            opacity: 0,
        };
    },
};

export function Calendar({onChange, error = false, bookedDay = '', scheduledDays = []}) {
    const [ref, bounds] = useMeasure();
    const [booked, setBooked] = useState(scheduledDays.map((day) =>{
        return format(parseISO(day), 'MM/dd/yyyy')
    }))

    const today = startOfToday();

    const radius = 300; // change this to increase the rdaius of the hover effect

    const [visible, setVisible] = useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({currentTarget, clientX, clientY}) {
        let {left, top} = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const [currentMonth, setCurrentMonth] = useState(format(today, "MMyyyy"));
    const prevMonth = usePrevious(currentMonth);


    const direction = prevMonth < currentMonth ? 1 : -1;

    const dateInArray = (date, array) =>{
        const checkDate = format(date, 'MM/dd/yyyy')
            //console.log(checkDate, array)
        return !!array.some(d => d === checkDate)
    };

    const isUserBookedDay = (date, userDate) => {
        return format(date, 'MM/dd/yyyy') === userDate
    }

    const firstDayOfMonth = startOfMonth(
        parse(currentMonth, "MMyyyy", new Date()),
    );

    const days = useMemo(() => {
        return eachDayOfInterval({
            start: startOfWeek(firstDayOfMonth),
            end: endOfWeek(endOfMonth(firstDayOfMonth)),
        });
    }, [firstDayOfMonth]);

    const showToday = useMemo(() => {
        return (
            !isSameMonth(today, parse(currentMonth, "MMyyyy", new Date())) ||
            !isSameYear(today, parse(currentMonth, "MMyyyy", new Date()))
        );
    }, [today, currentMonth]);

    return (
        <motion.div
            style={{
                background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--${error ? 'red' : 'blue'}-500),
          transparent 80%
        )
      `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="w-[405px] h-[383px] p-[2px] rounded-lg transition duration-300 group/input"
        >
        <div className="w-[400px]  p-2 rounded-lg shadow" style={{backgroundColor: '#27272A'}}>
            <div className="flex items-center px-2 mb-1 overflow-hidden">
                <h1 className="font-bold text-lg flex-1">
                    {format(parse(currentMonth, "MMyyyy", new Date()), "MMMM yyyy")}
                </h1>
                <AnimatePresence>
                    {showToday && (
                        <motion.button
                            initial={{ y: -30 }}
                            animate={{
                                y: 0,
                            }}
                            exit={{ y: -30 }}
                            className="px-2 text-sm border rounded-md mr-2 text-gray-100 hover:bg-gray-100 hover:text-gray-600 bg-blue-500"
                            onClick={() => {
                                setCurrentMonth(format(today, "MMyyyy"));
                            }}
                        >
                            Today
                        </motion.button>
                    )}
                </AnimatePresence>
                <div className="flex justify-between">
                    <button
                        className="text-gray-500"
                        onClick={() => {
                            setCurrentMonth(
                                format(
                                    addMonths(parse(currentMonth, "MMyyyy", new Date()), -1),
                                    "MMyyyy",
                                ),
                            );
                        }}
                    >
                        <span className="w-[16px]">◁</span>
                        {/*<svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 48 48"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>*/}
                    </button>
                    <button
                        className="text-gray-500 ml-2"
                        onClick={() => {
                            setCurrentMonth(
                                format(
                                    addMonths(parse(currentMonth, "MMyyyy", new Date()), 1),
                                    "MMyyyy",
                                ),
                            );
                        }}
                    ><span className="w-[16px]">▷</span>
                        {/*<svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 48 48"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>*/}
                    </button>
                </div>
            </div>
            <motion.div
                className="relative overflow-hidden"
                initial={false}
                animate={{
                    height: bounds.height + 40,
                }}
                style={{
                    height: bounds.height + 40,
                }}
            >
                <div className="grid grid-cols-7 place-content-center left-0 right-0">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                        <div key={index} className="p-2">
                            <span className="text-gray-500">{day}</span>
                        </div>
                    ))}
                </div>
                <AnimatePresence
                    initial={false}
                    custom={{
                        direction,
                        width: bounds.width,
                    }}
                >
                    <motion.div
                        ref={ref}
                        variants={variants}
                        custom={{ direction, width: bounds.width }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: {
                                type: "spring",
                                bounce: 0.3,
                            },
                            opacity: { duration: 0.2 },
                        }}
                        className="absolute left-0 right-0 grid grid-cols-7 place-content-center"
                        key={currentMonth}
                    >
                        {days.map((day, index) => {
                            const disabledDay = dateInArray(day, booked)
                            return (
                                <div
                                    key={index}
                                    className={cn({
                                        "p-2": true,
                                        [dayPlacements[day.getDay()]]: true,
                                    })}
                                >
                                    <button
                                        className={cn({
                                            "w-8 h-8 rounded-full flex items-center justify-center":
                                                true,
                                            "text-gray-700": !isSameMonth(day, firstDayOfMonth),
                                            "text-gray-100": isSameMonth(day, firstDayOfMonth),
                                            "bg-blue-500": isSameDay(day, today),
                                            "text-white": isSameDay(day, today),
                                            "bg-gray-500 cursor-not-allowed": disabledDay,
                                            "bg-gray-500": isUserBookedDay(day, bookedDay),
                                        })}
                                        onClick={() => {
                                            if(!disabledDay) {
                                                onChange('date', format(day, 'MM/dd/yyyy'))
                                            }
                                        }}
                                    >
                                        {format(day, "d")}
                                    </button>
                                </div>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
        </motion.div>
    );
}

const dayPlacements = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
];
