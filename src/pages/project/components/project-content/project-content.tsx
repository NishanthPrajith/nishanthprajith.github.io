import './project-content.scss';

import { useEffect, useRef, useState } from 'react';
import {
  ProjectContentType,
  ProjectData,
} from '../../../../data/projects/types';
import Image from '../image-content/image-content';
import CodeContent from '../code-content/code-content';
import TableContent from '../table-content/table-content';
import BarChart from '../bar-graph-content/bar-graph-content';
import LineChart from '../line-graph-content/line-graph-content';

const RenderContent = ({ item, key }: { item: ProjectData; key: string }) => {
  /* Heading */
  if (
    item.type === ProjectContentType.heading ||
    item.type === ProjectContentType.subheading
  ) {
    return (
      <div className="project-content-heading" key={key}>
        {item.content && (
          <p className="project-content-title short-display">{item.content}</p>
        )}
        {item.subtitle && (
          <p className="project-content-subheading short-display">
            {item.subtitle}
          </p>
        )}
      </div>
    );
  }

  /* Text */
  if (item.type === ProjectContentType.text) {
    if (item.multipleHtmlContent) {
      return (
        <>
          {item.multipleHtmlContent.map((htmlContent, idx) => (
            <p key={idx} className="project-content-text short-display">
              {htmlContent}
            </p>
          ))}
        </>
      );
    }

    return (
      <p className="project-content-text short-display" key={key}>
        {item.content || item.htmlContent}
      </p>
    );
  }

  /* Image */
  if (item.type === ProjectContentType.image) {
    return <Image {...item.imageData} key={key} />;
  }

  /* Code */
  if (item.type === ProjectContentType.code) {
    return <CodeContent code={item.htmlContent ?? ''} key={key} />;
  }

  /* Bar Chart */
  if (item.type === ProjectContentType.barChart) {
    return <BarChart {...item.chartData} key={key} />;
  }

  /* Line Chart */
  if (item.type === ProjectContentType.lineChart) {
    return <LineChart {...item.chartData} key={key} />;
  }

  /* Table */
  if (item.type === ProjectContentType.table) {
    return <TableContent {...item.tableData} key={key} />;
  }

  /* Footer */
  if (item.type === ProjectContentType.footer) {
    return (
      <div className="footer-container" key={key}>
        <div
          className="divider"
          style={{
            marginBottom: '1rem',
          }}
        />
        <p>{item.content}</p>
        {item.links && (
          <div className="footer-links">
            {item.links?.map((link) => (
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                key={link.text}
              >
                <i className="fa-solid fa-link"></i>
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }
  return <p></p>;
};

export default function ProjectContent({
  content,
}: {
  content: ProjectData[];
}) {
  // Values
  const headingElements = content.filter(
    (item) => item.content && item.type === ProjectContentType.heading
  );
  const sections = content.reduce(
    (acc, item) => {
      if (item.type === ProjectContentType.heading) {
        acc.push({
          heading: item,
          content: [],
        });
      } else {
        // Ignore content before first heading
        if (acc.length > 0) {
          acc[acc.length - 1].content.push(item);
        }
      }

      return acc;
    },
    [] as {
      heading: ProjectData;
      content: ProjectData[];
    }[]
  );

  // Refs
  const projectContentContainerRef = useRef<HTMLDivElement>(null);

  // State
  const [activeSection, setActiveSection] = useState<string | null>(
    headingElements[0]?.content?.toLowerCase() ?? null
  );

  // Handle scroll to show active section
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("section[id]:not([id=''])")
    ) as HTMLElement[];

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;

      const visibleSections = sections
        .map((section) => {
          const rect = section.getBoundingClientRect();

          const visibleTop = Math.max(rect.top, 0);
          const visibleBottom = Math.min(rect.bottom, viewportHeight);

          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          const viewportPercentage = (visibleHeight / viewportHeight) * 100;

          return {
            id: section.id,
            visibleHeight: Math.round(visibleHeight),
            viewportPercentage: Math.round(viewportPercentage),
            top: Math.round(rect.top),
            bottom: Math.round(rect.bottom),
          };
        })
        .filter((section) => section.viewportPercentage > 0)
        .sort((a, b) => a.viewportPercentage - b.viewportPercentage)
        .reverse();

      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0]?.id ?? null);
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="project-content-container">
      <div
        className="project-content-container-background"
        id="project-content-container-background"
      ></div>
      <div className="project-data">
        <div
          className="project-content-navigation"
          ref={projectContentContainerRef}
        >
          <div className="navigation-container">
            {headingElements.map((item) => (
              <button
                key={item.content}
                className={
                  activeSection === item.content?.toLowerCase() ? 'active' : ''
                }
                onClick={() => {
                  const element = document.getElementById(
                    item.content?.toLowerCase() ?? ''
                  );
                  const stickyHeader = document.getElementById(
                    'project-content-container-background'
                  );

                  if (element) {
                    const yOffset = (stickyHeader?.offsetHeight ?? 0) * -1;
                    console.log(yOffset);
                    const y =
                      element.getBoundingClientRect().top +
                      window.scrollY +
                      yOffset;

                    window.scrollTo({
                      top: y,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                {item.content}
              </button>
            ))}
          </div>
        </div>
        <div className="project-content-sections">
          {sections.map((section, idx) => {
            return (
              <section
                key={`section-${idx}`}
                className="project-content"
                id={section.heading.content?.toLowerCase() ?? ''}
              >
                <RenderContent item={section.heading} key={`heading-${idx}`} />
                {section.content.map((item, itemIdx) => (
                  <RenderContent item={item} key={`item-${idx}-${itemIdx}`} />
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
