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

import { GetStaticProps } from 'next';

import Page from '@components/page';
import SpeakersGrid from '@components/speakers-grid';
import OrganizersGrid from '@components/organizers-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllSpeakers } from '@lib/cms-api';
import { Speaker } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

let TITLE = 'Organizers';
let DESCRIPTION =
  'A list of everyone who have been involved in organizing the Seneca Digital Health Hackathon, 2021. Thanks, everyone.';

type Props = {
  speakers: Speaker[];
};

export default function Speakers({ speakers }: Props) {
  const meta = {
    title: TITLE,
    description: DESCRIPTION
  };
  return (
    <Page meta={meta}>
      <Layout>
        <Header hero={TITLE} description={DESCRIPTION} />
        <OrganizersGrid speakers={speakers} />
        <SpeakersGrid speakers={speakers} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const speakers = await getAllSpeakers();

  return {
    props: {
      speakers
    },
    revalidate: 60
  };
};
