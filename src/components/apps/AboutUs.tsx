import { useOzMode } from "@/contexts/OzModeContext";

const AboutUs = () => {
  const { isOzMode } = useOzMode();

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col space-y-4 text-lg">
        <div className=" p-2">
          <img
            src="/photos/park-hamesila.jpg"
            alt="Couple"
            className="w-full aspect-video object-cover mb-2 border border-gray-400 shadow-[inset_0_0_60px_rgba(0,0,0,0.2),4px_4px_0_rgba(0,0,0,0.3)] brightness-105 contrast-105 saturate-110 hue-rotate-[-5deg] sepia-[0.15] hover:saturate-125 hover:sepia-[0.05] transition-all duration-300"
          />
          <p className="text-base italic text-center">
            {isOzMode
              ? '"This is MY park. They just walk in it."'
              : '"Just a casual stroll through Park HaMesila..."'}
          </p>
        </div>
        {isOzMode ? (
          <>
            <p>
              In 2019, two humans showed up in Tel Aviv for what they called a
              "six-month program." Obviously, they needed someone to keep an eye
              on them. Enter: me.
            </p>
            <p>
              They met, started dating, and apparently decided I was the best
              thing about this city. Smart choice. Can't say I blame them.
            </p>
            <p>
              Now they're "software engineers" (I have no idea what that
              means—they just stare at screens all day). We live in Neve Tzedek,
              which is lovely except for Jack's bike situation. It's ALWAYS in
              my way. In the apartment. In the hallway. Blocking my favorite
              sleeping spots.
            </p>
            <p>
              These days, Jack goes on bike rides (without me, rude), Alex
              reorganizes the apartment around said bike, and I graciously allow
              them to accompany me on walks through Park HaMesila. They think
              it's their walk. It's not.
            </p>
            <p>
              Apparently they're getting married now. About time they made their
              commitment to ME official.
            </p>
          </>
        ) : (
          <>
            <p>
              In 2019, a girl from the quiet suburbs of Connecticut and a
              lifelong city boy from London both enrolled in a six-month program
              in Tel Aviv. "It'll be a great experience," they reassured their
              parents. "I'll be back before you know it," they promised.
            </p>
            <p>Spoiler...They did not come back six months later.</p>
            <p>
              They met on the program, started dating, and promptly lost all
              interest in their return flights. Today, they're software
              engineers at different startups in Tel Aviv (healthy boundaries
              and all), living in Neve Tzedek with their dog Oz - who remains
              entirely convinced he's the protagonist of this story.
            </p>

            <p>
              These days, you'll find Jack out on his bike and Alex reminding
              him—lovingly, of course, that it does not belong in the middle of
              the apartment. Or the hallway. Or the bedroom. Otherwise, they're
              visiting family, hanging with friends, or at the dog park with Oz.
              And now, after all these years together, they've decided to make
              it official. No return ticket this time.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
