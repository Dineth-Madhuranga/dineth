"use client";

import Image from "next/image";
import { useState } from "react";
import { Monitor, Smartphone, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export type PreviewAssets = {
  desktop?: string;
  mobile?: string;
  title?: string;
  capturedAt?: string;
};
export function ProjectPreview({
  project,
  assets = {},
  featured = false,
}: {
  project: Project;
  assets?: PreviewAssets;
  featured?: boolean;
}) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const src = assets[device];
  return (
    <div className={`project-visual tone-${project.tone} ${featured ? "featured-visual" : ""}`}>
      <div className="preview-toolbar">
        <span className="mono">{new URL(project.url).hostname.replace(/^www\./, "")}</span>
        <div className="device-toggle" role="group" aria-label={`${project.name} preview device`}>
          <button
            aria-label={`Desktop preview of ${project.name}`}
            aria-pressed={device === "desktop"}
            onClick={() => setDevice("desktop")}
          >
            <Monitor size={15} />
            <span>Desktop</span>
          </button>
          <button
            aria-label={`Mobile preview of ${project.name}`}
            aria-pressed={device === "mobile"}
            onClick={() => setDevice("mobile")}
          >
            <Smartphone size={15} />
            <span>Mobile</span>
          </button>
        </div>
      </div>
      <div className={`preview-stage is-${device}`}>
        {src ? (
          <div className={`browser-frame ${device}`}>
            <div className="browser-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{new URL(project.url).hostname}</span>
            </div>
            <div className="screenshot">
              <Image
                src={src}
                alt={`${project.name} live website, ${device} view`}
                width={device === "desktop" ? 1440 : 390}
                height={device === "desktop" ? 960 : 844}
                sizes={
                  device === "mobile"
                    ? "230px"
                    : featured
                      ? "(max-width: 767px) 90vw, 75vw"
                      : "(max-width: 767px) 90vw, 45vw"
                }
              />
            </div>
          </div>
        ) : (
          <div className="preview-fallback">
            <span className="mono">LIVE PROJECT / {device.toUpperCase()} PREVIEW PENDING</span>
            <p>{project.name}</p>
            <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">
              Explore the website <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
