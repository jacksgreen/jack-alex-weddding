const AboutUs = () => (
    <div className="p-4 space-y-4">
        <div className="flex flex-col space-y-4">
            <div className="bg-gray-200 p-2 border border-gray-500">
                <img src="https://placehold.co/400x300/pink/white?text=Alex+and+Jack" alt="Couple" className="w-full h-48 object-cover mb-2 border border-gray-400" />
                <p className="text-sm italic text-center">"The day we met..."</p>
            </div>
            <p>
                Alex and Jack met in the summer of 2018 at a rooftop party in Brooklyn.
                Jack spilled his drink on Alex's shoes, and the rest is history.
                They share a love for vintage synthesizers, spicy noodles, and long walks on the beach (ironically).
            </p>
            <p>
                After 5 years of adventures, 3 apartments, and 1 cat named "Synth", they are finally tying the knot!
            </p>
        </div>
    </div>
);

export default AboutUs;
