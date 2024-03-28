import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <button
        onClick={() => {
          window.open("/files/ericliu_developer_CV.pdf", "_blank");
        }}
        className="bg-sky-800 fixed bottom-[60px] right-[60px] text-white py-4 px-8 rounded-[20px] font-bold text-lg mt-16  hover:bg-sky-700"
      >
        My Resume
      </button>
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section mobileTop>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">Yinze Liu</span>
      </h1>
      <motion.p
        className="text-lg text-gray-100 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I am a frontend developer committed
        <br />
        to creating exceptional user experiences and
        <br />
        efficient website development.
      </motion.p>
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-rose-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16 hover:bg-rose-400`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "React / Next.js",
    level: 90,
  },
  {
    title: "Vue / Nuxt.js  ",
    level: 90,
  },
  {
    title: "Nodejs / Express / koa",
    level: 80,
  },

  {
    title: "Typescript",
    level: 90,
  },
  {
    title: "UI/UX Design / 3D Modeling",
    level: 60,
  },
];
const languages = [
  {
    title: "Chinese",
    level: 100,
  },
  {
    title: "🇺🇸 English",
    level: 80,
  },
  {
    title: "🇯🇵 Japanese",
    level: 20,
  },
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div className="w-full" whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-full md:w-64" key={index}>
              <motion.h3
                className="text-lg md:text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-4 w-full bg-rose-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-rose-800 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">
            Languages
          </h2>
          <div className="mt-8 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-rose-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-rose-500 rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <div className="flex gap-8 mt-[600PX] items-center">
          <button
            className="w-[35px] h-[35px] hover:bg-rose-600 transition-colors text-white rounded-[50%] border-white border-2"
            onClick={previousProject}
          >
            <img
              src="/images/left.png"
              alt="Example Image"
              className="m-auto"
            />
          </button>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Projects
          </h2>
          <button
            className="w-[35px] h-[35px]  hover:bg-rose-600 transition-colors text-white  rounded-[50%] border-white border-2"
            onClick={nextProject}
          >
            <img
              src="/images/right.png"
              alt="Example Image"
              className="m-auto"
            />
          </button>
        </div>
      </div>
    </Section>
  );
};

const ContactSection = () => {
  const [state, handleSubmit] = useForm("xoqglvbo");
  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-bold text-white">Contact me</h2>
      <div className="mt-8  rounded-[50%] bg-opacity-50 w-[550px] max-w-full">
        {state.succeeded ? (
          <p className=" text-left  text-white ">Thanks for your message !</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="md:flex">
              <label
                // for="name"
                className="font-medium text-white block mb-1 w-[60px]"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="inline-block w-full rounded-[30px] border-0 text-gray-900 shadow-sm rounded-[30px] ring-inset outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 p-3"
              />
            </div>
            <div className="md:flex mt-5">
              <label
                // for="email"
                className="font-medium text-white block mb-1 w-[60px]"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="block w-full outline-none rounded-[30px] border-0 text-gray-900 shadow-sm  ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 p-3"
              />
              <ValidationError
                className="mt-1 font-bold text-rose-500"
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
            <div className="md:flex mt-5">
              <label
                // for="email"
                className="font-medium text-white block mb-1  w-[100px]"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="h-32 block w-full rounded-[30px]  border-0 text-gray-900 shadow-sm rounded-[30px] ring-inset outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 p-3"
              />
              <ValidationError
                className="mt-1 font-bold text-rose-500"
                errors={state.errors}
              />
            </div>

            <button
              disabled={state.submitting}
              className="bg-rose-800 text-white py-4 px-8 rounded-[20px] font-bold text-lg mt-16 m-auto hover:bg-rose-400"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};
