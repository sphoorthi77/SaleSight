/* =========================================================
   SALESIGHT LANDING PAGE
   Interactive concept simulations
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.querySelector(".nav-links");

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

        });

    }

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

            });

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       GENERIC INTERNAL SCROLL BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-scroll]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const selector =
                    button.dataset.scroll;

                const target =
                    document.querySelector(selector);

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });


    /* =====================================================
       OPPORTUNITY JOURNEY
    ===================================================== */

    const journeyStages =
        document.querySelectorAll(".journey-stage");

    const journeyMessage =
        document.getElementById("journeyMessage");

    const journeyScore =
        document.getElementById("journeyScore");

    const journeyResultTitle =
        document.getElementById("journeyResultTitle");

    const journeyResultText =
        document.getElementById("journeyResultText");

    const journeyConfidence =
        document.getElementById("journeyConfidence");

    const confidenceFill =
        document.getElementById("confidenceFill");

    const trackProgress =
        document.getElementById("trackProgress");


    const journeyData = {

        browse: {

            title:
                "Product engagement detected",

            text:
                "The customer viewed and interacted with the product. Engagement alone does not imply a lost sale.",

            score: 54,

            confidence: 51,

            result:
                "Early opportunity signal"

        },

        attempt: {

            title:
                "Checkout attempt detected",

            text:
                "A purchase attempt creates stronger evidence that the customer was considering conversion.",

            score: 63,

            confidence: 59,

            result:
                "Conversion intent signal"

        },

        friction: {

            title:
                "Payment friction detected",

            text:
                "A failed payment can indicate incomplete conversion, especially when other behavioural signals are present.",

            score: 76,

            confidence: 71,

            result:
                "Potential near-sale"

        },

        retry: {

            title:
                "Customer retry detected",

            text:
                "A second attempt strengthens the evidence of purchase intent but still does not guarantee a lost sale.",

            score: 86,

            confidence: 78,

            result:
                "High near-sale potential"

        },

        exit: {

            title:
                "Incomplete conversion signal",

            text:
                "The journey ended without a completed transaction. SaleSight can retain this as an opportunity signal for further analysis.",

            score: 82,

            confidence: 74,

            result:
                "Opportunity identified"

        }

    };


    journeyStages.forEach((stage, index) => {

        stage.addEventListener("click", () => {

            journeyStages.forEach(item => {
                item.classList.remove("active");
            });

            stage.classList.add("active");

            const key =
                stage.dataset.stage;

            const data =
                journeyData[key];

            if (!data) return;

            journeyMessage
                .querySelector("h3")
                .textContent =
                data.title;

            journeyMessage
                .querySelector("p")
                .textContent =
                data.text;

            journeyScore.textContent =
                data.score;

            journeyResultTitle.textContent =
                data.result;

            journeyResultText.textContent =
                data.text;

            journeyConfidence.textContent =
                `${data.confidence}%`;

            confidenceFill.style.width =
                `${data.confidence}%`;

            const progress =
                (index / 4) * 100;

            trackProgress.style.width =
                `${progress}%`;

        });

    });


    /* =====================================================
       DEMAND EARLY-ECHO
    ===================================================== */

    const categorySelect =
        document.getElementById("categorySelect");

    const demandValue =
        document.getElementById("demandValue");

    const demandPattern =
        document.getElementById("demandPattern");

    const demandInterpretation =
        document.getElementById("demandInterpretation");

    const chartPath =
        document.getElementById("chartPath");

    const chartFill =
        document.getElementById("chartFill");


    const demandData = {

        beverages: {

            value: "+18%",

            pattern:
                "Activity is moving above historical baseline.",

            interpretation:
                "Rising category interest.",

            path:
                "M0 245 C90 225 120 230 180 210 C240 190 270 205 330 170 C390 140 430 175 490 145 C550 115 600 130 660 95 C720 70 770 90 820 55 C850 40 875 50 900 25"

        },

        snacks: {

            value: "+12%",

            pattern:
                "Recent activity is consistently exceeding the previous pattern.",

            interpretation:
                "Early category momentum.",

            path:
                "M0 250 C100 245 145 225 210 220 C275 210 315 230 375 190 C430 165 490 175 540 155 C610 135 650 145 710 105 C770 90 820 80 900 55"

        },

        personal: {

            value: "+9%",

            pattern:
                "Recent activity shows a moderate positive deviation.",

            interpretation:
                "Potential emerging demand.",

            path:
                "M0 245 C80 230 150 240 220 215 C300 190 345 205 410 180 C480 165 520 175 590 145 C670 130 730 145 790 100 C840 90 870 70 900 65"

        },

        household: {

            value: "+7%",

            pattern:
                "Activity is beginning to move above the recent baseline.",

            interpretation:
                "Early movement worth monitoring.",

            path:
                "M0 255 C90 250 160 240 220 230 C300 215 350 220 420 205 C500 190 560 200 630 170 C700 155 760 160 820 130 C850 120 875 110 900 100"

        }

    };


    function updateDemand() {

        const key =
            categorySelect.value;

        const data =
            demandData[key];

        if (!data) return;

        demandValue.textContent =
            data.value;

        demandPattern.textContent =
            data.pattern;

        demandInterpretation.textContent =
            data.interpretation;

        chartPath.setAttribute(
            "d",
            data.path
        );

        const fillPath =
            `${data.path} L900 300 L0 300 Z`;

        chartFill.setAttribute(
            "d",
            fillPath
        );

    }


    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            updateDemand
        );

        updateDemand();

    }


    /* =====================================================
       DECISION SANDBOX
    ===================================================== */

    const priceSlider =
        document.getElementById("priceSlider");

    const discountSlider =
        document.getElementById("discountSlider");

    const durationSlider =
        document.getElementById("durationSlider");

    const priceValue =
        document.getElementById("priceValue");

    const discountValue =
        document.getElementById("discountValue");

    const durationValue =
        document.getElementById("durationValue");

    const simulatedPrice =
        document.getElementById("simulatedPrice");

    const scenarioDelta =
        document.getElementById("scenarioDelta");

    const expectedDemand =
        document.getElementById("expectedDemand");

    const expectedRevenue =
        document.getElementById("expectedRevenue");

    const scenarioConfidence =
        document.getElementById("scenarioConfidence");

    const scenarioText =
        document.getElementById("scenarioText");


    function calculateScenario() {

        const price =
            Number(priceSlider.value);

        const discount =
            Number(discountSlider.value);

        const duration =
            Number(durationSlider.value);

        priceValue.textContent =
            price;

        discountValue.textContent =
            discount;

        durationValue.textContent =
            duration;

        simulatedPrice.textContent =
            price;


        /*
            Illustrative calculation only.

            This intentionally does not represent a trained
            ML model or actual merchant economics.
        */

        const priceEffect =
            (500 - price) / 500;

        const discountEffect =
            discount / 100;

        const durationEffect =
            Math.min(duration / 30, 1) * .05;

        let change =
            4 +
            (priceEffect * 42) +
            (discountEffect * 35) +
            (durationEffect * 12);


        change =
            Math.max(
                -8,
                Math.min(change, 24)
            );


        const demand =
            Math.round(
                100 * (1 + change / 100)
            );


        const revenue =
            Math.round(
                demand * price
            );


        const confidence =
            Math.round(
                68 +
                Math.min(
                    10,
                    Math.abs(change)
                )
            );


        const formattedChange =
            `${change >= 0 ? "+" : ""}${Math.round(change)}%`;

        scenarioDelta.textContent =
            formattedChange;

        expectedDemand.textContent =
            demand;

        expectedRevenue.textContent =
            `₹${revenue.toLocaleString("en-IN")}`;

        scenarioConfidence.textContent =
            `${confidence}%`;


        if (change > 15) {

            scenarioText.textContent =
                "The illustrative scenario indicates stronger expected demand under these assumptions.";

        } else if (change > 7) {

            scenarioText.textContent =
                "The illustrative scenario indicates a moderate positive movement.";

        } else if (change >= 0) {

            scenarioText.textContent =
                "The illustrative scenario shows a small positive movement.";

        } else {

            scenarioText.textContent =
                "The illustrative scenario indicates a possible decline under these assumptions.";

        }

    }


    [
        priceSlider,
        discountSlider,
        durationSlider
    ].forEach(slider => {

        if (slider) {

            slider.addEventListener(
                "input",
                calculateScenario
            );

        }

    });


    if (
        priceSlider &&
        discountSlider &&
        durationSlider
    ) {

        calculateScenario();

    }


    /* =====================================================
       DECISION OPTIONS
    ===================================================== */

    const decisionOptions =
        document.querySelectorAll(".decision-option");

    const decisionData = {

        discount: {
            price: 450,
            discount: 10,
            duration: 7
        },

        bundle: {
            price: 480,
            discount: 4,
            duration: 10
        },

        inventory: {
            price: 500,
            discount: 0,
            duration: 14
        },

        none: {
            price: 500,
            discount: 0,
            duration: 1
        }

    };


    decisionOptions.forEach(option => {

        option.addEventListener("click", () => {

            decisionOptions.forEach(item => {
                item.classList.remove("active");
            });

            option.classList.add("active");

            const key =
                option.dataset.decision;

            const data =
                decisionData[key];

            if (!data) return;

            priceSlider.value =
                data.price;

            discountSlider.value =
                data.discount;

            durationSlider.value =
                data.duration;

            calculateScenario();

            document
                .getElementById("simulator")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        });

    });


    /* =====================================================
       DASHBOARD HOTSPOTS
    ===================================================== */

    const hotspotButtons =
        document.querySelectorAll(".hotspot");

    const hotspotInfo =
        document.getElementById("hotspotInfo");


    const hotspotData = {

        nearSale: {

            title:
                "Near-Sale Intelligence",

            text:
                "Surfaces customer and transaction patterns associated with incomplete conversion and potential recovery opportunities."

        },

        demand: {

            title:
                "Demand Intelligence",

            text:
                "Highlights categories and products showing unusual movement compared with historical behaviour."

        },

        simulator: {

            title:
                "Decision Sandbox",

            text:
                "Allows the merchant to compare hypothetical business decisions before execution."

        },

        recommendations: {

            title:
                "Recommended Actions",

            text:
                "Translates detected signals into possible actions while keeping the final decision with the merchant."

        }

    };


    hotspotButtons.forEach(button => {

        button.addEventListener("click", () => {

            const key =
                button.dataset.hotspot;

            const data =
                hotspotData[key];

            if (!data) return;

            hotspotInfo.innerHTML = `

                <span>
                    INTERACTIVE DASHBOARD GUIDE
                </span>

                <h3>
                    ${data.title}
                </h3>

                <p>
                    ${data.text}
                </p>

            `;

        });

    });


    /* =====================================================
       OPPORTUNITY HISTORY
    ===================================================== */

    const historyItems =
        document.querySelectorAll(".timeline-item");

    const timelineDetail =
        document.getElementById("timelineDetail");


    const historyData = {

        mon: {

            title:
                "Recovery opportunity",

            text:
                "A near-sale signal associated with payment friction and repeat customer behaviour."

        },

        tue: {

            title:
                "Beverage activity rising",

            text:
                "Recent beverage activity is moving above the illustrative historical baseline."

        },

        wed: {

            title:
                "Repeat customer friction",

            text:
                "A returning customer experienced transaction friction, increasing the opportunity signal."

        },

        thu: {

            title:
                "Offer scenario",

            text:
                "A simulated pricing or offer change produced an illustrative positive scenario delta."

        },

        fri: {

            title:
                "Snack category shift",

            text:
                "Snack activity showed an illustrative positive deviation worth monitoring."

        }

    };


    historyItems.forEach(item => {

        item.addEventListener("click", () => {

            historyItems.forEach(i => {
                i.classList.remove("active");
            });

            item.classList.add("active");

            const key =
                item.dataset.history;

            const data =
                historyData[key];

            if (!data) return;

            timelineDetail.innerHTML = `

                <span>
                    SELECTED OPPORTUNITY
                </span>

                <h3>
                    ${data.title}
                </h3>

                <p>
                    ${data.text}
                </p>

            `;

        });

    });


    /* =====================================================
       ARCHITECTURE EXPLORER
    ===================================================== */

    const architectureTabs =
        document.querySelectorAll(".architecture-tab");

    const architectureDetail =
        document.getElementById("architectureDetail");


    const architectureData = {

        l1: {

            label:
                "L1 · DATA & SIGNALS",

            title:
                "Capture the context around transactions.",

            items: [
                "Transaction Data",
                "Product / Category",
                "Behavioural Signals",
                "Merchant Signals",
                "Temporal Signals",
                "Historical Patterns"
            ]

        },

        l2: {

            label:
                "L2 · DATA PROCESSING",

            title:
                "Transform raw signals into reusable analytical features.",

            items: [
                "Data Cleaning",
                "Feature Engineering",
                "Signal Aggregation",
                "Feature Store"
            ]

        },

        l3: {

            label:
                "L3 · AI / ML ENGINE",

            title:
                "Apply analytical models to identify patterns and scenarios.",

            items: [
                "Near-Sale Detection",
                "Demand Drift Detection",
                "Decision Simulation",
                "Classification",
                "Anomaly Detection",
                "Scenario Analysis"
            ]

        },

        l4: {

            label:
                "L4 · SALESIGHT INTELLIGENCE",

            title:
                "Translate model outputs into merchant-oriented intelligence.",

            items: [
                "Opportunity Score",
                "Demand Signal",
                "Scenario Delta",
                "Confidence Level",
                "Opportunity History",
                "Recommended Action"
            ]

        },

        l5: {

            label:
                "L5 · MERCHANT EXPERIENCE",

            title:
                "Present intelligence as understandable business information.",

            items: [
                "Merchant Dashboard",
                "Opportunity Insights",
                "Decision Support",
                "Recommended Actions",
                "Scenario Comparison"
            ]

        }

    };


    architectureTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            architectureTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const key =
                tab.dataset.layer;

            const data =
                architectureData[key];

            if (!data) return;

            architectureDetail.innerHTML = `

                <span>
                    ${data.label}
                </span>

                <h3>
                    ${data.title}
                </h3>

                <div class="architecture-items">

                    ${data.items.map(item => `
                        <span>${item}</span>
                    `).join("")}

                </div>

            `;

        });

    });


    /* =====================================================
       MODALS
    ===================================================== */

    const modalButtons =
        document.querySelectorAll("[data-modal]");

    const modalOverlays =
        document.querySelectorAll(".modal-overlay");

    const modalCloseButtons =
        document.querySelectorAll(".modal-close");


    modalButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id =
                button.dataset.modal;

            const modal =
                document.getElementById(id);

            if (modal) {

                modal.classList.add("open");

                document.body.style.overflow =
                    "hidden";

            }

        });

    });


    function closeModals() {

        modalOverlays.forEach(modal => {
            modal.classList.remove("open");
        });

        document.body.style.overflow =
            "";

    }


    modalCloseButtons.forEach(button => {

        button.addEventListener(
            "click",
            closeModals
        );

    });


    modalOverlays.forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModals();
            }

        });

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeModals();
            }

        }
    );


    /* =====================================================
       COUNTER-LIKE HERO ANIMATION
    ===================================================== */

    const metricNumbers =
        document.querySelectorAll(
            ".mini-metrics strong"
        );

    const animateMetric =
        (element, target) => {

            let current = 0;

            const duration = 900;

            const start =
                performance.now();

            function update(time) {

                const progress =
                    Math.min(
                        (time - start) /
                        duration,
                        1
                    );

                current =
                    Math.floor(
                        target * progress
                    );

                element.textContent =
                    current.toLocaleString(
                        "en-IN"
                    );

                if (progress < 1) {

                    requestAnimationFrame(
                        update
                    );

                }

            }

            requestAnimationFrame(
                update
            );

        };


    const metricObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const text =
                            entry.target.textContent
                                .replace(/,/g, "")
                                .replace(/\D/g, "");

                        const target =
                            Number(text);

                        if (
                            Number.isFinite(target) &&
                            target > 0
                        ) {

                            animateMetric(
                                entry.target,
                                target
                            );

                        }

                        metricObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .8
            }
        );


    metricNumbers.forEach(metric => {
        metricObserver.observe(metric);
    });


});