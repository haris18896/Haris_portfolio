"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Experience {
  _id: string;
  company_name: string;
  company_url: string;
  my_role: string;
  company_description: string;
  joining_date: string;
  current_company: boolean;
  exit_date?: string;
  company_logo: {
    asset: {
      url: string;
    };
  };
  skills: Array<{
    skill: string;
  }>;
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      const query = `*[_type == "experience"] | order(joining_date desc) {
        _id,
        company_name,
        company_url,
        my_role,
        company_description,
        joining_date,
        current_company,
        exit_date,
        "company_logo": company_logo.asset->url,
        "skills": skills[]->{ skill }
      }`;
      const data = await client.fetch(query);
      setExperiences(data);
    };

    fetchExperiences();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
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
              Professional Experience
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              My journey through different roles and companies
            </p>
          </div>

          <motion.div className="grid grid-cols-1 gap-8">
            {experiences.map((exp) => (
              <motion.div
                key={exp._id}
                variants={cardVariants}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={exp.company_logo}
                      alt={exp.company_name}
                      className="w-24 h-24 rounded-lg object-contain bg-white p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.my_role}
                        </h3>
                        <a
                          href={exp.company_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          {exp.company_name}
                        </a>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(exp.joining_date), "MMM yyyy")} -{" "}
                        {exp.current_company
                          ? "Present"
                          : format(new Date(exp.exit_date!), "MMM yyyy")}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.company_description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {skill.skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
