import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowUpRight, Download } from "lucide-react";
import { site } from "@/data/site";

export function CvLink() {
  const available = existsSync(path.join(process.cwd(), "public", site.cvPath));
  return available ? (
    <a className="text-link" href={site.cvPath} download="Dineth_Madhuranga_CV.pdf">
      Download CV <Download size={16} />
    </a>
  ) : (
    <a className="text-link" href={`mailto:${site.email}?subject=CV%20request`}>
      Request my CV <ArrowUpRight size={16} />
    </a>
  );
}
