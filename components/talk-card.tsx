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

import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stage } from '@lib/types';

import { parseISO, format, isBefore, isAfter } from 'date-fns';
import { Talk } from '@lib/types';
import styles from './talk-card.module.css';

type Props = {
  key: string;
  talk: Talk;
  showTime: boolean;
  currentStage: Stage;
};

const formatDate = (date: string) => {
  // https://github.com/date-fns/date-fns/issues/946
  return format(parseISO(date), "h:mmaaaaa'm'");
};

export default function TalkCard({
  currentStage,
  talk: { title, speaker, start, end },
  showTime
}: Props) {
  const router = useRouter();
  // console.log(router.query);

  const [isTalkLive, setIsTalkLive] = useState(false);
  const [startAndEndTime, setStartAndEndTime] = useState('');

  useEffect(() => {
    const now = Date.now();
    // setIsTalkLive(isAfter(now, parseISO(start)) && isBefore(now, parseISO(end)));
    setIsTalkLive(router.query.talk === title);
    setStartAndEndTime(`${formatDate(start)} – ${formatDate(end)}`);
  });

  // console.log(router.query.talk, title, isTalkLive);
  // const firstSpeakerLink = `/participants/${speaker[0].slug}`;
  const firstSpeakerLink = `/stage/${currentStage.slug}?talk=${title}`;

  return (
    <div key={title} className={styles.talk}>
      {/* {showTime && <p className={styles.time}>{startAndEndTime || <>&nbsp;</>}</p>} */}
      <Link href={firstSpeakerLink}>
        <a
          className={cn(styles.card1, {
            [styles['is-live']]: isTalkLive
          })}
        >
          <div className={styles['card-body']}>
            <h4 title={title} className={styles.title}>
              {title}
            </h4>
            <div className={styles.speaker}>
              <div className={styles['avatar-group']}>
                {speaker.map(s => (
                  <div key={s.name} className={styles['avatar-wrapper']}>
                    <Image
                      loading="lazy"
                      alt={s.name}
                      className={styles.avatar}
                      src={s.image.url}
                      title={s.name}
                      width={24}
                      height={24}
                    />
                  </div>
                ))}
              </div>
              <h5 className={styles.name}>
                {speaker.length === 1 ? speaker[0].name : `${speaker.length} speakers`}
              </h5>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
