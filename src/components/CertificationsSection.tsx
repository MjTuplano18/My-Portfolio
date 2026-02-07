import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const certifications = [
  {
    provider: "AWS Educate",
    certs: [
      {
        title: "AWS Educate Getting Started with Compute - Training Badge",
        issued: "Dec 14, 2024",
        image: "/cert-aws-compute.png",
        link: "https://www.credly.com/earner/earned/badge/0900af1a-38e8-47ae-88ce-d91443ea611b",
      },
      {
        title: "AWS Educate Getting Started with Storage - Training Badge",
        issued: "Dec 2, 2024",
        image: "/cert-aws-storage.png",
        link: "https://www.credly.com/earner/earned/badge/259d3b46-8a3b-4f2b-bafc-113043200a72",
      },
      {
        title: "AWS Educate Introduction to Cloud 101 - Training Badge",
        issued: "Nov 27, 2024",
        image: "/cert-aws-cloud.png",
        link: "https://www.credly.com/earner/earned/badge/5d9da0c2-8796-47b4-8af8-7e09fae0e7e9",
      },
    ],
  },
  {
    provider: "Cisco",
    certs: [
      {
        title: "Introduction to Cybersecurity",
        issued: "Apr 27, 2025",
        image: "/cert-cisco-cyber.png",
        link: "https://www.credly.com/earner/earned/badge/cbf8185c-8df1-4da1-864b-f2a3e2cd8b82",
      },
      {
        title: "Introduction to Packet Tracer",
        issued: "May 26, 2024",
        image: "/cert-cisco-packet.png",
        link: "https://www.credly.com/earner/earned/badge/7a8b5a98-242e-4730-b3ef-9517cf408e21",
      },
    ],
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-padding bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">Credentials</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Certifications & <span className="text-gradient">Training</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {certifications.map((category, catIdx) => (
            <div key={category.provider}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="text-xl font-heading font-bold text-primary mb-6"
              >
                {category.provider}
              </motion.h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.certs.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: catIdx * 0.1 + i * 0.1 }}
                    className="group rounded-xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_hsl(25_95%_53%/0.1)]"
                  >
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="block cursor-pointer"
                    >
                      <div className="relative aspect-video bg-secondary/20 overflow-hidden">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-heading text-sm font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          Issued {cert.issued}
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                          <ExternalLink size={12} /> View Certificate
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;