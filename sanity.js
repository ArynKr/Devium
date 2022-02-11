import {
  createImageUrlBuilder,
  createCurrentUserHook,
  createClient,
} from 'next-sanity'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2022-01-20',

  useCdn: process.env.NODE_ENV === 'production',
}

// Set up client to fetch data
export const sanityClient = createClient(config)

// Generating image urls
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Helper function for using current logged in user
export const useCurrentUser = createCurrentUserHook(config)
