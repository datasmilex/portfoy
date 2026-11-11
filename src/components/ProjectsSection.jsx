import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { PROJECTS } from '../data/portfolio';
import { useLang } from '../i18n';
import useStats, { formatCount } from '../hooks/useStats';

const TXT = {
  heading: { tr: 'İşler', en: 'Work' },
  inProgress: { tr: 'Yapımda', en: 'In progress' },
  lore: { tr: 'Hikâye', en: 'Story' },
  visits: { tr: 'ziyaret', en: 'visits' },
  installs: { tr: 'indirme', en: 'downloads' },
};

// Small numbers read as weak social proof, so only show them past this.
const MIN_VISITS = 100;

function statLine(project, stats, t, lang) {
  const r = project.robloxPlaceId && stats.roblox[project.robloxPlaceId];
  if (r?.visits >= MIN_VISITS) return `${formatCount(r.visits, lang)} ${t(TXT.visits)}`;
  const p = project.playStoreId && stats.play[project.playStoreId];
  if (p?.installs) return `${p.installs} ${t(TXT.installs)}`;
  return null;
}

function ProjectCard({ project, stats, onOpenLore, onNavigateToYxShot }) {
  const { t, lang } = useLang();
  const playIcon = !project.image && project.playStoreId ? stats.play[project.playStoreId]?.image : null;
  const image = project.image || (project.robloxPlaceId && stats.roblox[project.robloxPlaceId]?.image) || playIcon;
  const stat = statLine(project, stats, t, lang);

  const linkProps = project.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {
        onClick: (e) => {
          e.preventDefault();
          onNavigateToYxShot?.();
        },
      };

  return (
    <article id={project.id} className="group relative scroll-mt-20">
      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-line bg-ink-raised">
        {image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className={`${
              playIcon ? 'mx-auto h-full w-auto rounded-[22%] p-4 object-contain sm:p-8' : 'h-full w-full object-cover object-top'
            } opacity-85 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:opacity-100`}
          />
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[1.35rem] leading-none text-paper sm:text-[1.75rem]">
            <a
              href={project.href}
              {...linkProps}
              className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-paper"
            >
              {project.title}
            </a>
          </h3>
          <p className="mt-1.5 text-xs text-mute sm:text-sm">{t(project.kind)}</p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-1 h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
          strokeWidth={1.5}
        />
      </div>

      {(stat || project.inProgress || project.hasLore) && (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-faint">
          {stat && <span className="tabular-nums text-paper-dim">{stat}</span>}
          {project.inProgress && <span>{t(TXT.inProgress)}</span>}
          {project.hasLore && (
            <button
              type="button"
              onClick={onOpenLore}
              className="relative z-10 cursor-pointer text-paper-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper"
            >
              {t(TXT.lore)}
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default function ProjectsSection({ onOpenLore, onNavigateToYxShot }) {
  const { t } = useLang();
  const stats = useStats();

  return (
    <section id="isler" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-16 sm:px-8 sm:py-20">
      <Reveal as="h2" className="mb-8 text-sm text-mute">
        {t(TXT.heading)}
      </Reveal>

      <Reveal className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            stats={stats}
            onOpenLore={onOpenLore}
            onNavigateToYxShot={onNavigateToYxShot}
          />
        ))}
      </Reveal>
    </section>
  );
}
