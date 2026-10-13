import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { PROJECTS } from '../data/portfolio';

function ProjectRow({ project, index, onOpenLore, onNavigateToYxShot }) {
  const number = String(index + 1).padStart(2, '0');
  const LinkIcon = project.internal ? ArrowRight : ArrowUpRight;

  const linkProps = project.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {
        onClick: (e) => {
          if (onNavigateToYxShot) {
            e.preventDefault();
            onNavigateToYxShot();
          }
        },
      };

  return (
    <Reveal
      as="article"
      className="group relative border-t border-line py-8 sm:py-10 md:grid md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.15fr)] md:gap-8"
    >
      <span className="hidden pt-3 text-sm tabular-nums text-faint md:block">{number}</span>

      <div>
        <p className="text-sm text-mute">
          <span className="tabular-nums text-faint md:hidden">{number} · </span>
          {project.kind}
        </p>
        <h3 className="mt-2 font-display text-[2.6rem] leading-none text-paper transition-transform duration-500 ease-out group-hover:translate-x-1.5 sm:text-5xl">
          <a
            href={project.href}
            {...linkProps}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-paper"
          >
            {project.title}
          </a>
        </h3>
        {project.whisper && (
          <p
            aria-hidden="true"
            className="mt-2 hidden font-display text-lg italic text-faint opacity-0 transition-opacity duration-700 group-hover:opacity-100 [@media(hover:hover)]:block"
          >
            “{project.whisper}”
          </p>
        )}
      </div>

      <div className="md:pt-1">
        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-mute md:mt-0 md:text-base">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-1.5 text-paper-dim transition-colors group-hover:text-paper">
            {project.linkLabel}
            <LinkIcon
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </span>

          {project.hasLore && (
            <button
              type="button"
              onClick={onOpenLore}
              className="relative z-10 cursor-pointer text-paper-dim underline decoration-line-strong underline-offset-[5px] transition-colors hover:text-paper hover:decoration-paper/60"
            >
              Hikâyeyi oku
            </button>
          )}

          {project.inProgress && (
            <span className="inline-flex items-center gap-2 text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-mute" aria-hidden="true" />
              Yapım aşamasında
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function ProjectsSection({ onOpenLore, onNavigateToYxShot }) {
  return (
    <section id="isler" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
        <h2 className="font-display text-[2.5rem] leading-none text-paper sm:text-6xl">Seçili işler</h2>
        <span className="pb-1 text-sm tabular-nums text-mute">
          {String(PROJECTS.length).padStart(2, '0')}
        </span>
      </Reveal>

      <div className="border-b border-line">
        {PROJECTS.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            onOpenLore={onOpenLore}
            onNavigateToYxShot={onNavigateToYxShot}
          />
        ))}
      </div>
    </section>
  );
}
