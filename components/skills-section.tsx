"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface Skill {
  _id: string;
  skill: string;
  level: string;
  experience: number;
  skill_logo: {
    asset: {
      url: string;
    };
  };
}

const levelToProgress = {
  Beginner: 20,
  Novice: 30,
  Intermediate: 50,
  Competent: 65,
  Proficient: 75,
  Advanced: 85,
  Expert: 95,
  Master: 100,
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchSkills = async () => {
      const query = `*[_type == "skills"] {
        _id,
        skill,
        level,
        experience,
        "skill_logo": skill_logo.asset->url
      }`;
      const data = await client.fetch(query);
      setSkills(data);
    };

    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Skills & Expertise
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Technologies and tools I work with
            </p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <motion.div
                key={skill._id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={skill.skill_logo}
                    alt={skill.skill}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {skill.skill}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {skill.experience} years experience
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {skill.level}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {
                        levelToProgress[
                          skill.level as keyof typeof levelToProgress
                        ]
                      }
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      levelToProgress[
                        skill.level as keyof typeof levelToProgress
                      ]
                    }
                    className="h-2"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
