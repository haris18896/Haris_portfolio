"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Project {
  _id: string;
  project_name: string;
  project_url?: string;
  project_description: string;
  project_logo: string;
  skills: Array<{
    skill: string;
  }>;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "projects"] {
        _id,
        project_name,
        project_url,
        project_description,
        "project_logo": project_logo.asset->url,
        "skills": skills[]->{ skill }
      }`;
      const data = await client.fetch(query);
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
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
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Some of my notable works and contributions
            </p>
          </div>

          <Carousel className="w-full">
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem
                  key={project._id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg h-full"
                  >
                    <div className="aspect-square relative mb-4">
                      <img
                        src={project.project_logo}
                        alt={project.project_name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.project_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.project_description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {skill.skill}
                        </span>
                      ))}
                    </div>
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      >
                        View Project →
                      </a>
                    )}
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
