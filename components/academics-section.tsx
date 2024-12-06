"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Academic {
  _id: string;
  name: string;
  qualification: string;
  start: string;
  end: string;
  image: string;
}

export default function AcademicsSection() {
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchAcademics = async () => {
      const query = `*[_type == "academics"] | order(end desc) {
        _id,
        name,
        qualification,
        start,
        end,
        "image": image.asset->url
      }`;
      const data = await client.fetch(query);
      setAcademics(data);
    };

    fetchAcademics();
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

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="academics" className="py-20 bg-white dark:bg-gray-900">
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
              Academic Journey
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              My educational background and qualifications
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

            <motion.div className="space-y-12">
              {academics.map((academic, index) => (
                <motion.div
                  key={academic._id}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}
                  >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={academic.image}
                          alt={academic.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {academic.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {academic.qualification}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {format(new Date(academic.start), "MMM yyyy")} -{" "}
                        {format(new Date(academic.end), "MMM yyyy")}
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
