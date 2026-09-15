/* =========================================================
   ELEMENTS
========================================================= */

const music =
    document.getElementById("bgMusic");

const fallingContainer =
    document.getElementById("falling-decorations");


/* =========================================================
   MUSIC
========================================================= */

let musicStarted = false;


/*
 * محاولة تشغيل الموسيقى تلقائيًا.
 *
 * ملاحظة:
 * iPhone / Safari قد يمنع الصوت التلقائي.
 * في الحالة دي هنحاول تشغيله مع أول لمسة
 * بدون إظهار أي زر للموسيقى.
 */

function startMusic() {

    if (!music || musicStarted) {
        return;
    }

    music.volume = 0.35;

    const playPromise =
        music.play();

    if (
        playPromise &&
        typeof playPromise.then === "function"
    ) {

        playPromise
            .then(() => {

                musicStarted = true;

            })
            .catch(() => {

                /*
                 * Browser blocked autoplay.
                 * First user interaction will try again.
                 */

            });

    }

}


/* =========================================================
   AUTOPLAY ON PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        /*
         * Try immediately.
         */

        startMusic();


        /*
         * Try once more after a short delay.
         */

        setTimeout(() => {

            startMusic();

        }, 500);

    }
);


/* =========================================================
   FALLBACK MUSIC ON FIRST TOUCH
========================================================= */

function firstUserInteraction() {

    startMusic();

    /*
     * We only need this until music starts.
     */

    if (musicStarted) {

        document.removeEventListener(
            "touchstart",
            firstUserInteraction
        );

        document.removeEventListener(
            "pointerdown",
            firstUserInteraction
        );

    }

}


document.addEventListener(
    "touchstart",
    firstUserInteraction,
    { passive: true }
);

document.addEventListener(
    "pointerdown",
    firstUserInteraction,
    { passive: true }
);


/* =========================================================
   FALLING FLOWERS / HEARTS
========================================================= */

const decorationTypes = [

    "♥",
    "♡",
    "✿",
    "❀",
    "❁",
    "✾",
    "✽",
    "❋"

];


function createFallingDecoration() {

    if (!fallingContainer) {
        return;
    }


    const item =
        document.createElement("span");


    /*
     * Random decoration.
     */

    const randomType =
        decorationTypes[
            Math.floor(
                Math.random() *
                decorationTypes.length
            )
        ];


    item.textContent =
        randomType;


    item.classList.add(
        "falling-item"
    );


    /*
     * Heart or flower.
     */

    if (
        randomType === "♥" ||
        randomType === "♡"
    ) {

        item.classList.add(
            "heart"
        );

    } else {

        item.classList.add(
            "flower"
        );

    }


    /*
     * Random horizontal position.
     */

    item.style.left =
        Math.random() * 100 + "%";


    /*
     * Random size.
     */

    const size =
        10 + Math.random() * 14;

    item.style.fontSize =
        size + "px";


    /*
     * Random falling speed.
     */

    const duration =
        6 + Math.random() * 8;

    item.style.animationDuration =
        duration + "s";


    /*
     * Random horizontal movement.
     */

    const drift =
        Math.random() * 180 - 90;

    item.style.setProperty(
        "--drift",
        drift + "px"
    );


    /*
     * Random rotation.
     */

    const rotation =
        Math.random() * 360 - 180;

    item.style.setProperty(
        "--rotation",
        rotation + "deg"
    );


    /*
     * Slightly random opacity.
     */

    item.style.opacity =
        0.40 + Math.random() * 0.35;


    /*
     * Add to page.
     */

    fallingContainer.appendChild(
        item
    );


    /*
     * Remove after animation.
     */

    setTimeout(() => {

        item.remove();

    }, (duration + 1) * 1000);

}


/* =========================================================
   INITIAL DECORATIONS
========================================================= */

for (
    let i = 0;
    i < 30;
    i++
) {

    setTimeout(() => {

        createFallingDecoration();

    }, i * 180);

}


/* =========================================================
   CONTINUOUS DECORATIONS
========================================================= */

