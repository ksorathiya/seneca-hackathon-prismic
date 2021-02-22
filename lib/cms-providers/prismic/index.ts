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
import { Job, Sponsor, Stage, Speaker } from '@lib/types';
import { richTextAsText, getLinkUrl } from './utils';

const API_REF_URL = `https://${process.env.PRISMIC_REPO_ID}.prismic.io/api/v2`;
const API_URL = `https://${process.env.PRISMIC_REPO_ID}.prismic.io/graphql`;
const API_TOKEN =
  process.env.PRISMIC_ACCESS_TOKEN ||
  'MC5ZQ3o4ZGhFQUFHVFpsX1Jz.DVE777-977-9Ru-_ve-_vRHvv73vv70KIe-_ve-_ve-_ve-_ve-_vXZh77-977-977-977-9T--_vTLvv73vv70PcO-_vQ';

async function fetchCmsMasterRef() {
  const res = await fetch(`${API_REF_URL}${API_TOKEN ? `?access_token=${API_TOKEN}` : ''}`);

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  const masterVersion = json.refs?.find((apiVersion: any) => apiVersion.id === 'master') || null;
  const masterRef = masterVersion?.ref || null;

  return masterRef;
}

async function fetchCmsAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const masterRef = await fetchCmsMasterRef();

  const res = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`, {
    headers: {
      'Prismic-Ref': `${masterRef}`,
      Authorization: `Token ${API_TOKEN}`
    }
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllSpeakers(): Promise<Speaker[]> {
  const data = await fetchCmsAPI(`
    {
      allSpeakers(first: 100) {
        edges {
          node {
            name
            bio
            title
            twitter {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            github {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            company
            image
            talk {
              _linkType
              ...on  Talk{
                title
                description
              }
            }
            _meta {
              uid
            }
          }
        }
      }
    }
  `);

  const reformatedData = data.allSpeakers.edges.map((edge: any) => {
    return {
      name: richTextAsText(edge.node.name),
      bio: richTextAsText(edge.node.bio),
      slug: edge.node._meta.uid,
      title: richTextAsText(edge.node.title),
      twitter: getLinkUrl(edge.node.twitter),
      github: getLinkUrl(edge.node.github),
      company: richTextAsText(edge.node.company),
      image: {
        url:
          edge.node.image?.url.replace('compress,format', 'format') || 'https://images.prismic.io'
      },
      talk: {
        title: edge.node.talk?.title ? richTextAsText(edge.node.talk.title) : '',
        description: edge.node.talk?.description ? richTextAsText(edge.node.talk.description) : ''
      }
    };
  });

  return reformatedData;
}

export async function getAllStages(): Promise<Stage[]> {
  const data = await fetchCmsAPI(`
  {
    allStages(first: 100, sortBy: name_ASC) {
      edges {
        node {
          name
          _meta {
            uid
          }
          stream {
            _linkType
            ...on _ExternalLink {
              url
            }
          }
          discord {
            _linkType
            ...on _ExternalLink {
              url
            }
          }
          schedule {
            talk {
              _linkType
              ...on Talk {
                title
                start
                end
                video {
                 _linkType
                  ...on _ExternalLink {
              url
            }
                }
                speakers {
                  speaker {
                    ...on Speaker {
                      name
                      _meta {
                        uid
                      }
                      image
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `);

  const reformatedData = data.allStages.edges.map((edge: any) => {
    return {
      name: richTextAsText(edge.node.name),
      slug: edge.node._meta.uid,
      stream: getLinkUrl(edge.node.stream),
      discord: getLinkUrl(edge.node.discord),
      schedule: edge.node.schedule
        .filter((item: any) => item.talk)
        .map((item: any) => {
          // console.log('item', item);
          if (item.talk)
            return {
              title: richTextAsText(item.talk.title),
              start: item.talk.start,
              end: item.talk.end,
              video: getLinkUrl(item.talk?.video),
              speaker: item.talk.speakers.map((item: any) => ({
                name: richTextAsText(item.speaker.name),
                slug: item.speaker._meta.uid,
                image: {
                  url:
                    item.speaker.image?.url.replace('compress,format', 'format') ||
                    'https://images.prismic.io'
                }
              }))
            };
        })
    };
  });
  // console.log('reformatedData', reformatedData[0].schedule);
  return reformatedData;
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(`
  {
    allSponsors(first: 100, sortBy: name_ASC) {
      edges {
        node {
          _meta {
            uid
          }
          logo
          name
          site_link {
            _linkType
            ... on _ExternalLink {
              url
            }
          }
          description
        }
      }
    }
  }
  
  `);

  const reformatedData = data.allSponsors.edges.map((edge: any) => {
    return {
      name: richTextAsText(edge.node.name),
      bio: richTextAsText(edge.node.description),
      slug: edge.node._meta.uid,
      site_link: getLinkUrl(edge.node.site_link),
      image: {
        url: edge.node.logo?.url.replace('compress,format', 'format') || 'https://images.prismic.io'
      }
    };
    // return {
    //   name: richTextAsText(edge.node.name),
    //   description: richTextAsText(edge.node.description),
    //   slug: edge.node._meta.uid,
    //   website: getLinkUrl(edge.node.website),
    //   callToAction: richTextAsText(edge.node.call_to_action),
    //   callToActionLink: getLinkUrl(edge.node.call_to_action_link),
    //   discord: getLinkUrl(edge.node.discord),
    //   youtubeSlug: edge.node.youtube_slug,
    //   tier: edge.node.tier,
    //   links: edge.node.links.map((item: any) => ({
    //     url: getLinkUrl(item.link),
    //     text: item.link_text
    //   })),
    //   cardImage: {
    //     url:
    //       edge.node.card_image?.url.replace('compress,format', 'format') ||
    //       'https://images.prismic.io'
    //   },
    //   logo: {
    //     url: edge.node.logo?.url.replace('compress,format', 'format') || 'https://images.prismic.io'
    //   }
    // };
  });

  return reformatedData;
}

export async function getAllChallengeSets(): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(`
  {
    allChallenge_sets(first: 100, sortBy: title_ASC) {
      edges {
        node {
          _meta {
            uid
          }
          title
          display_image
          description
          # stream {
          #   _linkType
          #   ...on _ExternalLink {
          #     url
          #   }
          # }
          video {
            _linkType
            ...on _ExternalLink {
              url
            }
          }
          sponsors {
            sponsor{
              ...on Sponsor {
                _meta {
                  uid
                }
                name
                description
                site_link {
                  _linkType
                  ...on _ExternalLink {
                    url
                  }
                }
              }
            }
          }
          resource_links {
            link_text
            external_links{
                ...on _ExternalLink {
                url
              }
            }
          }
          liasons {
            liason{
              ...on Organizer {
                _meta {
                  uid
                }
                name
                # description
                # site_link {
                #   _linkType
                #   ...on _ExternalLink {
                #     url
                #   }
                # }
              }
            }
          }
          # schedule {
          #   talk {
          #     _linkType
          #     ...on Talk {
          #       title
          #       start
          #       end
          #       speakers {
          #         speaker {
          #           ...on Speaker {
          #             name
          #             _meta {
          #               uid
          #             }
          #             image
          #           }
          #         }
          #       }
          #     }
          #   }
          }
        }
      }
    }
  
  
  
  `);

  const reformatedData = data.allChallenge_sets.edges.map((edge: any) => {
    return {
      title: richTextAsText(edge.node.title),
      description: richTextAsText(edge.node.description),
      slug: edge.node._meta.uid,
      cardImage: {
        url:
          edge.node.display_image?.url.replace('compress,format', 'format') ||
          'https://images.prismic.io'
      },
      video: getLinkUrl(edge.node.video),
      sponsors: edge.node.sponsors
        ? edge.node.sponsors.map((item: any) => ({
            name: richTextAsText(item.name),
            description: richTextAsText(item.description),
            site_link: getLinkUrl(item.site_link)
            // text: item.link_text
          }))
        : [],
      resource_links: edge.node.resource_links
        ? edge.node.resource_links.map((item: any) => ({
            text: item.link_text,
            url: getLinkUrl(item.external_links)
          }))
        : []
      // TODO: Liasons
    };
    // return {
    //   title: richTextAsText(edge.node.title),
    //   // description: richTextAsText(edge.node.description),
    //   // slug: edge.node._meta.uid,
    //   // website: getLinkUrl(edge.node.website),
    //   // callToAction: richTextAsText(edge.node.call_to_action),
    //   // callToActionLink: getLinkUrl(edge.node.call_to_action_link),
    //   // video: getLinkUrl(edge.node.video)
    //   // discord: getLinkUrl(edge.node.discord),
    //   // youtubeSlug: edge.node.youtube_slug,
    //   // tier: edge.node.tier,
    //   // links: edge.node.links.map((item: any) => ({
    //   //   url: getLinkUrl(item.link),
    //   //   text: item.link_text
    //   // })),
    //   // cardImage: {
    //   //   url:
    //   //     edge.node.card_image?.url.replace('compress,format', 'format') ||
    //   //     'https://images.prismic.io'
    //   // },
    //   // logo: {
    //   //   url: edge.node.logo?.url.replace('compress,format', 'format') || 'https://images.prismic.io'
    //   // }
    // };
  });
  return reformatedData;
}

export async function getAllJobs(): Promise<Job[]> {
  const data = await fetchCmsAPI(`
    {
      allJobs(first: 100, sortBy: rank_ASC) {
        edges {
          node {
            _meta {
              id
            }
            company_name
            title
            description
            discord {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            link {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            rank
          }
        }
      }
    }
  `);

  const reformatedData = data.allJobs.edges.map((edge: any) => {
    return {
      id: edge.node._meta.id,
      companyName: richTextAsText(edge.node.company_name),
      title: richTextAsText(edge.node.title),
      description: richTextAsText(edge.node.description),
      discord: getLinkUrl(edge.node.discord),
      link: getLinkUrl(edge.node.link),
      rank: edge.node.rank
    };
  });

  return reformatedData;
}
export async function getAllTeams(): Promise<Job[]> {
  const data = await fetchCmsAPI(`
  {
    allTeams(first: 100, sortBy: team_name_ASC) {
      edges {
        node {
          _meta {
            uid
          }
          team_name
          team_type
          challenge_set {
            ...on Challenge_set{
              title
            }
          }
          
          team_members {
            full_name
            role
          }
          }
        }
      }
    }
  `);

  const reformatedData = data.allTeams.edges.map((edge: any) => {
    return {
      // id: edge.node._meta.id,
      title: richTextAsText(edge.node.team_name),
      description: richTextAsText(edge.node.challenge_set.title),
      team_members: edge.node.team_members
        ? edge.node.team_members.map((item: any) => ({
            name: richTextAsText(item.full_name)
            // description: richTextAsText(item.description),
            // site_link: getLinkUrl(item.site_link)
            // text: item.link_text
          }))
        : []
      // link: getLinkUrl(edge.node.link),
      // rank: edge.node.rank
    };
  });

  return reformatedData;
}
