import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { certifications } from "../data";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/** Group certifications by issuer. */
function groupByIssuer(certs: typeof certifications) {
  const groups: Record<string, typeof certifications> = {};
  for (const cert of certs) {
    if (!groups[cert.issuer]) {
      groups[cert.issuer] = [];
    }
    groups[cert.issuer].push(cert);
  }
  return groups;
}

const CertificationsPage = () => {
  const { ref, initial, animate, transition } = useScrollAnimation();
  const grouped = groupByIssuer(certifications);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <section ref={ref}>
          <motion.div initial={initial} animate={animate} transition={transition}>
            <h1 className="text-2xl font-bold mb-8">Certifications</h1>

            <div className="space-y-8">
              {Object.entries(grouped).map(([issuer, certs]) => (
                <div key={issuer}>
                  <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    {issuer}
                  </h2>
                  <div className="space-y-3">
                    {certs.map((cert) => (
                      <a
                        key={cert.id}
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block py-3 border-b border-border last:border-b-0 hover:bg-muted/50 -mx-2 px-2 rounded transition-all duration-200 hover:scale-[1.01] hover:shadow-sm"
                      >
                        <h3 className="font-semibold text-sm text-foreground">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {cert.issuer} · {cert.date}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default CertificationsPage;
