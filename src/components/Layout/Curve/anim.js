export const text = {
    initial: {
        opacity: 1,
        zIndex: 100,
    },
    enter: {
        opacity: 0,
        top: -100,
        transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]},
        transitionEnd: {top: "47.5%"},
        zIndex: 100,
    },
    exit: {
        opacity: 1,
        top: "40%",
        transition: {duration: .5, delay: .4, ease: [0.33, 1, 0.68, 1]},
        zIndex: 100,
    }
}

export const curve = (initialPath, targetPath) => {
    return {
        initial: {
            d: initialPath,
        },
        enter: {
            d: targetPath,
            transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: initialPath,
            transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
        }
    }
}

export const translate = {
    initial: {
        top: "-300px",
        zIndex: 99
    },
    enter: {
        top: "-100vh",
        transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]},
        transitionEnd: {
            top: "100vh",
            zIndex: 99
        }
    },
    exit: {
        top: "-300px",
        zIndex: 99,
        transition: {duration: .75, ease: [0.76, 0, 0.24, 1]},
        transitionEnd:{
            zIndex: 99
        }
    }
}
