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

export const SITE_URL = 'https://demo.vercel.events';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'vercel';
export const BRAND_NAME = 'SENECA HACKATHON 2021';
export const SITE_NAME_MULTILINE = ['SENECA', 'Hackathon'];
export const SITE_NAME = 'Seneca Hackathon 2021';
export const META_DESCRIPTION =
  'These are the list of challenge sets that the students would need to solve on the hackathon week.';
export const SITE_DESCRIPTION =
  'An interactive online experience by the community, free for everyone.';
export const DATE = 'March 2 - 5, 2021';
export const SHORT_DATE = 'March 2nd, 2021 to March 5th, 2021';
export const FULL_DATE = 'March 2nd, 2021 to March 5th, 2021';
export const TWEET_TEXT = META_DESCRIPTION;
export const COOKIE = 'user-id';

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const CODE_OF_CONDUCT =
  'https://www.notion.so/Seneca-Hackathon-Code-of-Conduct-fbb4eb61d517421aa961e829e684f749';
export const REPO = 'https://spark.adobe.com/page/XsrEFLYW4CB3s/';
export const SAMPLE_TICKET_NUMBER = 1234;
export const NAVIGATION = [
  {
    name: 'Showcase',
    route:
      // '/stage/address-problem-gambling-video-game-and-social-media-addiction-through-creation-of-mental-health-support-networks'
      '/stage/a'
  },
  {
    name: 'Challenge Sets',
    route: '/challengesets'
  },
  // {
  //   name: 'Challenge Set 2',
  //   route: '/stage/c'
  // },
  // {
  //   name: 'Challenge Set 3',
  //   route: '/stage/m'
  // },
  // {
  //   name: 'Challenge Set 4',
  //   route: '/stage/e'
  // },
  {
    name: 'Submissions',
    route: '/schedule'
  },
  {
    name: 'Teams',
    route: '/teams'
  },
  {
    name: 'Organizers',
    route: '/organizers'
  },
  {
    name: 'Sponsors',
    route: '/sponsors'
  }
];

export type TicketGenerationState = 'default' | 'loading';
