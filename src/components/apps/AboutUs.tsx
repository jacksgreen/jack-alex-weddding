const AboutUs = () => (
  <div className="p-4 space-y-4">
    <div className="flex flex-col space-y-4">
      <div className=" p-2">
        <img
          src="/photos/park-hamesila.jpg"
          alt="Couple"
          className="w-full h-48 object-cover mb-2 border border-gray-400 shadow-[inset_0_0_60px_rgba(0,0,0,0.2),4px_4px_0_rgba(0,0,0,0.3)] brightness-105 contrast-105 saturate-110 hue-rotate-[-5deg] sepia-[0.15] hover:saturate-125 hover:sepia-[0.05] transition-all duration-300"
        />
        <p className="text-sm italic text-center">"The day we met..."</p>
      </div>
      <p>
        Alex and Jack met in the summer of 2018 at a rooftop party in Brooklyn.
        Jack spilled his drink on Alex's shoes, and the rest is history. They
        share a love for vintage synthesizers, spicy noodles, and long walks on
        the beach (ironically).
      </p>
      <p>
        After 5 years of adventures, 3 apartments, and 1 cat named "Synth", they
        are finally tying the knot!
      </p>
    </div>
  </div>
);

export default AboutUs;