setInterval(() => {

    createFallingDecoration();

}, 400);


/* =========================================================
   COUNTDOWN
========================================================= */


/*
 * FINAL DATE:
 *
 * 24 September 2026
 * 7:00 PM
 */

const weddingDate =
    new Date(
        "Sep 24, 2026 19:00:00"
    ).getTime();


let countdownFinished =
    false;


function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    /*
     * Event date reached.
     */

    if (distance <= 0) {

        if (!countdownFinished) {

            countdownFinished =
                true;


            const countdown =
                document.querySelector(
                    ".countdown"
                );


            if (countdown) {

                countdown.innerHTML = `
                    <div class="countdown-finished">
                        ♥
                        <br>
                        <span>ألف مبروك</span>
                    </div>
                `;

            }

        }

        return;
    }


    /*
     * Days.
     */

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    /*
     * Hours.
     */

    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    /*
     * Minutes.
     */

    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    /*
     * Seconds.
     */

    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    /*
     * Elements.
     */

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    /*
     * Update values.
     */

    if (daysElement) {

        daysElement.textContent =
            String(days);

    }

    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );

    }

    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

    }

    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }

}


/* =========================================================
   COUNTDOWN START
========================================================= */

updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   AUTO SCROLL
========================================================= */

let autoScrollTimer = null;

let autoScrollStopped = false;

let autoScrollStarted = false;


/*
 * Sections in order.
 */

function getSections() {

    return [

        document.querySelector(
            ".childhood-section"
        ),

        document.querySelector(
            ".invitation-section"
        ),

        document.querySelector(
            ".countdown-section"
        ),

        document.querySelector(
            ".date-section"
        ),

        document.querySelector(
            ".message-section"
        ),

        document.querySelector(
            ".location-section"
        )

    ].filter(Boolean);

}


/*
 * Start automatic scrolling.
 */

function startAutoScroll() {

    if (
        autoScrollStarted ||
        autoScrollStopped
    ) {
        return;
    }


    autoScrollStarted =
        true;


    const sections =
        getSections();


    if (!sections.length) {
        return;
    }


    let currentSection =
        0;


    function goNext() {

        if (autoScrollStopped) {
            return;
        }


        /*
         * Finished all sections.
         */

        if (
            currentSection >=
            sections.length
        ) {

            return;

        }


        const section =
            sections[currentSection];


        if (!section) {

            currentSection++;

            goNext();

            return;

        }


        /*
         * Scroll to the next section.
         */

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        currentSection++;


        /*
         * Stay on every section for
         * about 6.5 seconds.
         */

        autoScrollTimer =
            setTimeout(
                goNext,
                6500
            );

    }


    /*
     * First section is already visible.
     * Start moving after a short delay.
     */

    autoScrollTimer =
        setTimeout(
            goNext,
            5000
        );

}


/* =========================================================
   STOP AUTO SCROLL IF USER MANUALLY SCROLLS
========================================================= */

function stopAutoScroll() {

    /*
     * Don't allow the first page opening
     * interaction to stop the auto scroll.
     */

    if (!autoScrollStarted) {
        return;
    }


    if (autoScrollStopped) {
        return;
    }


    autoScrollStopped =
        true;


    if (autoScrollTimer) {

        clearTimeout(
            autoScrollTimer
        );

        autoScrollTimer =
            null;

    }

}


/*
 * User touch after auto-scroll started.
 */

window.addEventListener(
    "touchstart",
    stopAutoScroll,
    { passive: true }
);


/*
 * User wheel / mouse scroll.
 */

window.addEventListener(
    "wheel",
    stopAutoScroll,
    { passive: true }
);


/*
 * Keyboard scrolling.
 */

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowDown" ||
            event.key === "ArrowUp" ||
            event.key === "PageDown" ||
            event.key === "PageUp" ||
            event.key === " "
        ) {

            stopAutoScroll();

        }

    }
);


/* =========================================================
   START AUTO SCROLL AFTER PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            startAutoScroll();

        }, 1200);

    }
);