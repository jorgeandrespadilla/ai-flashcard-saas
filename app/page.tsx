
"use client";

import { useRef } from "react";
import { Hero } from "./(components)/Hero";
import { Features } from "./(components)/Features";
import { Pricing } from "./(components)/Pricing";
import { getStripe } from "@/lib/stripe";
import { StickyHeader } from "./(components)/Header";

export default function Home() {
    const containerRef = useRef(null);

    const handleSubscribe = async () => {
        const checkoutSession = await fetch('/api/checkout-session', {
            method: 'POST'
        })
        const checkoutSessionData = await checkoutSession.json()

        if (checkoutSession.status === 500) {
            console.error(checkoutSessionData.error)
            return
        }

        const stripe = await getStripe()
        if (!stripe) {
            console.error('Stripe not loaded properly')
            return
        }

        const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutSessionData.id
        })

        if (error) {
            console.warn(error.message)
        }
    }
    return (
        <main
            ref={containerRef}
            className=" bg-gray-100 h-full w-full overflow-y-auto"
        >
            <StickyHeader containerRef={containerRef} />
            <Hero />
            <div className="flex justify-center items-center w-full px-4">
                <div className="max-w-screen-lg w-full" id="features">
                    <Features />
                </div>
            </div>
            <div id="pricing">
                <Pricing handleSubscribe={handleSubscribe} />
            </div>
            <div>
                <section
                    id="clients"
                    className="text-center mx-auto max-w-[80rem] px-6 md:px-8"
                >
                    <div className="py-14">
                        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                            <h2 className="text-center text-2xl font-bold     text-black">
                                MEET OUR TEAM
                            </h2>
                            <h2 className="text-lg font-bold tracking-tight text-gray-600 dark:text-white">
                                Happy to deliver software solutions for you
                            </h2>

                            <div className="mt-6">
                                <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
                                    <li className="flex flex-col items-center">
                                        <img
                                            src="/images/member_jorgeandrespadilla.jpeg"
                                            alt="Jorge Andres Padilla"
                                            className="h-24 w-24 rounded-full object-cover"
                                        />
                                        <p className="mt-2 text-center text-sm font-medium text-black">Jorge Andres Padilla</p>
                                    </li>
                                    <li className="flex flex-col items-center">
                                        <img
                                            src="/images/member_gabrielapadilla.jpeg"
                                            alt="Gabriela Padilla"
                                            className="h-24 w-24 rounded-full object-cover"
                                        />
                                        <p className="mt-2 text-center text-sm font-medium text-black">Gabriela Padilla</p>
                                    </li>
                                    <li className="flex flex-col items-center">
                                        <img
                                            src="/images/member_jennifermena.jpeg"
                                            alt="Jennifer Mena"
                                            className="h-24 w-24 rounded-full object-cover"
                                        />
                                        <p className="mt-2 text-center text-sm font-medium text-black">Jennifer Mena</p>
                                    </li>
                                    <li className="flex flex-col items-center">
                                        <img
                                            src="/images/member_guleednuh.jpeg"
                                            alt="Guleed Nuh"
                                            className="h-24 w-24 rounded-full object-cover"
                                        />
                                        <p className="mt-2 text-center text-sm font-medium text-black">Guleed Nuh</p>
                                    </li>
                                </ul>
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>
                </section>
            </div>


        </main>
    );
}
