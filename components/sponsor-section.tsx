/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { Sponsor } from '@lib/types';
import styles from './sponsor-section.module.css';
import styleUtils from './utils.module.css';

type Props = {
  sponsor: Sponsor;
};

export default function SponsorSection({ sponsor }: Props) {
  return (
    <>
      <Link href="/challengesets">
        <a className={styles.backlink}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </a>
      </Link>
      <div className={styles.layout}>
        <iframe
          className={cn(styles.video, styleUtils.appear, styleUtils['appear-first'])}
          allow="picture-in-picture"
          allowFullScreen
          frameBorder="0"
          // height="500px"
          // src={`https://youtube.com/embed/${sponsor.youtubeSlug}`}
          src={sponsor.video}
          title={sponsor.name}
          width="100%"
        />
        <div className={styles.container}>
          <div className={styles['name-and-logo']}>
            {/* <img 
              alt={sponsor.name}
              src={sponsor.logo.url}
              style={{
                width:"100%",
                height:"100%"
              }}
            /> */}
            {/* <Image
              alt={sponsor.name}
              src={sponsor.cardImage.url}
              className={cn(styles.image1, {
                [styles.silver]: sponsor.tier === 'silver'
              })}
              loading="lazy"
              title={sponsor.name}
              width={900}
              height={500}
            /> */}
            {/* <Image
              alt={sponsor.name}
              src={sponsor.logo.url}
              className={styles.image}
              loading="lazy"
              title={sponsor.name}
              height={"300%"}
              width={"300%"}
            /> */}
            <h1 className={styles.name}>{sponsor.title}</h1>
          </div>
          <p className={styles.description}>{sponsor.description}</p>
          <div className={styles['sponsor-details']}>
            {/* <a
              href={sponsor.callToActionLink}
              target="_blank"
              rel="noopener noreferrer"
              type="button"
              className={styles.button}
            >
              Resources
              {sponsor.callToAction}
            </a> */}
            {/* <a
              href={sponsor.discord}
              target="_blank"
              rel="noopener noreferrer"
              type="button"
              className={cn(styles.button, styles['button-link'])}
            >
              Chat on Discord
            </a> */}
          </div>
          <div className={styles.resources}>
            <h2 className={styles.heading}>Resources</h2>
            {sponsor.resource_links.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.button, styles['button-resource'])}
              >
                <span className={styles.truncate}>{link.text}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14L21 3" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
