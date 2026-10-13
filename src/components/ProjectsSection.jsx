import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { PROJECTS } from '../data/portfolio';

function ArrowBadge({ internal, className = '' }) {
  const Icon = internal ? ArrowRight : ArrowUpRight;
  return (
    <span
      aria-hidden="true"
      className={`h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-paper-dim transition-colors duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink group-active:border-paper group-active:bg-paper group-active:text-ink ${className}`}
    >
      <Icon
        className="h-[18px] w-[18px] transition-transform duration-500 group-hover:translate-x-px group-hover:-translate-y-px"
        strokeWidth={1.5}
      />
    </span>
  );
}

function ProjectRow({ project, index, onOpenLore, onNavigateToYxShot }) {
  const number = String(index + 1).padStart(2, '0');

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
      id={project.id}
      className="group relative scroll-mt-20 border-t border-line py-9 sm:py-11 md:grid md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-8"
    >
      <span className="hidden pt-1 text-sm tabular-nums text-faint md:block">{number}</span>

      <div className="flex items-start justify-between gap-5 md:block">
        <div>
          <p className="text-sm text-mute">
            <span className="tabular-nums text-faint md:hidden">{number}&ensp;</span>
            {project.kind}
          </p>
          <h3 className="mt-3 font-display text-[2.85rem] leading-[0.95] tracking-[-0.01em] text-paper transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-[3.5rem]">
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
              className="mt-3 hidden font-display text-lg italic text-faint opacity-0 transition-opacity duration-700 group-hover:opacity-100 [@media(hover:hover)]:block"
            >
              “{project.whisper}”
            </p>
          )}
        </div>
        <ArrowBadge internal={project.internal} className="mt-1 flex md:hidden" />
      </div>

      <div className="md:pt-7">
        <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-mute md:mt-0 md:text-base">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-faint">
          <span>{project.linkLabel}</span>

          {project.inProgress && (
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-mute" aria-hidden="true" />
              Yapım aşamasında
            </span>
          )}

          {project.hasLore && (
            <button
              type="button"
              onClick={onOpenLore}
              className="relative z-10 -my-2 cursor-pointer py-2 text-paper-dim underline decoration-line-strong underline-offset-[5px] transition-colors hover:text-paper hover:decoration-paper/60"
            >
              Hikâyeyi oku
            </button>
          )}
        </div>
      </div>

      <ArrowBadge internal={project.internal} className="mt-6 hidden md:flex" />
    </Reveal>
  );
}

export default function ProjectsSection({ onOpenLore, onNavigateToYxShot }) {
  return (
    <section id="isler" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
        <h2 className="font-display text-[2.75rem] leading-none tracking-[-0.01em] text-paper sm:text-6xl">
          Seçili <em className="text-paper-dim">işler</em>
        </h2>
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
